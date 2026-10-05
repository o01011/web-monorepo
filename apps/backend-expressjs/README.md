# Express.js TypeScript Starter

## 🚀 Quick Start

```bash
npm install
npm run start:dev -w apps/backend-expressjs
```

Run the app checks from the repository root:

```bash
npm test -w apps/backend-expressjs
npm run lint:types:check -w apps/backend-expressjs
npm run build -w apps/backend-expressjs
```

## Structure

```text
src/
├── config/          # Validated environment configuration
├── lib/             # Shared infrastructure (errors, logger)
├── middleware/      # Cross-cutting Express middleware
├── routes/          # Route registration and route modules
├── app.ts           # App factory; safe to import in tests
└── index.ts         # Server startup and shutdown
```

Keep feature code grouped by domain as the app grows (for example, `modules/users/` with its route, schema, service, and repository). Avoid adding generic layers until a real feature needs them.

## Configuration

```env
NODE_ENV=development
PORT=3000
LOG_LEVEL=info
CORS_ORIGINS=http://localhost:3000
```

All variables are optional and have development-safe defaults. `CORS_ORIGINS` accepts a comma-separated list. Invalid values fail fast during startup.
