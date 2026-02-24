# Code Review Checklist

Perform a rigorous code review focused on behavior, risk, and maintainability.

## Rules

- Prioritize findings by severity: Critical, High, Medium, Low.
- Focus on bugs, regressions, security risks, and missing test coverage.
- Keep summary brief; findings come first.

## Review Scope

1. Functionality and correctness
2. Edge cases and error handling
3. Security and input validation
4. Data consistency and migration safety
5. API contracts and backward compatibility
6. Performance concerns (N+1, heavy loops, slow I/O)
7. Test coverage and test quality

## Output Format

### Findings

- Severity: <Critical|High|Medium|Low>
- File: `<path>`
- Issue: <what is wrong>
- Impact: <why this matters>
- Recommendation: <specific fix>

### Open Questions

- <unknowns needing clarification>

### Residual Risks

- <remaining risk even after fixes>

### Change Summary

- <2-4 bullets max>
