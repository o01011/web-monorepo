# Local Dev Cycle

Start, validate, and stop local development dependencies and app runtime.

## Rules

- Prefer local docker compose scripts defined in `package.json`.
- Ensure clean shutdown when done.

## Steps

1. Start local services:
   - `npm run docker:local:up`
2. Prepare database:
   - `npm run db:generate`
   - `npm run db:migrate:dev`
3. Start app:
   - `npm run start:dev`
4. Optional docs:
   - `npm run start:docs`
5. Stop local services when finished:
   - `npm run docker:local:down`

## Output

- Service startup status
- DB migration status
- App runtime status
- Shutdown confirmation
