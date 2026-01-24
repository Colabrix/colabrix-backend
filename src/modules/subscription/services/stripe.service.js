import Stripe from 'stripe';
import config from '../../../config/index.js';
import logger from '../../../shared/utils/logger.js';

const stripe = new Stripe(config.stripe.secretKey);

export const createCheckoutSession = async ({
  email,
  planName,
  amount,
  interval,
  organizationId,
  planId,
  successUrl,
  cancelUrl,
  requestId,
}) => {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: `${planName} Plan`,
            description: `${planName} plan subscription - ${interval}ly`,
          },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
    success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelUrl,
    metadata: {
      organizationId,
      planId,
      interval,
    },
  });

  logger.info('Checkout session created', { requestId, sessionId: session.id, organizationId });

  return session;
};

export const getCheckoutSession = async (sessionId) => {
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  return session;
};

export const constructWebhookEvent = (payload, signature) => {
  return stripe.webhooks.constructEvent(payload, signature, config.stripe.webhookSecret);
};
