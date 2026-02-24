# Prisma Workflow

Handle Prisma schema changes, migrations, and local verification safely.

## Rules

- Never edit generated client files manually.
- Prefer explicit migration names describing intent.
- Confirm migration impact before applying in shared environments.

## Steps

1. Update `prisma/schema.prisma`.
2. Generate Prisma client:
   - `npm run db:generate`
3. Create and apply local migration:
   - `npm run db:migrate:dev -- --name <migration_name>`
4. Seed data if needed:
   - `npm run db:seed`
5. For deploy environments:
   - `npm run db:migrate:deploy`

## Validation

- Verify app starts without Prisma errors.
- Verify affected endpoints/services function with new schema.
- Verify no unused exports or lint regressions.

## Output

- Schema change summary
- Migration name
- Commands executed
- Verification results
