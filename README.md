# NestJS Boilerplate

A production-ready NestJS boilerplate with authentication, Prisma, Redis, i18n, rate limiting, and API documentation. Built with strong conventions and best practices.

## Table of Contents

- [Features](#features)
- [Architecture & Best Practices](#architecture--best-practices)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [API Conventions](#api-conventions)
- [Security](#security)
- [Database](#database)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)
- [Scripts Reference](#scripts-reference)

---

## Features

- **NestJS 11** with ESM, TypeScript 5.9
- **Prisma 7** with PostgreSQL
- **Authentication** — JWT + Passport (local strategy for sign-in)
- **Redis** — Caching via `@nestjs-modules/ioredis`
- **i18n** — Localized validation messages via `nestjs-i18n`
- **Swagger** — API docs at `/api/docs` (disabled in production)
- **Rate limiting** — `@nestjs/throttler`
- **Health checks** — Postgres + Redis via `@nestjs/terminus`
- **Helmet** — Secure HTTP headers
- **Docker** — Local and production compose files
- **Code quality** — ESLint 9, Prettier, Knip, ls-lint, Commitlint

---

## Architecture & Best Practices

### Modular Design

- **Core** — Shared infrastructure (config, Prisma, Redis, JWT, i18n, health checks, rate limiting)
- **Modules** — Feature-based (auth, post). Each module owns its controller, service, repository, DTOs, and RDOs
- **Common** — Shared decorators, guards, interceptors, filters, strategies, types, enums

### Layered Architecture

```
Controller → Service → Repository → Prisma
```

- **Controller** — HTTP handling, validation, Swagger metadata
- **Service** — Business logic
- **Repository** — Data access abstraction
- **DTOs** — Input validation (class-validator + i18n)
- **RDOs** — Response shaping (class-transformer, @Exclude for sensitive fields)

### Configuration

- **Joi** validates all env vars at startup
- **Config registers** — Typed, namespaced config keys (`ConfigKeyEnum`)
- **Single source of truth** — `.env` → Joi → config registers

### Error Handling

- **I18nValidationExceptionFilter** — Localized validation errors
- **CatchEverythingFilter** — Global catch-all; maps Prisma errors to HTTP status codes; hides internals in production

### API Versioning

- URI versioning: `api/v1`
- Example: `POST /api/v1/auth/sign-in`, `GET /api/v1/posts`

---

## Prerequisites

- **Node.js** 22.22.0
- **npm** 10.9.4
- **PostgreSQL**
- **Redis**
- **Docker** (optional, for local services)

Supported OS: macOS, Linux (Windows not supported per `package.json`).

---

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/maxonchickdev/nestjs-boilerplate.git
cd nestjs-boilerplate
npm ci
```

### 2. Environment

```bash
cp .env.example .env
# Edit .env with your values (see Configuration)
```

### 3. Database

```bash
# Start Postgres + Redis (Docker)
npm run docker:local:up

# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate:dev

# Seed (optional)
npm run db:seed
```

### 4. Run

```bash
npm run start:dev
```

- API: `http://localhost:<APP_PORT>`
- Swagger: `http://localhost:<APP_PORT>/api/docs`
- Health: `http://localhost:<APP_PORT>/api/v1/health-checks`

### 5. Git hooks (recommended)

```bash
npm run hooks:init
```

---

## Project Structure

```
src/
├── app.module.ts           # Root module
├── main.ts                 # Bootstrap
├── core/                   # Shared infrastructure
│   ├── config/
│   ├── health-checks/
│   ├── i18n/
│   ├── jwt/
│   ├── prisma/
│   ├── rate-limit/
│   └── redis/
├── modules/                # Feature modules
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.repository.ts
│   │   ├── dtos/
│   │   ├── rdos/
│   │   └── strategies/
│   └── post/
│       ├── post.controller.ts
│       ├── post.service.ts
│       ├── post.repository.ts
│       └── dtos/
├── common/                 # Shared utilities
│   ├── decorators/
│   ├── guards/
│   ├── interceptors/
│   ├── filters/
│   ├── enums/
│   └── registers/
├── i18n/                   # Translations (en, nl)
└── generated/              # Generated types (i18n, Prisma)

prisma/
├── schema.prisma
├── migrations/
└── seeders/
```

---

## Configuration

Required env vars (see `.env.example`):

| Key                      | Description                            |
| ------------------------ | -------------------------------------- |
| `NODE_ENV`               | `development`, `test`, or `production` |
| `APP_PORT`               | Server port                            |
| `APP_NAME`               | Application name (Swagger)             |
| `APP_DESCRIPTION`        | Application description (Swagger)      |
| `APP_LOG_LEVEL`          | Logging level                          |
| `APP_REQUEST_TIMEOUT`    | Request timeout (ms)                   |
| `POSTGRES_URL`           | PostgreSQL connection string           |
| `REDIS_URL`              | Redis connection string                |
| `JWT_SECRET`             | JWT signing secret                     |
| `JWT_EXPIRES_IN`         | JWT expiry in seconds                  |
| `THROTTLE_TTL`           | Rate limit window (ms)                 |
| `THROTTLE_LIMIT`         | Max requests per window                |
| `I18N_FALLBACK_LANGUAGE` | Fallback locale (e.g. `en`)            |

Config is validated with Joi at startup. Invalid config prevents the app from starting.

---

## API Conventions

### Request validation

- Global `I18nValidationPipe` with `transform`, `whitelist`, `forbidNonWhitelisted`
- DTOs use `class-validator` + `i18nValidationMessage()` for localized errors
- Use `PartialType`, `PickType`, `OmitType` for derived DTOs (e.g. `UpdatePostDto`)

### Response shaping

- RDOs with `class-transformer`; `@Exclude()` on sensitive fields (e.g. password)
- Swagger: `@ApiTags`, `@ApiOperation`, `@ApiBody`, `@ApiParam`, `@ApiOkResponse`

### Locale

- Header: `x-lang` (e.g. `en`, `nl`)

### Auth

- Public: `POST /api/v1/auth/sign-in`, `POST /api/v1/auth/sign-up`
- Protected: `@UseGuards(JwtGuard)`; use `@UserId()` to get current user id

---

## Security

- **Helmet** — Secure HTTP headers
- **CORS** — Configure `origin`, `methods`, `credentials`, `allowedHeaders` for your frontend
- **Rate limiting** — ThrottlerGuard (global)
- **Passwords** — bcrypt (genSalt + hash)
- **JWT** — Bearer token; validate via `JwtStrategy`
- **Validation** — `whitelist` + `forbidNonWhitelisted` to reject unknown fields

---

## Database

### Prisma

- Client output: `prisma/generated`
- ESM with `.ts` extension
- PostgreSQL via `@prisma/adapter-pg`

### Commands

| Command                     | Description                    |
| --------------------------- | ------------------------------ |
| `npm run db:generate`       | Generate Prisma client         |
| `npm run db:migrate:dev`    | Create and apply migrations    |
| `npm run db:migrate:deploy` | Apply migrations (production)  |
| `npm run db:migrate:reset`  | Reset DB and re-run migrations |
| `npm run db:seed`           | Run seeders                    |
| `npm run db:studio`         | Open Prisma Studio             |

---

## Development Workflow

### Linting & formatting

```bash
npm run lint:check          # ESLint
npm run lint:fix            # ESLint --fix
npm run lint:format:check    # Prettier check
npm run lint:format:fix     # Prettier write
npm run lint:filesystem     # ls-lint (kebab-case)
npm run lint:clean          # Knip (unused code)
```

### Commits

Commitlint enforces [Conventional Commits](https://www.conventionalcommits.org/):

- **Types:** `chore`, `ci`, `docs`, `feat`, `fix`, `refactor`, `test`
- **Scopes:** `common`, `core`, `i18n`, `modules`, `db`, `root`
- **Subject:** lower-case, 5–50 chars, no trailing period

Example: `feat(modules): add post pagination`

### Git hooks

- **Pre-commit:** ls-lint, knip, eslint, prettier
- **Pre-push:** build

Initialize with `npm run hooks:init`.

### Adding a new module

1. Create `src/modules/<name>/` with controller, service, repository, dtos, rdos
2. Register in `AppModule`
3. Use `JwtGuard` and `@UserId()` for protected routes
4. Add DTOs with class-validator + i18n; RDOs with class-transformer
5. Document with Swagger decorators

---

## Deployment

### Docker

**Local (dev):**

```bash
npm run docker:local:up     # Postgres, Redis, Redis Insight
npm run docker:local:down
```

**Production:**

```bash
npm run docker:prod:up
npm run docker:prod:down
```

### Dockerfile

Multi-stage: `installer` → `builder` → `runner`. On start, runs `db:migrate:deploy` then `start:prod`. Exposes port 8000.

### Production checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong `JWT_SECRET`
- [ ] Configure CORS for your frontend
- [ ] Swagger is disabled in production
- [ ] Internal error details are hidden in production

---

## Scripts Reference

| Script                    | Description               |
| ------------------------- | ------------------------- |
| `npm run build`           | Build for production      |
| `npm run start`           | Start (no watch)          |
| `npm run start:dev`       | Start with watch          |
| `npm run start:debug`     | Start with debug + watch  |
| `npm run start:prod`      | Run built app             |
| `npm run start:docs`      | Compodoc                  |
| `npm run db:*`            | Prisma commands           |
| `npm run docker:local:*`  | Local Docker compose      |
| `npm run docker:prod:*`   | Production Docker compose |
| `npm run hooks:init`      | Initialize git hooks      |
| `npm run hooks:precommit` | Run pre-commit checks     |

---

## License

MIT
