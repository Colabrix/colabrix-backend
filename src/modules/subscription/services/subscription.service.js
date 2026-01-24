import { getWriteDB } from '../../../config/databases.js';
import logger from '../../../shared/utils/logger.js';
import { invalidateOrganizationFeatureCache } from '../../../shared/services/rbac/feature.service.js';
import * as stripeService from './stripe.service.js';
import config from '../../../config/index.js';

const prisma = getWriteDB();

export const getAllPlans = async (includeInactive = false) => {
  const where = includeInactive ? {} : { isActive: true };

  const plans = await prisma.plan.findMany({
    where,
    include: {
      features: {
        include: {
          feature: true,
        },
      },
    },
    orderBy: { price: 'asc' },
  });

  return plans;
};

export const getPlanById = async (planId) => {
  const plan = await prisma.plan.findUnique({
    where: { id: planId },
    include: {
      features: {
        include: {
          feature: true,
        },
      },
    },
  });

  return plan;
};

export const createPlan = async (data, requestId) => {
  const plan = await prisma.plan.create({
    data,
  });

  logger.info('Plan created', { requestId, planId: plan.id, type: plan.type });

  return plan;
};

export const updatePlan = async (planId, data, requestId) => {
  const plan = await prisma.plan.update({
    where: { id: planId },
    data,
  });

  logger.info('Plan updated', { requestId, planId });

  return plan;
};

export const deletePlan = async (planId, requestId) => {
  const orgsUsingPlan = await prisma.organization.count({
    where: { planId },
  });

  if (orgsUsingPlan > 0) {
    throw new Error('Cannot delete plan with active organizations');
  }

  await prisma.plan.delete({
    where: { id: planId },
  });

  logger.info('Plan deleted', { requestId, planId });
};

export const getOrganizationSubscription = async (organizationId) => {
  const subscription = await prisma.subscription.findUnique({
    where: { organizationId },
    include: {
      plan: true,
      organization: {
        select: {
          id: true,
          name: true,
          trialEndsAt: true,
        },
      },
    },
  });

  return subscription;
};

export const createCheckoutSession = async (organizationId, planId, userId, requestId) => {
  const [organization, plan, user] = await Promise.all([
    prisma.organization.findUnique({
      where: { id: organizationId },
      include: { owner: true },
    }),
    prisma.plan.findUnique({ where: { id: planId } }),
    prisma.user.findUnique({ where: { id: userId } }),
  ]);

  if (!organization) {
    throw new Error('Organization not found');
  }

  if (!plan) {
    throw new Error('Plan not found');
  }

  if (!plan.isActive) {
    throw new Error('Plan is not available');
  }

  if (plan.type === 'FREE') {
    throw new Error('Cannot purchase free plan');
  }

  const session = await stripeService.createCheckoutSession({
    email: user.email,
    planName: plan.name,
    amount: plan.price,
    interval: plan.interval,
    organizationId,
    planId,
    successUrl: `${config.frontendUrl}/subscription/success`,
    cancelUrl: `${config.frontendUrl}/subscription/cancel`,
    requestId,
  });

  return { sessionId: session.id, url: session.url };
};

export const handlePaymentSuccess = async (sessionId, requestId) => {
  const session = await stripeService.getCheckoutSession(sessionId);

  if (session.payment_status !== 'paid') {
    throw new Error('Payment not completed');
  }

  const { organizationId, planId, interval } = session.metadata;

  const periodStart = new Date();
  const periodEnd = new Date();
  if (interval === 'month') {
    periodEnd.setMonth(periodEnd.getMonth() + 1);
  } else {
    periodEnd.setFullYear(periodEnd.getFullYear() + 1);
  }

  const subscription = await prisma.$transaction(async (tx) => {
    await tx.subscription.upsert({
      where: { organizationId },
      create: {
        organizationId,
        planId,
        status: 'ACTIVE',
        currentPeriodStart: periodStart,
        currentPeriodEnd: periodEnd,
        stripePaymentId: session.payment_intent,
      },
      update: {
        planId,
        status: 'ACTIVE',
        currentPeriodStart: periodStart,
        currentPeriodEnd: periodEnd,
        stripePaymentId: session.payment_intent,
        canceledAt: null,
      },
    });

    await tx.organization.update({
      where: { id: organizationId },
      data: {
        planId,
        trialEndsAt: null,
      },
    });

    return tx.subscription.findUnique({
      where: { organizationId },
      include: { plan: true },
    });
  });

  await invalidateOrganizationFeatureCache(organizationId);

  logger.info('Subscription activated', { requestId, organizationId, planId });

  return subscription;
};

export const cancelSubscription = async (organizationId, requestId) => {
  const subscription = await prisma.subscription.findUnique({
    where: { organizationId },
  });

  if (!subscription) {
    throw new Error('No active subscription found');
  }

  const freePlan = await prisma.plan.findUnique({
    where: { type: 'FREE' },
  });

  await prisma.$transaction(async (tx) => {
    await tx.subscription.update({
      where: { organizationId },
      data: {
        status: 'CANCELED',
        canceledAt: new Date(),
      },
    });

    await tx.organization.update({
      where: { id: organizationId },
      data: {
        planId: freePlan.id,
      },
    });
  });

  await invalidateOrganizationFeatureCache(organizationId);

  logger.info('Subscription canceled', { requestId, organizationId });
};

export const checkTrialExpiry = async () => {
  const expiredTrials = await prisma.organization.findMany({
    where: {
      trialEndsAt: {
        lt: new Date(),
      },
      subscription: null,
    },
  });

  const freePlan = await prisma.plan.findUnique({
    where: { type: 'FREE' },
  });

  for (const org of expiredTrials) {
    await prisma.organization.update({
      where: { id: org.id },
      data: {
        planId: freePlan.id,
        trialEndsAt: null,
      },
    });

    await invalidateOrganizationFeatureCache(org.id);

    logger.info('Trial expired, downgraded to free', { organizationId: org.id });
  }

  return expiredTrials.length;
};
