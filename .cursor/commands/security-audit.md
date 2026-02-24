# Security Audit

Run a practical security audit for this NestJS + Prisma project.

## Rules

- Do not expose secrets in output.
- Prioritize exploitable issues first.
- Include remediation steps and owner-friendly actions.

## Audit Steps

1. Dependency posture
   - `npm audit`
   - Check outdated critical dependencies.
2. Secret exposure checks
   - Verify `.env` and sensitive files are ignored.
   - Scan for hardcoded credentials/tokens.
3. Auth and authorization review
   - Verify JWT handling, token expiry, and guard usage.
   - Verify role/permission checks on protected routes.
4. Input and output hardening
   - Validate DTOs and request payloads.
   - Confirm no sensitive fields leak in API responses.
5. Infra and runtime hardening
   - Check security headers/CORS defaults.
   - Check rate limiting and brute-force protections.

## Output Format

### Findings

- Severity: <Critical|High|Medium|Low>
- Area: <dependency|auth|validation|secrets|infra>
- Issue:
- Impact:
- Fix:

### Quick Wins

- <safe fix that can be done immediately>

### Follow-up Tasks

- <deeper improvements>
