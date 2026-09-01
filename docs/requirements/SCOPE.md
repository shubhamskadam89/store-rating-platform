# Scope Definition — Store Rating Platform

## 1. Document Control

| Field            | Value                                                                         |
| :--------------- | :---------------------------------------------------------------------------- |
| **Title**        | Scope Definition — Store Rating Platform                                      |
| **Status**       | Draft                                                                         |
| **Version**      | 0.1.0                                                                         |
| **Last Updated** | 2026-09-01                                                                    |
| **Owner**        | Project Maintainer                                                            |
| **Depends on**   | `PRODUCT_REQUIREMENTS.md` v1.0.0 (Approved)                                   |
| **Source**       | FullStack Intern Coding Challenge V1.1, via the approved product requirements |

**What this document decides.** What the project commits to building, what it commits to
not building, and what "complete" means at the product level.

**What this document does not decide.** How anything is built, and how any underdetermined
requirement should behave. Section 6 lists the open questions carried forward from the
product requirements; none is answered here. Answering one inside a scope document would
disguise a design decision as a boundary.

---

## 2. Purpose

`PRODUCT_REQUIREMENTS.md` establishes what the specification requires. It is deliberately
silent on everything the specification does not mention, because absence of a statement
there means absence of a requirement — not a decision.

This document supplies the decisions. Where the specification is silent about a capability,
this document states whether the project will build it anyway, and records that as a
project choice rather than as something the challenge demanded or forbade.

The result is a boundary a reviewer can check the delivered application against: everything
inside it is expected to work, and nothing outside it is missing by accident.

---

## 3. Scope Principles

**P-01 — Every approved requirement is in scope.** All 36 functional requirements, all 9
validation requirements, and all 6 non-functional expectations in `PRODUCT_REQUIREMENTS.md`
are committed deliverables. Scope may add to the specification; it may not subtract from it.

**P-02 — Silence is not prohibition.** The specification not mentioning a capability does
not forbid it. Every exclusion in Section 5 is therefore attributed to this project, never
to the challenge.

**P-03 — Ambiguity is not exclusion.** An underdetermined requirement is in scope; only its
behaviour is undecided. OQ-01 through OQ-14 concern requirements that are all in scope. They
appear in Section 6 as deferred decisions, never in Section 5 as exclusions.

**P-04 — Quality is not extra scope.** Testing, validation, error handling, migrations,
containerisation and documentation are how the in-scope items are built, in service of
NFR-001 through NFR-003. They are not additional product features and do not widen scope.

**P-05 — Exclusions are conservative.** Section 5 lists a capability only when it is both
absent from the specification and plausibly expected by someone reviewing the delivered
application. It is not an inventory of every feature the platform does not have.

**P-06 — Scope changes are document changes.** Anything added or removed after approval is
a revision of this document with a version bump, not an undocumented decision made during
implementation.

---

## 4. In Scope

Every item below is committed. The requirement IDs are the authority; the prose is a
summary of them.

### 4.1 Authentication and access

| Capability                                                    | Requirements             |
| :------------------------------------------------------------ | :----------------------- |
| A single login system shared by all three roles               | FR-AUTH-001              |
| Role-dependent functionality after authentication             | FR-AUTH-002              |
| Self-service registration for Normal Users                    | FR-AUTH-003              |
| Login for registered users of any role                        | FR-AUTH-004              |
| Logout for all three roles                                    | FR-AUTH-005, 006, 007    |
| Password update after login for Normal Users and Store Owners | FR-AUTH-008, FR-AUTH-009 |

Whether the System Administrator may also update their own password is OQ-09. The capability
is in scope if the answer is yes; the question is what is deferred, not the feature.

### 4.2 User management

| Capability                                               | Requirements |
| :------------------------------------------------------- | :----------- |
| Creation of Normal Users by the System Administrator     | FR-ADMIN-002 |
| Creation of Admin Users by the System Administrator      | FR-ADMIN-003 |
| Capture of Name, Email, Password and Address at creation | FR-ADMIN-004 |
| A user listing showing Name, Email, Address and Role     | FR-ADMIN-009 |
| A user detail view showing Name, Email, Address and Role | FR-ADMIN-011 |
| A Store Owner's Rating shown in that detail view         | FR-ADMIN-012 |

