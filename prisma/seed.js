/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const permissions = [
  { resource: 'organizations', action: 'create', description: 'Create organizations' },
  { resource: 'organizations', action: 'read', description: 'View organization details' },
  { resource: 'organizations', action: 'update', description: 'Update organization' },
  { resource: 'organizations', action: 'delete', description: 'Delete organization' },
  { resource: 'members', action: 'create', description: 'Add members' },
  { resource: 'members', action: 'read', description: 'View members' },
  { resource: 'members', action: 'update', description: 'Update member roles' },
  { resource: 'members', action: 'delete', description: 'Remove members' },
  { resource: 'roles', action: 'create', description: 'Create roles' },
  { resource: 'roles', action: 'read', description: 'View roles' },
  { resource: 'roles', action: 'update', description: 'Update roles' },
  { resource: 'roles', action: 'delete', description: 'Delete roles' },
  { resource: 'projects', action: 'create', description: 'Create projects' },
  { resource: 'projects', action: 'read', description: 'View projects' },
  { resource: 'projects', action: 'update', description: 'Update projects' },
  { resource: 'projects', action: 'delete', description: 'Delete projects' },
  { resource: 'tasks', action: 'create', description: 'Create tasks' },
  { resource: 'tasks', action: 'read', description: 'View tasks' },
  { resource: 'tasks', action: 'update', description: 'Update tasks' },
  { resource: 'tasks', action: 'delete', description: 'Delete tasks' },
  { resource: 'ai_features', action: 'use', description: 'Use AI features' },
  { resource: 'analytics', action: 'view', description: 'View analytics' },
  { resource: 'exports', action: 'create', description: 'Export data' },
  { resource: 'billing', action: 'manage', description: 'Manage billing' },
];

const features = [
  {
    key: 'ai_assistant',
    name: 'AI Assistant',
    description: 'AI-powered assistant for tasks',
    category: 'ai',
  },
  {
    key: 'advanced_analytics',
    name: 'Advanced Analytics',
    description: 'Detailed analytics and reports',
    category: 'analytics',
  },
  {
    key: 'custom_branding',
    name: 'Custom Branding',
    description: 'Customize with your brand',
    category: 'customization',
  },
  {
    key: 'priority_support',
    name: 'Priority Support',
    description: '24/7 priority customer support',
    category: 'support',
  },
  {
    key: 'unlimited_projects',
    name: 'Unlimited Projects',
    description: 'Create unlimited projects',
    category: 'limits',
  },
  {
    key: 'team_collaboration',
    name: 'Team Collaboration',
    description: 'Advanced team collaboration tools',
    category: 'collaboration',
  },
  {
    key: 'data_export',
    name: 'Data Export',
    description: 'Export data in multiple formats',
    category: 'data',
  },
  {
    key: 'api_access',
    name: 'API Access',
    description: 'Full API access for integrations',
    category: 'integration',
  },
];

const plans = [
  {
    name: 'Free',
    type: 'FREE',
    price: 0,
    interval: 'month',
    description: 'Perfect for individuals getting started',
  },
  {
    name: 'Standard',
    type: 'STANDARD',
    price: 29,
    interval: 'month',
    description: 'For growing teams',
  },
  {
    name: 'Premium',
    type: 'PREMIUM',
    price: 99,
    interval: 'month',
    description: 'For professional teams',
  },
  {
    name: 'Enterprise',
    type: 'ENTERPRISE',
    price: 299,
    interval: 'month',
    description: 'For large organizations',
  },
];

const planFeatureMap = {
  FREE: [
    { key: 'team_collaboration', limit: 5 },
    { key: 'data_export', limit: 10 },
  ],
  STANDARD: [
    { key: 'team_collaboration', limit: 20 },
    { key: 'advanced_analytics', limit: null },
    { key: 'data_export', limit: 50 },
    { key: 'ai_assistant', limit: 100 },
  ],
  PREMIUM: [
    { key: 'team_collaboration', limit: 100 },
    { key: 'advanced_analytics', limit: null },
    { key: 'ai_assistant', limit: 500 },
    { key: 'custom_branding', limit: null },
    { key: 'data_export', limit: null },
    { key: 'unlimited_projects', limit: null },
    { key: 'api_access', limit: null },
  ],
  ENTERPRISE: [
    { key: 'team_collaboration', limit: null },
    { key: 'advanced_analytics', limit: null },
    { key: 'ai_assistant', limit: null },
    { key: 'custom_branding', limit: null },
    { key: 'priority_support', limit: null },
    { key: 'data_export', limit: null },
    { key: 'unlimited_projects', limit: null },
    { key: 'api_access', limit: null },
  ],
};

async function main() {
  console.log('Starting seed...');

  console.log('Creating permissions...');
  for (const perm of permissions) {
    await prisma.permission.upsert({
      where: { resource_action: { resource: perm.resource, action: perm.action } },
      update: {},
      create: perm,
    });
  }
  console.log(`Created ${permissions.length} permissions`);

  console.log('Creating features...');
  for (const feature of features) {
    await prisma.feature.upsert({
      where: { key: feature.key },
      update: {},
      create: feature,
    });
  }
  console.log(`Created ${features.length} features`);

  console.log('Creating plans...');
  const createdPlans = {};
  for (const plan of plans) {
    const created = await prisma.plan.upsert({
      where: { type: plan.type },
      update: {},
      create: plan,
    });
    createdPlans[plan.type] = created;
  }
  console.log(`Created ${plans.length} plans`);

  console.log('Linking features to plans...');
  for (const [planType, featureList] of Object.entries(planFeatureMap)) {
    const plan = createdPlans[planType];

    for (const featureConfig of featureList) {
      const feature = await prisma.feature.findUnique({
        where: { key: featureConfig.key },
      });

      if (feature) {
        await prisma.planFeature.upsert({
          where: { planId_featureId: { planId: plan.id, featureId: feature.id } },
          update: { limit: featureConfig.limit },
          create: {
            planId: plan.id,
            featureId: feature.id,
            isEnabled: true,
            limit: featureConfig.limit,
          },
        });
      }
    }
  }
  console.log('Linked features to plans');

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
