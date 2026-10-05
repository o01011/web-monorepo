# ExpressJS Backend

Strongly typed Express 5 + TypeScript service using the shared Prisma client (`@web-monorepo/db`).

## Research: existing boilerplates

Reviewed from general knowledge of popular projects (not re-verified against live repos):

| Project | Good ideas | Drawbacks |
| --- | --- | --- |
| `microsoft/TypeScript-Node-Starter` | Simple layout, config separation | Dated (Mongoose, Passport sessions, no runtime validation) |
| `w3tecch/express-typescript-boilerplate` | Layering, Swagger, DI | Decorator-heavy (`routing-controllers`, `typedi`), largely unmaintained |
| `santiq/bulletproof-nodejs` | Well-known layering (controller/service/model), loaders | Types stop at the HTTP edge, old deps |
| `Hagopj13/node-express-boilerplate` | Security middleware, error handling, tests | Plain JS, Joi without inferred types |
| `ljlm0402/typescript-express-starter` | Generator, many DB options | Weak request typing, class-based wiring |

Takeaways applied here: layered modules, centralised error handling, security middleware by default, env validation at boot, graceful shutdown, tests that boot the app without a database. Departures: **runtime schemas are the single source of truth for types** (zod), **no decorators or DI container** (plain factory functions), and no `any`-typed `req.body`.

## Architecture

```
src/
  index.ts            composition root: env, logger, prisma, wiring, graceful shutdown
  app.ts              createApp(deps) - middleware stack and routes, no I/O of its own
  config/env.ts       zod-validated environment, inferred `Env` type
  lib/                logger (pino), prisma client factory, password hashing (scrypt)
  common/
    errors/           AppError with typed error codes
    http/validate.ts  validate({ body, params, query }) -> typed `request.validated`
    middleware/       error handler, 404, request timeout
  modules/<feature>/  schema (zod) -> repository -> service -> routes (+ dto)
```

Principles:

- **Dependencies are injected as arguments** (`createApp`, `createUserService(repository)`), so tests swap in fakes and nothing reads globals.
- **Validation produces types**: `validate()` returns inferred zod output, so handlers read `request.validated.body` fully typed.
- **Repository hides Prisma** and maps Prisma errors (`P2002`, `P2025`) to `AppError`; services never leak the `password` column (`toUserDto`).
- **One error shape**: `{ error: { code, message, details?, requestId } }`; 5xx messages are never leaked.
- **Strict TS**: `strict`, `noUncheckedIndexedAccess`, `verbatimModuleSyntax`, `erasableSyntaxOnly`, `noUnused*`.
- Express 5 forwards rejected async handlers to the error middleware, so no `asyncHandler` wrapper is needed.

## Endpoints

- `GET /health/live`, `GET /health/ready`
- `GET|POST /api/v1/users`, `GET|PATCH|DELETE /api/v1/users/:id`

## Development

```sh
npm run build -w @web-monorepo/db      # generates the Prisma client and builds the db package
npm run start:dev -w @web-monorepo/backend-expressjs   # loads ../../.env if present
npm test -w @web-monorepo/backend-expressjs
```

Environment variables (see root `.env.example`): `NODE_ENV`, `APP_PORT`, `APP_LOG_LEVEL`, `APP_REQUEST_TIMEOUT`, `POSTGRES_URL`, `THROTTLE_LIMIT`, `THROTTLE_TTL`, `CORS_ORIGINS` (comma-separated).

## Next steps

Auth (JWT + refresh), OpenAPI generation from the zod schemas, integration tests against Postgres, a backend-expressjs Dockerfile.