How Store Owner accounts come into existence is OQ-01. The Store Owner role and all of its
functionality are in scope regardless of how that question resolves.

### 4.3 Store management

| Capability                                              | Requirements |
| :------------------------------------------------------ | :----------- |
| Creation of stores by the System Administrator          | FR-ADMIN-001 |
| A store listing showing Name, Email, Address and Rating | FR-ADMIN-008 |

### 4.4 Rating management

| Capability                                                     | Requirements  |
| :------------------------------------------------------------- | :------------ |
| Submission of a rating between 1 and 5 for an individual store | FR-RATING-001 |
| Modification of a previously submitted rating                  | FR-RATING-002 |
| Derivation and display of an overall rating per store          | FR-RATING-003 |
| Presentation of a store's average rating to its owner          | FR-RATING-004 |

### 4.5 System Administrator capabilities

| Capability                                                     | Requirements               |
| :------------------------------------------------------------- | :------------------------- |
| A dashboard reporting total users, total stores, total ratings | FR-ADMIN-005, 006, 007     |
| Store and user creation                                        | FR-ADMIN-001, 002, 003     |
| Store and user listings                                        | FR-ADMIN-008, FR-ADMIN-009 |
| Filtering of listings by Name, Email, Address and Role         | FR-ADMIN-010               |
| User detail views                                              | FR-ADMIN-011, FR-ADMIN-012 |
| Logout                                                         | FR-AUTH-005                |

### 4.6 Normal User capabilities

| Capability                                                                            | Requirements             |
| :------------------------------------------------------------------------------------ | :----------------------- |
| Registration, login and logout                                                        | FR-AUTH-003, 004, 006    |
| Password update after login                                                           | FR-AUTH-008              |
| Viewing all registered stores                                                         | FR-USER-001              |
| Searching stores by Name and by Address                                               | FR-USER-002, FR-USER-003 |
| A store listing showing Store Name, Address, Overall Rating and the user's own rating | FR-USER-004              |
| Submitting and modifying a rating from that listing                                   | FR-USER-005, FR-USER-006 |

### 4.7 Store Owner capabilities

| Capability                                          | Requirements             |
| :-------------------------------------------------- | :----------------------- |
| Login and logout                                    | FR-AUTH-004, FR-AUTH-007 |
| Password update after login                         | FR-AUTH-009              |
| A dashboard listing the users who rated their store | FR-OWNER-001             |
| A dashboard showing their store's average rating    | FR-OWNER-002             |

### 4.8 Validation

All nine validation requirements are in scope and enforced: Name length bounds (VR-001,
VR-002), Address maximum length (VR-003), password composition and length (VR-004 through
VR-007), email format (VR-008), and rating range (VR-009).

Validation is enforced server-side for every rule. Client-side validation is additionally
in scope as a usability measure under NFR-001, and is never the only enforcement point.
The entities each rule applies to, and the definition of a special character, are OQ-13
and OQ-14.

### 4.9 Listing, filtering and sorting

| Capability                                                        | Requirements             |
| :---------------------------------------------------------------- | :----------------------- |
| Ascending and descending sorting on all tables                    | FR-LIST-001, FR-LIST-002 |
| Sorting on key fields including Name and Email                    | FR-LIST-003              |
| Filtering of administrator listings by Name, Email, Address, Role | FR-ADMIN-010             |
| Store search by Name and Address for Normal Users                 | FR-USER-002, FR-USER-003 |

The complete set of sortable fields is OQ-12, and whether listings are paginated is OQ-05.

---

## 5. Out of Scope

Each item below is **a decision by this project**, not a statement about the specification.
The specification neither requires nor forbids any of them. Each is excluded because it is
absent from the requirements and delivering it would add cost without serving the challenge.

### 5.1 Authentication and accounts

| Excluded                                             | Note                                                                                                                   |
| :--------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| Password reset / forgot-password flows               | Password update by an authenticated user (FR-AUTH-008, 009) is in scope; recovery for a user who cannot log in is not. |
| Email verification of new accounts                   | Registration completes without an email round trip.                                                                    |
| Third-party, social or single sign-on authentication | The single login system of FR-AUTH-001 is credential-based.                                                            |
| Multi-factor authentication                          | —                                                                                                                      |
| Self-service account deletion or deactivation        | —                                                                                                                      |

