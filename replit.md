# Predictli v5.0 Beta - Replit Setup

## Project Overview
Predictli v5.0 is a unified full-stack application for candidate matching and job management. It consists of:
- **Backend**: Express.js + TypeScript API server running on port 3000
- **Frontend**: React + Vite UI running on port 5000
- **Database**: PostgreSQL with Drizzle ORM

## Recent Changes (November 3, 2025)
- Initial Replit environment setup from GitHub import
- Installed Node.js 20 and all dependencies
- Created PostgreSQL database and pushed schema
- Configured Vite with proper host settings (0.0.0.0:5000) for Replit proxy
- Updated backend to use localhost and configured CORS for Replit environment
- Set up concurrent development workflow for both frontend and backend
- Configured deployment settings for autoscale deployment
- Added .gitignore for Node.js project

## Project Architecture

### Directory Structure
```
predictli-v5.0-beta/
├── src/                    # Backend source code
│   ├── api/               # API routes
│   ├── config/            # Configuration (env.ts)
│   ├── db/                # Database schema and connection
│   ├── services/          # Business logic services
│   └── server.ts          # Express server entry point
├── ui/                    # Frontend React application
│   ├── src/
│   │   ├── App.tsx        # Main React component
│   │   └── main.tsx       # React entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts     # Vite configuration
├── scripts/               # Utility scripts (seed.ts)
├── drizzle.config.ts      # Drizzle ORM configuration
├── package.json           # Backend dependencies
└── tsconfig.json          # TypeScript configuration
```

### Key Technologies
- **Backend**: Express.js, TypeScript, Drizzle ORM, PostgreSQL
- **Frontend**: React, Vite, TypeScript
- **Development**: tsx (for ES module support), concurrently (for running both servers)
- **Database**: Drizzle Kit for schema management

### Database Schema
The application uses the following tables:
- `per_person`: Person/candidate information
- `per_candidate`: Candidate status and details
- `per_profile`: Candidate profiles with skills and experience
- `org_company`: Company information
- `org_job`: Job listings
- `match_candidate_job`: Matching records between candidates and jobs
- `evt_event`: Event tracking
- `fin_ledger`: Financial records

## Development

### Running the Application
```bash
cd predictli-v5.0-beta
npm run dev:all  # Runs both backend and frontend concurrently
```

The workflow is already configured to run this command automatically.

### Database Management
```bash
npm run db:push       # Push schema changes to database
npm run db:studio     # Open Drizzle Studio for database management
npm run seed          # Run seed script
```

### Environment Variables
Required environment variables are set in `.env`:
- `DATABASE_URL`: PostgreSQL connection string (auto-configured by Replit)
- `PORT`: Backend server port (default: 3000)
- `JWT_SECRET`: Secret for JWT token generation
- `ADMIN_USER` / `ADMIN_PASS`: Admin credentials (default: admin/changeme)

## Deployment

### Build
```bash
npm run build  # Builds both backend and frontend
```

### Deployment Configuration
- **Type**: Autoscale (stateless web application)
- **Frontend**: Served on port 5000 using serve
- **Backend**: Node.js server on port 3000
- **Build**: Compiles TypeScript and builds Vite frontend

## Known Issues
- Some npm audit vulnerabilities in development dependencies (non-critical)
- Default admin credentials should be changed in production

## User Preferences
None documented yet.
