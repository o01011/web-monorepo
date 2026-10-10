# Copilot Instructions for web-monorepo

## Project Overview

This is a **TypeScript monorepo** containing multiple full-stack applications and shared packages:

### Applications (`/apps`)
- **backend-nestjs**: NestJS API server
- **web-vite**: Vite + React frontend

### Shared Packages (`/packages`)
- **shared**: Shared utilities and types
- **db**: Database layer and models

## Development Environment

- **Runtime**: Node 22.23.2
- **Package Manager**: npm 10.9.8
- **TypeScript**: 6.0.3 (strict mode enabled)
- **Module System**: ES modules

## Build & Quality Tools

### Linting & Formatting
- **Biome** 2.5.10: Code linting and formatting
  - Run checks: `npm run lint:check` and `npm run lint:format:check`
  - Fix issues: `npm run lint:fix` and `npm run lint:format:fix`

### Type Checking
- **TypeScript**: `npm run lint:types:check`

### Unused Dependencies
- **Knip**: Detects unused code/dependencies
  - Run: `npm run lint:clean:check`

### File System Conventions
- **ls-lint**: Validates file/directory naming
  - Run: `npm run lint:fs:check`

### Git Hooks
- **Branch Name Lint**: Validates branch naming conventions
- **Lint-Staged**: Runs linting on staged files before commit
- **CommitLint**: Validates commit message format (Conventional Commits)
- Initialize hooks with: `npm run git:hook:init`

## TypeScript Configuration

Strict settings across the entire monorepo:
- `strict: true`
- `noImplicitAny: true`
- `noUncheckedIndexedAccess: true`
- `exactOptionalPropertyTypes: true`
- Target: ES2023
- Module: NodeNext

When working with any package/app, maintain these strictness levels.

## Code Style

- **Formatter**: Biome (configured in `biome.json`)
- **Line Ending**: LF (enforced by Biome)
- **Imports**: Sort by Biome rules
- **Naming**: Follow ls-lint conventions

## Workspace Commands

```bash
# Root-level commands
npm install                    # Install dependencies
npm run lint:check            # Check all linting
npm run lint:fix              # Fix linting issues
npm run lint:types:check      # Type check all workspaces
npm run lint:clean:check      # Check for unused code
npm run lint:format:check     # Format check
npm run lint:format:fix       # Auto-format code

# Git hooks
npm run git:hook:init         # Initialize git hooks
npm run git:hook:precommit    # Run pre-commit checks
npm run git:hook:prepush      # Run pre-push checks (builds all apps)

# Docker
npm run docker:compose:up     # Start docker services
npm run docker:compose:down   # Stop and remove services
```

## Git Workflow

### Branch Naming
Follow the branch name lint conventions (check `branch-name-lint.config.json`).

### Commit Messages
Use Conventional Commits format:
```
type(scope): subject

body
footer
```

Example: `feat(backend-nestjs): add user authentication endpoints`

### Pre-push Verification
The pre-push hook automatically builds all applications:
- `apps/backend-nestjs`
- `apps/web-vite`

Ensure builds pass before pushing.

## Working with Workspaces

### Install Dependencies
```bash
npm install -w apps/backend-nestjs        # Single workspace
npm install --workspaces                  # All workspaces
```

### Run Tests/Build
```bash
npm run build -w apps/backend-nestjs      # Single workspace
npm run build --workspaces                # All workspaces
```

## Key Conventions

1. **Module System**: ES modules throughout. Use `import`/`export` syntax.
2. **File Structure**: Each app/package has its own `package.json` and `tsconfig.json`
3. **Type Safety**: Strict TypeScript in all workspaces
4. **Imports**: Use workspace-relative paths, e.g., `from '@shared/types'`
5. **Environment Variables**: Check `.env.example` for required vars; never commit secrets
6. **Docker**: Multi-container setup available via docker-compose

## Before Making Changes

1. Run `npm run lint:types:check` to catch type errors early
2. Run `npm run lint:clean:check` to identify unused code
3. Follow Biome formatting by running `npm run lint:fix`
4. Validate branch name if creating a new branch
5. Ensure commit messages follow Conventional Commits
6. Test changes in the affected workspace

## Docker Environment

The project includes Docker support:
- `Dockerfile.web`: Frontend builds
- `Dockerfile.backend`: Backend builds
- `docker-compose.yml`: Multi-service orchestration

Commands:
```bash
npm run docker:compose:up
npm run docker:compose:down
npm run docker:compose:stop
npm run docker:compose:start
```

## OSes Supported

- macOS
- Linux
- Not Windows (see `package.json` os restrictions)

## Additional Context

- **Author**: o01011
- **License**: MIT
- **Repository**: https://github.com/o01011/web-monorepo

For detailed architecture and setup, see the root `README.md`.
