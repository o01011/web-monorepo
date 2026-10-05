# ExpressJS Backend

Strongly typed Express 5 + TypeScript service using the shared Prisma client (`@web-monorepo/db`).

## Architecture

```text
src/
  index.ts            composition root, HTTP listener, and graceful shutdown
  app.ts              createApp(deps) - middleware stack and routes, no I/O of its own
  config/env.ts       zod-validated environment, inferred Env type
  lib/                logger, Prisma client factory, and password hashing
  common/
    errors/           AppError with typed error codes
    http/validate.ts  Zod request validation and typed request.validated values
    middleware/       error handler, 404, request timeout
  modules/<feature>/  schemas, repositories, services, and routes
```

Dependencies are injected into `createApp` and `createUserService`, so tests can use fakes without connecting to a database. Runtime schemas define request types, Prisma errors are mapped to API errors, and user DTOs omit password hashes.

## Endpoints

- `GET /health/live`, `GET /health/ready`
- `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `GET /api/v1/auth/me`
- `GET|POST /api/v1/users`, `GET|PATCH|DELETE /api/v1/users/:id`, `PATCH /api/v1/users/:id/role`

Registration and login return short-lived HS256 bearer access tokens. User passwords must be at least 12 characters and are stored as scrypt hashes. Configure `JWT_SECRET` with at least 32 characters of cryptographically random data and `JWT_EXPIRES_IN` in seconds (60 to 86,400; defaults to 900). For example, generate a secret with `openssl rand -hex 32`. Authentication rechecks the user and current role in the database on every request, so deleted accounts are rejected and role changes take effect immediately.

Registration does not verify email ownership, and MFA and refresh tokens are not implemented. Do not treat a registered email as verified or grant admin access until identity has been verified by your own process.

All `/api/v1/users` routes require authentication. Users may read, edit, or delete their own profile; listing users, creating users through the admin route, and changing roles require `ADMIN`. New registrations always receive `USER`. There is deliberately no self-service admin bootstrap: after verifying an account out of band, a database operator can promote the first administrator:

```sql
UPDATE "User" SET "role" = 'ADMIN' WHERE "email" = 'admin@example.com';
```

Apply database migrations (`npm run db:migrate:deploy -w @web-monorepo/db`) before starting the updated service. Keep the API behind HTTPS in production; bearer tokens must not be sent over plaintext connections.

## Development

```sh
npm run build -w @web-monorepo/db
npm run start:dev -w @web-monorepo/backend-expressjs
npm test -w @web-monorepo/backend-expressjs
```

The development command loads the repository-root `.env` when present. The production command runs the compiled `dist/index.js`; configure its environment through the process manager or container.

Environment variables (see the root `.env.example`): `NODE_ENV`, `APP_PORT`, `APP_LOG_LEVEL`, `APP_REQUEST_TIMEOUT`, `POSTGRES_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `THROTTLE_LIMIT`, `THROTTLE_TTL`, `CORS_ORIGINS` (comma-separated), and `TRUST_PROXY_HOPS`. Proxy trust defaults to `0` (disabled); set it to the exact number of trusted reverse-proxy hops when deployed behind a proxy.

OpenAPI generation from the Zod schemas and integration tests against PostgreSQL are not implemented yet.
