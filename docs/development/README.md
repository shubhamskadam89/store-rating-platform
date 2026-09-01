# Development Workflow Documentation

This document describes the engineering workflow, Git branching standards, pull request requirements, local development setup, and Definition of Done for the **Store Rating Platform**.

---

## 1. Prerequisites

- **Node.js**: v22.x (as specified in `.nvmrc`)
- **Package Manager**: `npm` (v10+)
- **Container Engine**: Docker Desktop or Docker Engine + Docker Compose
- **Database**: PostgreSQL 16 (provided via Docker Compose)

---

## 2. Git Branching Strategy

Development uses a branch-per-issue model branched from `main`. Direct pushes to `main` are disabled.

```text
main
│
├── feature/<issue-number>-<short-description>
├── fix/<issue-number>-<short-description>
├── chore/<issue-number>-<short-description>
└── docs/<issue-number>-<short-description>
```

### Branch Categories:

- `feature/`: New capabilities or specifications.
- `fix/`: Bug fixes and defect corrections.
- `chore/`: Tooling, build config, CI, dependency updates.
- `docs/`: Documentation additions and revisions.

---

## 3. Commit Convention

We enforce the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```text
<type>(<scope>): <short summary in imperative mood>

[optional body]

[optional footer(s) - e.g., Closes #123]
```

### Valid Types:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation updates
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without behavioral changes
- `test`: Adding or updating test cases
- `chore`: Maintenance, dependencies, or configuration

---

## 4. Issue & Pull Request Workflow

1. **Issue First**: Every task must have a GitHub Issue created using an appropriate template.
2. **Branch**: Create a branch following the naming convention (`feature/12-add-store-listing`).
3. **Develop & Test**: Implement strictly within the scope of the issue. Ensure all tests pass.
4. **Pull Request**: Open a PR referencing the issue with the PR template completed.
5. **Review**: Ensure CI passes and peer review approval is obtained before merging.

---

## 5. Definition of Done (DoD)

A pull request can only be merged when:

- [ ] Requirements and acceptance criteria are completely satisfied.
- [ ] No out-of-scope code or unnecessary abstractions are added.
- [ ] TypeScript strict mode compiles with zero errors.
- [ ] Linting (`npm run lint`) and formatting check (`npm run format:check`) pass with zero errors.
- [ ] Automated tests pass (`npm run test`).
- [ ] Relevant documentation in `docs/` is updated.
- [ ] No environment secrets or sensitive credentials are committed.