### 5.2 User management

| Excluded                                       | Note                                                              |
| :--------------------------------------------- | :---------------------------------------------------------------- |
| Editing a user after creation                  | The specification requires creation, listing and viewing only.    |
| Deleting or deactivating users                 | —                                                                 |
| Users editing their own name, email or address | Password update remains in scope per FR-AUTH-008 and FR-AUTH-009. |
| Bulk user import or export                     | —                                                                 |
| Profile photographs or avatars                 | —                                                                 |

### 5.3 Store management

| Excluded                                             | Note                                                                    |
| :--------------------------------------------------- | :---------------------------------------------------------------------- |
| Editing a store after creation                       | The specification requires creation and listing only.                   |
| Deleting stores                                      | —                                                                       |
| Store logos, photographs or media                    | —                                                                       |
| Store categories, tags, opening hours or geolocation | The store attributes are Name, Email and Address.                       |
| A workflow for an owner to claim an existing store   | Related to OQ-01, but the claim workflow itself is excluded either way. |

### 5.4 Ratings

| Excluded                                                    | Note                                                         |
| :---------------------------------------------------------- | :----------------------------------------------------------- |
| Written reviews, comments or free-text feedback             | The rating is a value between 1 and 5.                       |
| Deleting a submitted rating                                 | Submission and modification are in scope; withdrawal is not. |
| Rating history, versioning or audit trails                  | —                                                            |
| Store Owner replies to ratings                              | —                                                            |
| Helpfulness voting, moderation, reporting or abuse handling | —                                                            |
| Verification that a rater has actually visited the store    | —                                                            |

### 5.5 Platform capabilities

| Excluded                                                  | Note                                                                 |
| :-------------------------------------------------------- | :------------------------------------------------------------------- |
| Email, push or in-app notifications                       | —                                                                    |
| Analytics or reporting beyond the two required dashboards | FR-ADMIN-005 through 007 and FR-OWNER-001, 002 define the reporting. |
| Recommendation, ranking or personalisation features       | —                                                                    |
| Machine learning or AI capabilities                       | —                                                                    |
| Native or hybrid mobile applications                      | The deliverable is a web application.                                |
| Internationalisation and localisation                     | A single language and locale.                                        |
| Multi-tenancy or organisation-level separation            | —                                                                    |
| A public API for third-party consumers                    | The API serves this project's own frontend.                          |

---

## 6. Deferred Decisions

The following are carried forward from `PRODUCT_REQUIREMENTS.md` Section 10. Every
requirement they touch is **in scope**. What is undecided is behaviour, not inclusion.

**None is resolved in this document.** The next step after this document is approved is an
OQ triage that sorts them by when an answer is actually needed — blocking now, blocking
database design, blocking API design, or safely open until implementation. Only the blocking
ones get resolved before design begins.

| ID    | Question                                       | Affects an in-scope capability | Status   |
| :---- | :--------------------------------------------- | :----------------------------- | :------- |
| OQ-01 | Store Owner creation and store association     | Section 4.2, 4.7               | Deferred |
| OQ-02 | Store Owner to store cardinality               | Section 4.7                    | Deferred |
| OQ-03 | May non-Normal-User roles submit ratings       | Section 4.4                    | Deferred |
| OQ-04 | Is an owner mandatory at store creation        | Section 4.3                    | Deferred |
| OQ-05 | Pagination requirements                        | Section 4.9                    | Deferred |
| OQ-06 | Whole-number ratings                           | Section 4.4, 4.8               | Deferred |
| OQ-07 | Overall rating calculation and presentation    | Section 4.4, 4.5, 4.6, 4.7     | Deferred |
| OQ-08 | Logout and session invalidation semantics      | Section 4.1                    | Deferred |
| OQ-09 | System Administrator password update           | Section 4.1                    | Deferred |
| OQ-10 | Store Owners in the administrator user listing | Section 4.2, 4.5               | Deferred |
| OQ-11 | Meaning of a Store Owner's "Rating"            | Section 4.2                    | Deferred |
| OQ-12 | Sortable fields beyond Name and Email          | Section 4.9                    | Deferred |
| OQ-13 | Scope of the Name and Address validation rules | Section 4.8                    | Deferred |
| OQ-14 | Definition of a special character              | Section 4.8                    | Deferred |

