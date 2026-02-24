# Run Quality Gate

Run the full local quality gate before commit or PR.

## Rules

- Stop on first failing command and report root cause.
- Do not change unrelated files while fixing quality issues.

## Steps

1. `npm run lint:filesystem`
2. `npm run lint:clean`
3. `npm run lint:check`
4. `npm run lint:format:check`
5. Optional build verification: `npm run build`

## Output

- Pass/fail per command
- Failure logs (trimmed to important lines)
- Suggested fix order
- Final ready-to-commit status
