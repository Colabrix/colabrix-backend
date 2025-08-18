# Colabrix Backend

A powerful, open-source project management and issue tracking tool designed to streamline workflows, enhance team collaboration, and drive productivity. Its user-friendly interface and customizable features empower teams to stay organized and achieve their project goals efficiently.

## Branch Strategy

- **main** - Production branch (protected)
- **dev** - Development branch where all developers work  
- **staging** - Pre-production/QA branch for testing before production

## Setup Process

### Prerequisites
- Node.js (>=18.0.0)
- Docker & Docker Compose
- Git

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Colabrix/colabrix-backend.git
   cd colabrix-backend
   ```

2. **Switch to development branch**
   ```bash
   git checkout dev
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Environment setup**
   - Copy `.env.example` to `.env`
   - Configure environment variables as needed

5. **Start infrastructure**
   ```bash
   # Start all databases and services
   docker-compose up -d
   
   # Wait for services to be ready (30-60 seconds)
   docker-compose ps
   ```

6. **Setup database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Run database migrations
   npm run db:migrate
   
   ```

7. **Start development server**
   ```bash
   npm run dev
   ```

8. **Access services**
   - **API**: http://localhost:5000
   - **Health Check**: http://localhost:5000/health
   - **Prisma Studio**: `npm run db:studio`

## Development Workflow

### Sprint-based Development
- All feature development happens on the `dev` branch
- Create feature branches from `dev` for individual tasks
- Submit pull requests to merge back into `dev`

### Branch Flow
1. **Feature Development**: `dev` → `feature/task-name` → `dev`
2. **QA Testing**: `dev` → `staging` (for pre-production testing)
3. **Production**: `staging` → `main` (after QA approval)

### Sprint Process
1. Start sprint by pulling latest `dev` branch
2. Create feature branches from `dev`
3. Develop and test features locally
4. Submit PR to `dev` branch
5. After sprint completion, merge `dev` to `staging` for QA
6. Once QA approved, merge `staging` to `main` for production

## 🚀 Features

### **Multi-Database Architecture**
- **PostgreSQL with Prisma** - Primary database with master-slave replication
- **Redis Cluster** - Session management, caching, and real-time features
- **MongoDB** - Chat messages and user-generated content
- **Elasticsearch** - Advanced search functionality
- **ClickHouse** - Analytics and learning progress tracking

### **Core Platform Features**
- **User Management** - Students, Tutors, Parents, and Admins with role-based access
- **Authentication** - JWT-based auth with refresh tokens and email verification
- **Course Management** - Create, manage, and enroll in courses
- **Live Classes** - Schedule and conduct live online classes
- **Reviews & Ratings** - Student feedback system for tutors and courses
- **Real-time Messaging** - Communication between students and tutors
- **Payment Processing** - Stripe integration for payments and tutor earnings

### **Production-Ready Infrastructure**
- **Docker Compose** - Complete development and production orchestration
- **Load Balancing** - NGINX with upstream server configuration
- **Security** - Rate limiting, CORS, Helmet, input validation
- **Code Quality** - ESLint, Prettier, and Husky git hooks

## 🛠️ Tech Stack

### **Backend Framework**
- **Node.js** (>=18.0.0)
- **Express.js** - Web application framework
- **Prisma** - Database ORM with type safety

### **Databases**
- **PostgreSQL 15** - Primary relational database
- **Redis 7** - Caching and session management
- **MongoDB 7** - Document storage
- **Elasticsearch 8** - Search engine
- **ClickHouse 23** - Analytics database

### **Security & Authentication**
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Request throttling

## Available Scripts

- `npm run dev` - Start development server
- `npm run start` - Start production server
- `npm run build` - Build for production (if applicable)
- `npm run lint` - Run linting
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Prettier
- `npm test` - Run tests
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

## 🐳 Docker Configuration

### **Development Environment**
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### **Production Environment**
```bash
# Start production stack
docker-compose -f docker-compose.production.yml up -d
```

## Contributing

1. Always work from the `dev` branch
2. Create descriptive branch names (e.g., `feature/user-authentication`)
3. Write clear commit messages
4. Test your changes locally before submitting PR
5. Ensure all tests pass and linting is clean
6. Follow the established code style and patterns

## Environment Variables

Reference `.env.example` for required environment variables:
- Database connection strings
- JWT secrets
- API keys for external services
- Redis configuration
- SMTP settings

---

**© 2025 Colabrix. All Rights Reserved. Proprietary and Confidential.**