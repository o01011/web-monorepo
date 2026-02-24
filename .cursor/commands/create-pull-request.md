# Create Pull Request

Create a pull request for the current branch changes.

## Rules

- MUST inspect staged and unstaged changes before committing.
- MUST NOT include secrets (`.env`, keys, credentials) in commits.
- MUST avoid destructive git operations (`reset --hard`, force-push) unless explicitly requested.
- MUST return the PR URL at the end.

## Steps

1. Inspect repo state:
   - `git status --short --branch`
   - `git diff`
   - `git diff --staged`
   - `git log --oneline -n 12`
2. Detect base branch from remote HEAD (usually `main`).
3. If there are local changes:
   - Stage relevant files only.
   - Create one clear commit message in project style.
   - Run hooks and fix failures before retrying.
4. Push branch:
   - If no upstream: `git push -u origin HEAD`
   - Else: `git push`
5. Create PR:
   - `gh pr create --base <base> --head <branch> --title "<title>" --body "<body>"`
6. If PR already exists:
   - Return existing PR URL.

## PR Body Template

## Summary

- <why this change exists>
- <main technical change>
- <risk or compatibility note>

## Test Plan

- [ ] `npm run lint:filesystem`
- [ ] `npm run lint:clean`
- [ ] `npm run lint:check`
- [ ] `npm run lint:format:check`

## Output

Return:

- Branch name
- Commit SHA (if created)
- PR URL
- Note if PR already existed
