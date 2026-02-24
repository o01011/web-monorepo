# Onboard New Developer

Guide a new engineer through local setup and first contribution.

## Rules

- Follow repo Node/NPM versions from `.nvmrc` and `package.json`.
- Validate setup by running lint and local services.
- End with a successful first PR checklist.

## Steps

1. Runtime setup
   - Install Node `22.22.0` and npm `10.9.4`.
   - Install dependencies: `npm ci`
2. Environment setup
   - Copy env template and configure local values.
   - Review required secrets and local service URLs.
3. Infrastructure setup
   - `npm run docker:local:up`
   - Verify containers are healthy.
4. Database setup
   - `npm run db:generate`
   - `npm run db:migrate:dev`
   - `npm run db:seed` (if applicable)
5. Quality checks
   - `npm run lint:filesystem`
   - `npm run lint:clean`
   - `npm run lint:check`
   - `npm run lint:format:check`
6. Run app
   - `npm run start:dev`
   - Confirm Swagger/docs/health endpoints load.

## Output

- Setup status
- Failing step (if any)
- Recommended fix
- First-task readiness checklist
