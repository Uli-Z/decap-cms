# Repository Guidelines

## Project Structure & Module Organization
Decap CMS is an Nx-managed workspace. Package code lives in `packages/*`, with `packages/decap-cms` shipping the browser bundle, `packages/decap-cms-core` holding shared logic, and adapters prefixed `decap-cms-backend-*` and `decap-cms-widget-*`. The demo site for manual QA resides in `dev-test/`. End-to-end fixtures and specs live in `cypress/`, while shared mocks sit under `__mocks__/`. Serverless helpers for hosted demos are in `functions/`.

## Build, Test, and Development Commands
- `npm run start`: serve the demo CMS at `http://localhost:8080` using `dev-test/config.yml`.
- `npm run develop`: run all packages’ watch tasks (except `decap-server`) via Nx.
- `npm run build`: compile ESM bundles and package builds; use before publishing.
- `npm run test`: run ESLint, TypeScript checks, and Jest suites.
- `npm run test:all`: extend `npm run test` with Cypress e2e (bundles sample app first).
- `npm run format`: apply ESLint fixes plus Prettier formatting.

## Coding Style & Naming Conventions
- Follow `.editorconfig`: 2-space indentation, UTF-8, no trailing whitespace, final newline.
- Prettier enforces single quotes, trailing commas, max 100 columns; run `npm run format` before committing.
- ESLint (`.eslintrc.js`) requires ordered imports and React best practices; allow console output only where intentional.
- Prefer PascalCase for components, camelCase for utilities, and maintain `decap-cms-*` prefixes for packages, widgets, and backends.
- Co-locate styles with components; lint CSS with `npm run lint:css`.

## Testing Guidelines
- Place unit specs in `src/__tests__/*.spec.[jt]s`; use @testing-library and keep snapshots in `__snapshots__/`.
- Mock shared integrations via `__mocks__/` or package-local fixtures.
- Run `npm run test` before every PR; use `npm run test:e2e` or `npm run test:e2e:dev` when touching workflows, auth flows, or widgets interacting with the demo app.
- Update Cypress fixtures in `cypress/fixtures` alongside spec changes and regenerate recorded assets when behavior shifts.

## Commit & Pull Request Guidelines
Commits are linted with `@commitlint/config-conventional`; prefer `type(scope): subject` (e.g., `feat(core): allow nested folders`). Use present tense, keep subjects ≤72 characters, and squash incidental fixups locally. Branch from `main`, rebase before opening a PR, and link related issues (`Fixes #123`). PRs should summarise the change, list test coverage, and attach screenshots for UI updates. Request two maintainer reviews and wait for green CI before merge.

## Configuration & Debug Tips
Customize `dev-test/config.yml` to mirror target deployments; clear the generated bundle with `npm run clean` if builds drift. When testing Git Gateway or Identity flows, run the mock server via `npm run mock:server:start` and point the CMS to the desired Netlify site through local storage as described in `CONTRIBUTING.md`.
