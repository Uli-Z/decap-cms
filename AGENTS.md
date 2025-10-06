# Repository Guidelines

## Project Structure & Module Organization
- Nx workspace; package code lives under `packages/`, with `packages/decap-cms` shipping the browser bundle and `packages/decap-cms-core` housing shared logic.
- Backend and widget adapters follow the `decap-cms-backend-*` and `decap-cms-widget-*` naming pattern; update them in their respective package directories.
- Demo site for manual QA is in `dev-test/`; E2E specs and fixtures reside in `cypress/`, and shared mocks live in `__mocks__/`.
- Serverless helpers for hosted demos are in `functions/`; keep assets co-located with their feature modules.

## Build, Test, and Development Commands
- `npm run start` – serve the demo CMS (uses `dev-test/config.yml`) at `http://localhost:8080`.
- `npm run develop` – run Nx watch tasks across packages (excludes `decap-server`).
- `npm run build` – produce ESM bundles and package artifacts; run before publishing.
- `npm run test` – execute ESLint, TypeScript, and Jest suites; use `npm run test:all` to add Cypress runs.
- `npm run format` – apply Prettier and ESLint fixes; commit formatted output only.

## Coding Style & Naming Conventions
- Follow `.editorconfig`: 2-space indentation, UTF-8, trim trailing whitespace, end files with a newline.
- Prettier enforces single quotes, trailing commas, and a 100-column limit; run `npm run format` before PRs.
- Use PascalCase for React components, camelCase for helpers, and keep package names prefixed with `decap-cms-*`.

## Testing Guidelines
- Place unit specs in `src/__tests__/*.spec.[jt]s`, using @testing-library where applicable; snapshots belong in `__snapshots__/`.
- Mock shared integrations via `__mocks__/` or package-specific fixtures; update `cypress/fixtures` alongside E2E changes.
- Run `npm run test` locally before pushing; add `npm run test:e2e` when touching workflows, auth, or widget flows.

## Commit & Pull Request Guidelines
- Commits follow `type(scope): subject` (≤72 chars) per `@commitlint/config-conventional`; squash fixups locally.
- Branch from `main`, rebase before opening a PR, and link relevant issues (example: `Fixes #123`).
- PRs should summarize changes, include test evidence, and attach screenshots for UI updates; wait for green CI and two maintainer reviews.

## Configuration & Debug Tips
- Adjust `dev-test/config.yml` to mirror target deployments; run `npm run clean` if bundles drift.
- For Git Gateway or Identity testing, start the mock server via `npm run mock:server:start` and set the target Netlify site through local storage as noted in `CONTRIBUTING.md`.
