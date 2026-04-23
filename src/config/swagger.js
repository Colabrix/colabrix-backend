import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsPath = path.join(__dirname, '../../docs');

const healthSpec = YAML.load(path.join(docsPath, 'health-openapi.yaml'));
const authSpec = YAML.load(path.join(docsPath, 'auth-openapi.yaml'));
const organizationSpec = YAML.load(path.join(docsPath, 'organization-openapi.yaml'));
const subscriptionSpec = YAML.load(path.join(docsPath, 'subscription-openapi.yaml'));

const swaggerOptions = {
  explorer: true,
  swaggerOptions: {
    urls: [
      {
        url: '/api-docs/health.json',
        name: 'Health API (7 endpoints)',
      },
      {
        url: '/api-docs/auth.json',
        name: 'Authentication API (10 endpoints)',
      },
      {
        url: '/api-docs/organization.json',
        name: 'Organization API (14 endpoints)',
      },
      {
        url: '/api-docs/subscription.json',
        name: 'Subscription API (11 endpoints)',
      },
    ],
  },
  customCss: `
    .swagger-ui .markdown p,
    .swagger-ui .markdown li,
    .swagger-ui .markdown code,
    .swagger-ui .renderedMarkdown p,
    .swagger-ui .renderedMarkdown li,
    .swagger-ui .description p,
    .swagger-ui .description li {
      color: #e8e8e8 !important;
    }
    .swagger-ui .opblock .opblock-summary-description,
    .swagger-ui .opblock-description-wrapper p,
    .swagger-ui .parameter__name,
    .swagger-ui .parameter__type,
    .swagger-ui .response-col_status,
    .swagger-ui .response-col_description,
    .swagger-ui .model-title,
    .swagger-ui .prop-type,
    .swagger-ui .prop-format {
      color: #d4d4d4 !important;
    }
    .swagger-ui .info .title,
    .swagger-ui .opblock-tag {
      color: #ffffff !important;
    }
    .swagger-ui table thead tr th {
      color: #ffffff !important;
    }
    .swagger-ui .model-box,
    .swagger-ui .model {
      background: #1e1e1e !important;
    }
    @media (prefers-color-scheme: dark) {
      .swagger-ui {
        filter: invert(0);
      }
      .swagger-ui .markdown p,
      .swagger-ui .markdown li,
      .swagger-ui .renderedMarkdown p,
      .swagger-ui .renderedMarkdown li {
        color: #e8e8e8 !important;
      }
    }
  `,
};

const combinedDocs = {
  openapi: '3.0.0',
  info: {
    title: 'Colabrix API - Complete Documentation',
    version: '1.0.0',
    description: `
Complete API documentation for the Colabrix platform.

**42 endpoints across 4 modules:**
- Health (7 endpoints)
- Authentication (10 endpoints)
- Organization (14 endpoints)
- Subscription (11 endpoints)

**Use the dropdown above to navigate between modules.**
    `.trim(),
    contact: {
      name: 'Colabrix Support',
      email: 'support@colabrix.com',
    },
  },
  servers: healthSpec.servers,
  tags: [
    ...healthSpec.tags,
    ...authSpec.tags,
    ...organizationSpec.tags,
    ...subscriptionSpec.tags,
  ],
  components: {
    securitySchemes: authSpec.components.securitySchemes,
    schemas: {
      ...(healthSpec.components?.schemas || {}),
      ...(authSpec.components?.schemas || {}),
      ...(organizationSpec.components?.schemas || {}),
      ...(subscriptionSpec.components?.schemas || {}),
    },
    parameters: {
      ...(organizationSpec.components?.parameters || {}),
      ...(subscriptionSpec.components?.parameters || {}),
    },
    responses: {
      ...(healthSpec.components?.responses || {}),
      ...(authSpec.components?.responses || {}),
      ...(organizationSpec.components?.responses || {}),
      ...(subscriptionSpec.components?.responses || {}),
    },
  },
  paths: {
    ...healthSpec.paths,
    ...authSpec.paths,
    ...organizationSpec.paths,
    ...subscriptionSpec.paths,
  },
};

export {
  swaggerUi,
  swaggerOptions,
  combinedDocs,
  healthSpec,
  authSpec,
  organizationSpec,
  subscriptionSpec,
};
