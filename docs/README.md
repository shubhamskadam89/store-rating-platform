# Project Documentation

Welcome to the documentation for the **Store Rating Platform**.

---

## Documentation-First Approach

This repository strictly practices a **documentation-first engineering workflow**. All technical decisions, database designs, API schemas, and feature requirements are formally specified in this directory before writing application code.

```text
Requirements (docs/requirements/)
        ↓
Architecture & Design (docs/architecture/)
        ↓
Database Design (docs/database/)
        ↓
API Specifications (docs/api/)
        ↓
Architecture Decision Records (docs/decisions/)
        ↓
GitHub Issues (.github/ISSUE_TEMPLATE/)
        ↓
Implementation & Testing
```

---

## Directory Organization

| Directory                                   | Approved documents                                                   | Purpose                                                                                                                 |
| :------------------------------------------ | :------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| [`requirements/`](./requirements/README.md) | `PRODUCT_REQUIREMENTS.md`, `SCOPE.md`, `REQUIREMENT_TRACEABILITY.md` | What the system must do, what we will and will not build, and the mapping from requirement to implementation and tests. |
| [`architecture/`](./architecture/README.md) | `SYSTEM_DESIGN.md`, `ARCHITECTURE_DECISIONS.md`                      | How the system is structured, and an index of the key decisions.                                                        |
| [`database/`](./database/README.md)         | `DATABASE_DESIGN.md`                                                 | Entities, schema, relationships, constraints, and indexes.                                                              |
| [`api/`](./api/README.md)                   | `API_CONVENTIONS.md`, `API_SPECIFICATION.md`                         | API-wide rules, and the endpoint contracts.                                                                             |
| [`development/`](./development/README.md)   | `DEVELOPMENT_WORKFLOW.md`                                            | Branching, PR workflow, and the Definition of Done.                                                                     |
| [`decisions/`](./decisions/README.md)       | `ADR-XXX-*.md`                                                       | Individual architecture decisions with their rationale.                                                                 |

Each document is drafted, reviewed, and approved before the one downstream of it begins.

------------------------------------------------ | :--------------------------------------------------------------------------------------------- |
| [`requirements/`](./requirements/README.md) | Product scope, functional requirements, and non-functional requirements. |
| [`architecture/`](./architecture/README.md) | High-level system architecture, backend/frontend structures, security, and deployment designs. |
| [`database/`](./database/README.md) | Entity-relationship diagrams, schema definitions, indexing strategies, and migration plans. |
| [`api/`](./api/README.md) | REST API conventions, endpoint contracts, request/response payloads, and error formats. |
| [`decisions/`](./decisions/README.md) | Architecture Decision Records (ADRs) tracking key technical choices and tradeoffs. |
| [`development/`](./development/README.md) | Branching models, PR workflows, local development setup, and Definition of Done. |

---

## Document Maintenance Rules

1. **Keep documentation in sync**: Any architectural or schema change must update corresponding documentation in the same pull request.
2. **No phantom features**: Do not document features or requirements that have not been approved or are out of scope.
3. **Traceability**: All GitHub issues and pull requests must reference the relevant section of these documents.
