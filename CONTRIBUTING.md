# Contributing to Store Rating Platform

Thank you for contributing to the Store Rating Platform. To maintain high engineering quality, consistency, and traceability, all contributors must follow the standards outlined in this guide.

---

## Core Engineering Principle

> **Strict feature scope, production-quality implementation.**

- Do not introduce out-of-scope features, unnecessary dependencies, or overly complex infrastructure (e.g., microservices, message queues, AI features, or unneeded caching).
- Maintain clean architecture, full test coverage, strong typing, secure configuration, and complete documentation.

---

## Documentation-First Workflow

All feature work must trace back to formal documentation:

1. **Requirements** in `docs/requirements/`
2. **Architecture & Technical Design** in `docs/architecture/`
3. **Database Design** in `docs/database/`
4. **API Contracts** in `docs/api/`
5. **Decisions (ADRs)** in `docs/decisions/`
6. **GitHub Issue Creation**
7. **Implementation & Unit / E2E Testing**

Do not begin feature implementation before the relevant design document and GitHub Issue exist.

---

## Branching Strategy

All development is managed through topic branches cut from `main`. **Direct commits to `main` are strictly prohibited.**

Branch naming convention:

```text
main
│
├── feature/<issue-number>-<short-description>
├── fix/<issue-number>-<short-description>
├── chore/<issue-number>-<short-description>
└── docs/<issue-number>-<short-description>
```

### Examples:

- `feature/12-user-registration-endpoint`
- `fix/24-rating-average-calculation`
- `chore/5-setup-github-ci`
- `docs/3-database-schema-design`

---

## Commit Conventions

We enforce [Conventional Commits](https://www.conventionalcommits.org/). Each commit message must be clear, imperative, and structured:

```text
<type>(<optional-scope>): <description>

[optional body]

[optional footer(s)]
```

### Types:

- `feat`: A new feature or capability
- `fix`: A bug fix
- `docs`: Documentation changes only
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to build process, auxiliary tools, or configuration

### Examples:

- `feat(auth): add login endpoint`
- `feat(ratings): add rating submission`
- `fix(auth): handle invalid credentials`
- `docs(requirements): add functional requirements`
- `chore(ci): configure GitHub Actions workflow`

---

## Pull Request Guidelines

1. **Link to GitHub Issue**: Every PR must be associated with an open issue.
2. **Single Responsibility**: Keep PRs focused strictly on the scoped issue.
3. **Self-Review Checklist**:
   - [ ] PR is linked to an issue
   - [ ] Scope matches requirements exactly
   - [ ] No unnecessary features or premature abstractions added
   - [ ] TypeScript strict mode passes with zero errors
   - [ ] Linting and formatting pass (`npm run lint`, `npm run format:check`)
   - [ ] Tests added/updated and passing
   - [ ] Documentation updated in `docs/`
   - [ ] No secrets or unverified environment files committed

---

## Definition of Done (DoD)

A task or issue is considered **Done** only when:

- [ ] Code strictly fulfills acceptance criteria defined in the linked issue.
- [ ] Automated tests cover normal execution paths and edge cases.
- [ ] All CI checks pass (lint, format, test, build).
- [ ] Documentation (`docs/`) is updated to reflect any changes.
- [ ] Code review is completed and approved.
- [ ] Changes are rebased cleanly onto `main`.
