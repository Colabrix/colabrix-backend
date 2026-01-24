import { httpResponse, asyncHandler, responseMessage } from '../../../shared/index.js';
import * as subscriptionService from '../services/subscription.service.js';

export const health = asyncHandler(async (req, res) => {
  return httpResponse(req, res, 200, responseMessage.custom('Subscription module is healthy'), {
    module: 'subscription',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
  });
});

export const getPlans = asyncHandler(async (req, res) => {
  const includeInactive = req.query.includeInactive === 'true';

  const plans = await subscriptionService.getAllPlans(includeInactive);

  return httpResponse(req, res, 200, responseMessage.custom('Plans retrieved successfully'), plans);
});

export const getPlan = asyncHandler(async (req, res) => {
  const { planId } = req.params;

  const plan = await subscriptionService.getPlanById(planId);

  if (!plan) {
    return httpResponse(req, res, 404, responseMessage.custom('Plan not found'), null);
  }

  return httpResponse(req, res, 200, responseMessage.custom('Plan retrieved successfully'), plan);
});

export const createPlan = asyncHandler(async (req, res) => {
  const { name, type, price, interval, description } = req.body;

  const plan = await subscriptionService.createPlan(
    {
      name,
      type,
      price,
      interval,
      description,
    },
    req.requestId
  );

  return httpResponse(req, res, 201, responseMessage.custom('Plan created successfully'), plan);
});

export const updatePlan = asyncHandler(async (req, res) => {
  const { planId } = req.params;
  const data = req.body;

  const plan = await subscriptionService.updatePlan(planId, data, req.requestId);

  return httpResponse(req, res, 200, responseMessage.custom('Plan updated successfully'), plan);
});

export const deletePlan = asyncHandler(async (req, res) => {
  const { planId } = req.params;

  await subscriptionService.deletePlan(planId, req.requestId);

  return httpResponse(req, res, 200, responseMessage.custom('Plan deleted successfully'), null);
});
