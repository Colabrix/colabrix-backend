import { httpResponse, asyncHandler, responseMessage } from '../../../shared/index.js';
import * as subscriptionService from '../services/subscription.service.js';
import * as stripeService from '../services/stripe.service.js';
import logger from '../../../shared/utils/logger.js';

export const getSubscription = asyncHandler(async (req, res) => {
  const { organizationId } = req.params;

  const subscription = await subscriptionService.getOrganizationSubscription(organizationId);

  if (!subscription) {
    return httpResponse(req, res, 404, responseMessage.custom('No subscription found'), null);
  }

  return httpResponse(
    req,
    res,
    200,
    responseMessage.custom('Subscription retrieved successfully'),
    subscription
  );
});

export const createCheckout = asyncHandler(async (req, res) => {
  const { organizationId, planId } = req.body;
  const userId = req.user.id;

  const checkout = await subscriptionService.createCheckoutSession(
    organizationId,
    planId,
    userId,
    req.requestId
  );

  return httpResponse(
    req,
    res,
    200,
    responseMessage.custom('Checkout session created successfully'),
    checkout
  );
});

export const verifyPayment = asyncHandler(async (req, res) => {
  const { sessionId } = req.query;

  if (!sessionId) {
    return httpResponse(req, res, 400, responseMessage.custom('Session ID is required'), null);
  }

  const subscription = await subscriptionService.handlePaymentSuccess(sessionId, req.requestId);

  return httpResponse(
    req,
    res,
    200,
    responseMessage.custom('Payment verified and subscription activated'),
    subscription
  );
});

export const cancelSubscription = asyncHandler(async (req, res) => {
  const { organizationId } = req.body;

  await subscriptionService.cancelSubscription(organizationId, req.requestId);

  return httpResponse(
    req,
    res,
    200,
    responseMessage.custom('Subscription canceled successfully'),
    null
  );
});

export const webhook = asyncHandler(async (req, res) => {
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = stripeService.constructWebhookEvent(req.body, signature);
  } catch (err) {
    logger.error('Webhook signature verification failed', { requestId: req.requestId, error: err.message });
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      if (session.payment_status === 'paid') {
        await subscriptionService.handlePaymentSuccess(session.id, req.requestId);
      }
      break;
    }
    default:
      logger.info('Unhandled webhook event', { requestId: req.requestId, type: event.type });
  }

  return res.json({ received: true });
});