A deferred decision is closed by whichever document properly owns it — a requirements
clarification, this scope document, `DATABASE_DESIGN.md`, `API_CONVENTIONS.md`,
`API_SPECIFICATION.md`, or an ADR. An ADR is reserved for decisions with genuine
architectural weight and real alternatives; routine choices are recorded in the design
document they belong to.

---

## 7. Delivery Boundaries

### 7.1 Delivered

| Deliverable                                                                   |
| :---------------------------------------------------------------------------- |
| A working web application implementing every in-scope capability in Section 4 |
| Source code for the frontend and the backend in a single repository           |
| A relational database schema with migrations                                  |
| The design documentation set under `docs/`                                    |
| Automated tests over the critical paths described in 7.3                      |
| A containerised local environment that runs the full stack                    |
| Continuous integration running lint, tests and builds                         |
| A README covering setup, configuration and how to exercise each role          |

### 7.2 Not delivered

| Not delivered                                                                                                                  | Note                                                                                                               |
| :----------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------- |
| Production infrastructure: microservices, message queues, distributed caching, orchestration platforms, event sourcing or CQRS | Not warranted by the requirements. This is an architectural boundary; the rationale belongs in `SYSTEM_DESIGN.md`. |
| Performance, load or stress testing                                                                                            | No performance target exists to test against — see `PRODUCT_REQUIREMENTS.md` Section 9.                            |
| A committed browser or device support matrix                                                                                   | Modern evergreen browsers, without a tested commitment.                                                            |
| A committed accessibility conformance level                                                                                    | Reasonable semantic markup, without a conformance claim.                                                           |
| Backup, retention or disaster recovery procedures                                                                              | —                                                                                                                  |
| Security certification or formal audit against a named standard                                                                | Security measures are engineering decisions recorded in `SYSTEM_DESIGN.md`.                                        |

### 7.3 Testing boundary

Automated tests cover the paths where a defect would be materially damaging:
authentication, role-based authorisation, the validation rules in Section 4.8, and rating
submission and modification. Exhaustive coverage of every component and view is explicitly
not a delivery commitment. The concrete test plan belongs in `DEVELOPMENT_WORKFLOW.md`.

### 7.4 Decision required

**Is a hosted, publicly reachable deployment a deliverable?** The specification does not
require one. It is a delivery-boundary question rather than a product-scope question, and it
is left open here for explicit decision. If accepted, Section 7.1 gains a deployment
deliverable and Section 7.2 loses nothing; if declined, the containerised local environment
is the sole runtime deliverable.

---

## 8. Definition of Product Completion

Product completion is defined here in product terms. Engineering completion — the
per-change Definition of Done covering review, tests and documentation — is defined in
`DEVELOPMENT_WORKFLOW.md` and is a separate standard.

The product is complete when all of the following hold.

**Functional coverage**

- Every functional requirement FR-AUTH-001 through FR-LIST-003 is implemented and can be
  demonstrated in the running application.
- Each of the three user journeys in `PRODUCT_REQUIREMENTS.md` Section 8 can be walked end
  to end without a defect or a dead end.
- Every capability listed in Section 4 of this document is reachable through the user
  interface, not solely through the API.

**Validation**

- All nine validation requirements are enforced on the server for every entry point that
  accepts the field.
- A rejected input produces a message that identifies the field and the rule.

**Listings**

- Every table supports ascending and descending sorting.
- The administrator's filters operate on Name, Email, Address and Role.
- Store search operates on Name and Address.

**Reporting**

- The administrator dashboard reports total users, total stores and total submitted ratings,
  and the figures agree with the underlying data.
- The Store Owner dashboard reports the store's average rating and the users who rated it.

**Boundaries**

- No capability listed in Section 5 has been built.
- Every deferred decision in Section 6 has been resolved by an approved document, and the
  implementation matches that resolution.

**Delivery**

- Everything in Section 7.1 is present, and the application runs from a clean clone by
  following the README.
- Continuous integration passes on the default branch.

---

## 9. Approval

| Step     | Status     |
| :------- | :--------- |
| Drafted  | 2026-09-01 |
| Reviewed | Pending    |
| Approved | Pending    |

On approval, the next step is the OQ triage described in Section 6 — not the resolution of
all fourteen questions, and not the start of system design.
