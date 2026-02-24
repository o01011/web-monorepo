# Setup New Feature

Prepare a feature from requirements to implementation-ready branch.

## Inputs

- Feature name
- Business goal
- Affected modules/domains
- Breaking change risk (yes/no)

## Rules

- Keep scope small and iterative.
- Require acceptance criteria before coding.
- Plan test strategy before implementation.

## Steps

1. Define scope and acceptance criteria.
2. Choose branch name:
   - `feat/<short-feature-name>`
3. Check architecture impact:
   - API contracts
   - Prisma schema/migrations
   - DTO validation and i18n messages
4. Draft implementation plan:
   - Files to add/update
   - Risks and rollback options
5. Draft testing plan:
   - Unit/integration/manual checks
6. Produce checklist for implementation kickoff.

## Output

- Branch name
- Scope summary
- Technical plan
- Test plan
- Risks and mitigations
