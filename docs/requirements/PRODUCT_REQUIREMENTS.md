# Product Requirements — Store Rating Platform

## 1. Document Control

| Field            | Value                                                                                    |
| :--------------- | :--------------------------------------------------------------------------------------- |
| **Title**        | Product Requirements — Store Rating Platform                                             |
| **Status**       | Draft                                                                                    |
| **Source**       | FullStack Intern Coding Challenge, V1.1 — the authoritative specification for this build |
| **Version**      | 0.1.0                                                                                    |
| **Last Updated** | 2026-09-01                                                                               |
| **Owner**        | Project Maintainer                                                                       |

**Scope of this document.** This document records _what the system must do_, derived
strictly from the coding challenge specification. It does not design the database, does
not define API endpoints, and does not resolve the ambiguities it identifies. Those are
the work of `docs/database/DATABASE_DESIGN.md`, `docs/api/API_SPECIFICATION.md`, and the
ADRs in `docs/decisions/` respectively, each produced after this document is approved.

**Reading the traceability column.** Every requirement below carries a `Source` note.
`Specification` means the requirement is stated in the challenge. `Derived` means it
follows necessarily from a stated requirement, with the derivation given. Nothing in this
document is a product decision made by the author; where the specification is silent, the
gap is recorded in [Section 10](#10-open-questions-and-ambiguities) rather than filled.

---

## 2. Purpose

The Store Rating Platform is a web application that lets users submit ratings for stores
registered on the platform. Ratings are expressed on a scale of 1 to 5.

The platform serves three distinct kinds of user through a single login system. What a
user can do after authenticating is determined by the role assigned to their account.

The purpose of this build is to satisfy the coding challenge specification completely,
using implementation practices appropriate to production software. It is not to design a
commercial product, and no capability appears in this document that the specification does
not call for.

---

## 3. Product Overview

### 3.1 The problem

Stores are registered on the platform, but there is no mechanism for the people who use
those stores to record an opinion of them, and no mechanism for store owners or platform
administrators to see what that opinion is. The platform closes that loop: users rate
stores, owners see how their store is rated and by whom, and administrators see the state
of the platform as a whole.

### 3.2 Primary users

| User                 | Relationship to the platform                                                                  |
| :------------------- | :-------------------------------------------------------------------------------------------- |
| Normal User          | A member of the public who registers, browses the registered stores, and rates them.          |
| Store Owner          | A person whose store is registered on the platform and who wants visibility into its ratings. |
| System Administrator | An operator of the platform who registers stores and users and monitors overall activity.     |

### 3.3 The three roles

The system contains exactly three roles: **System Administrator**, **Normal User**, and
**Store Owner**. Role definitions and responsibilities are given in
[Section 5](#5-user-roles).

### 3.4 High-level capabilities

- A single authentication system shared by all three roles, with functionality varying by role.
- Self-service registration for Normal Users.
- Store registration and user creation performed by the System Administrator.
- Store discovery, with search by store name and by address, for Normal Users.
- Rating submission and modification, on a 1-to-5 scale, by Normal Users.
- A System Administrator dashboard reporting platform-wide totals.
- A Store Owner dashboard reporting the store's average rating and the users who rated it.
- Listings that support ascending and descending sorting, and, for the administrator,
  filtering.
- Field-level validation of names, addresses, passwords, and email addresses.

---

## 4. Technology Constraints

The specification constrains the technology; the project then selects from within that
constraint. The two are kept separate here because the distinction matters when
justifying a choice later.

### 4.1 Source requirement

The challenge requires:

| Layer    | Permitted by the specification          |
| :------- | :-------------------------------------- |
| Backend  | ExpressJS **or** Loopback **or** NestJS |
| Database | PostgreSQL **or** MySQL                 |
| Frontend | ReactJS                                 |

The specification additionally requires that best practices be followed in frontend
development, backend development, and database schema design. It does not prescribe what
those practices are.

### 4.2 Project decision

From within the permitted set, this project selects:

| Layer    | Selected   | Status                                                |
| :------- | :--------- | :---------------------------------------------------- |
| Backend  | NestJS     | Project decision — one of three permitted options     |
| Database | PostgreSQL | Project decision — one of two permitted options       |
| Frontend | React      | Specification requirement — the only permitted option |
| Language | TypeScript | Project decision — not mentioned by the specification |

TypeScript, and every tooling choice in the repository (Prisma, Vite, Docker, the CI
pipeline, the testing frameworks), are project decisions taken in service of the
"best practices" requirement. **None of them is mandated by the challenge**, and no part of
this document should be read as claiming otherwise. Their rationale belongs in
`docs/architecture/SYSTEM_DESIGN.md` and the ADRs, not here.

---

## 5. User Roles

| Role                     | Description                                                                                       | Primary responsibilities per the specification                                                                                                           |
| :----------------------- | :------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **System Administrator** | Operates the platform. Registers the stores and the user accounts that everything else builds on. | Add stores; add Normal Users; add Admin Users; view platform totals; view and filter user and store listings; view user details; log out.                |
| **Normal User**          | A member of the public who rates stores.                                                          | Sign up; log in; update password; view all registered stores; search stores by name and by address; submit a rating; modify a submitted rating; log out. |
| **Store Owner**          | Owns a store registered on the platform and monitors its ratings.                                 | Log in; update password; view the users who rated their store; view their store's average rating; log out.                                               |

No role holds a permission beyond those listed. In particular, the specification grants
rating submission to the Normal User only, and does not state whether a Store Owner or a
System Administrator may rate stores — see **OQ-03** in
[Section 10](#10-open-questions-and-ambiguities). That silence is recorded, not resolved.

---

## 6. Functional Requirements

### 6.1 Authentication and account access (`FR-AUTH-*`)

| ID              | Requirement                                                                                                     | Source                                                                                                                               |
| :-------------- | :-------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| **FR-AUTH-001** | The system shall provide a single login system used by all users, regardless of role.                           | Specification — "A single login system must be used for all users."                                                                  |
| **FR-AUTH-002** | The functionality available to an authenticated user shall be determined by the role assigned to their account. | Specification — "Users have different functionality based on their assigned role."                                                   |
| **FR-AUTH-003** | A visitor shall be able to register as a Normal User through a registration page.                               | Specification — "Normal Users must be able to register through a registration page."                                                 |
| **FR-AUTH-004** | A registered user of any role shall be able to log in.                                                          | Specification — log-in is stated for the Normal User and the Store Owner, and is entailed by the single login system in FR-AUTH-001. |
| **FR-AUTH-005** | A System Administrator shall be able to log out.                                                                | Specification — "The administrator can log out."                                                                                     |
| **FR-AUTH-006** | A Normal User shall be able to log out.                                                                         | Specification — "Can log out."                                                                                                       |
| **FR-AUTH-007** | A Store Owner shall be able to log out.                                                                         | Specification — "Can log out."                                                                                                       |
| **FR-AUTH-008** | A Normal User shall be able to update their password after logging in.                                          | Specification — "Can update their password after logging in."                                                                        |
| **FR-AUTH-009** | A Store Owner shall be able to update their password after logging in.                                          | Specification — "Can update their password after logging in."                                                                        |

> **Note on the System Administrator's password.** The specification grants password update
> to the Normal User and the Store Owner explicitly, and is silent for the System
> Administrator. No `FR-AUTH-*` requirement is written for it here. See **OQ-09**.

### 6.2 System Administrator (`FR-ADMIN-*`)

| ID               | Requirement                                                                                                                       | Source                                                                                                    |
| :--------------- | :-------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| **FR-ADMIN-001** | The System Administrator shall be able to add new stores.                                                                         | Specification — "Can add new stores."                                                                     |
| **FR-ADMIN-002** | The System Administrator shall be able to add new Normal Users.                                                                   | Specification — "Can add new Normal Users."                                                               |
| **FR-ADMIN-003** | The System Administrator shall be able to add new Admin Users.                                                                    | Specification — "Can add new Admin Users."                                                                |
| **FR-ADMIN-004** | When adding a user, the System Administrator shall supply the user's Name, Email, Password, and Address.                          | Specification — "The administrator can add new users with: Name, Email, Password, Address."               |
| **FR-ADMIN-005** | The administrator dashboard shall display the total number of users registered on the platform.                                   | Specification — "Total number of users."                                                                  |
| **FR-ADMIN-006** | The administrator dashboard shall display the total number of stores registered on the platform.                                  | Specification — "Total number of stores."                                                                 |
| **FR-ADMIN-007** | The administrator dashboard shall display the total number of submitted ratings.                                                  | Specification — "Total number of submitted ratings."                                                      |
| **FR-ADMIN-008** | The System Administrator shall be able to view a list of stores showing each store's Name, Email, Address, and Rating.            | Specification — "Can view a list of stores containing: Name, Email, Address, Rating."                     |
| **FR-ADMIN-009** | The System Administrator shall be able to view a list of users showing each user's Name, Email, Address, and Role.                | Specification — "Can view a list of Normal Users and Admin Users containing: Name, Email, Address, Role." |
| **FR-ADMIN-010** | The System Administrator shall be able to filter listings by Name, Email, Address, and Role.                                      | Specification — "Can apply filters on listings based on: Name, Email, Address, Role."                     |
| **FR-ADMIN-011** | The System Administrator shall be able to view the details of a user, showing Name, Email, Address, and Role.                     | Specification — "Can view details of all users containing: Name, Email, Address, Role."                   |
| **FR-ADMIN-012** | When the user being viewed under FR-ADMIN-011 is a Store Owner, the details shall additionally display that Store Owner's Rating. | Specification — "If the user is a Store Owner: Their Rating must also be displayed."                      |

> **Note on FR-ADMIN-009.** The specification names "Normal Users and Admin Users" as the
> contents of this list, while FR-ADMIN-010 permits filtering by Role and FR-ADMIN-012
> describes viewing a Store Owner's details. Whether Store Owners appear in this listing is
> not stated. See **OQ-10**.
>
> **Note on FR-ADMIN-012.** "Their Rating" is not defined. See **OQ-11**.

### 6.3 Normal User (`FR-USER-*`)

| ID              | Requirement                                                                                                                                           | Source                                                                                                       |
| :-------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| **FR-USER-001** | A Normal User shall be able to view all registered stores.                                                                                            | Specification — "Can view all registered stores."                                                            |
| **FR-USER-002** | A Normal User shall be able to search for stores by store Name.                                                                                       | Specification — "Can search stores by Name."                                                                 |
| **FR-USER-003** | A Normal User shall be able to search for stores by Address.                                                                                          | Specification — "Can search stores by Address."                                                              |
| **FR-USER-004** | The store listing presented to a Normal User shall display, for each store: Store Name, Address, Overall Rating, and the user's own submitted rating. | Specification — "Store listings must display: Store Name, Address, Overall Rating, User's Submitted Rating." |
| **FR-USER-005** | The store listing shall offer the Normal User an option to submit a rating.                                                                           | Specification — "Option to submit a rating."                                                                 |
| **FR-USER-006** | The store listing shall offer the Normal User an option to modify a rating they have already submitted.                                               | Specification — "Option to modify a submitted rating."                                                       |

### 6.4 Store Owner (`FR-OWNER-*`)

| ID               | Requirement                                                                                                    | Source                                                                        |
| :--------------- | :------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| **FR-OWNER-001** | The Store Owner dashboard shall display a list of the users who submitted ratings for the Store Owner's store. | Specification — "View a list of users who submitted ratings for their store." |
| **FR-OWNER-002** | The Store Owner dashboard shall display the average rating of the Store Owner's store.                         | Specification — "View the average rating of their store."                     |

> **Note.** The specification refers to the Store Owner's store in the singular throughout,
> but does not state whether an owner may hold more than one. See **OQ-02**. It likewise
> does not state how a Store Owner account comes to exist or how it becomes associated with
> a store. See **OQ-01**.

### 6.5 Ratings (`FR-RATING-*`)

| ID                | Requirement                                                                                        | Source                                                                                                                                                                                                                   |
| :---------------- | :------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **FR-RATING-001** | A Normal User shall be able to submit a rating between 1 and 5 for an individual store.            | Specification — "Can submit a rating between 1 and 5 for an individual store."                                                                                                                                           |
| **FR-RATING-002** | A Normal User shall be able to modify a rating they have previously submitted.                     | Specification — "Can modify their submitted rating."                                                                                                                                                                     |
| **FR-RATING-003** | The system shall present an overall rating for a store, derived from the ratings submitted for it. | Derived — FR-USER-004 requires an "Overall Rating" per store and FR-ADMIN-008 a store "Rating"; both require the system to produce one from submitted ratings. The method of derivation is not specified: see **OQ-07**. |
| **FR-RATING-004** | The system shall present the average rating of a store to that store's owner.                      | Specification — "View the average rating of their store."                                                                                                                                                                |

### 6.6 Listings, sorting, and filtering (`FR-LIST-*`)

These requirements apply across the listings introduced above rather than to a single role,
so they carry their own prefix.

| ID              | Requirement                                                          | Source                                                                                                                                                |
| :-------------- | :------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **FR-LIST-001** | All tables in the application shall support ascending sorting.       | Specification — "All tables must support: Ascending sorting."                                                                                         |
| **FR-LIST-002** | All tables in the application shall support descending sorting.      | Specification — "All tables must support: Descending sorting."                                                                                        |
| **FR-LIST-003** | Sorting shall be supported for key fields, including Name and Email. | Specification — "Sorting should be supported for key fields such as: Name, Email." The word "such as" leaves the full field list open: see **OQ-12**. |

---

## 7. Validation Requirements

| ID         | Field    | Rule                                         | Source                                                         |
| :--------- | :------- | :------------------------------------------- | :------------------------------------------------------------- |
| **VR-001** | Name     | Minimum 20 characters.                       | Specification — "Minimum 20 characters."                       |
| **VR-002** | Name     | Maximum 60 characters.                       | Specification — "Maximum 60 characters."                       |
| **VR-003** | Address  | Maximum 400 characters.                      | Specification — "Maximum 400 characters."                      |
| **VR-004** | Password | Minimum 8 characters.                        | Specification — "Minimum 8 characters."                        |
| **VR-005** | Password | Maximum 16 characters.                       | Specification — "Maximum 16 characters."                       |
| **VR-006** | Password | Must contain at least one uppercase letter.  | Specification — "At least one uppercase letter."               |
| **VR-007** | Password | Must contain at least one special character. | Specification — "At least one special character."              |
| **VR-008** | Email    | Must follow standard email validation rules. | Specification — "Must follow standard email validation rules." |
| **VR-009** | Rating   | Must be between 1 and 5.                     | Specification — "Ratings must range from: 1 to 5."             |

**Rules deliberately not written.** The specification does not state:

- whether the Name rules (VR-001, VR-002) apply to store names as well as to user names — see **OQ-13**;
- whether the Address rule (VR-003) applies to store addresses as well as to user addresses — see **OQ-13**;
- what counts as a "special character" for VR-007 — see **OQ-14**;
- whether a rating must be a whole number — see **OQ-06**;
- whether an email address must be unique across accounts.

No requirement has been invented to close these gaps. Any rule the project later adopts to
close one is a technical decision, is labelled as such, and belongs in an ADR — not in this
section.

---

## 8. User Journeys

The journeys below are those the specification supports. No journey has been added.

### 8.1 Normal User

```text
Register
   ↓
Login
   ↓
Browse / Search Stores
   ↓
Submit or Modify Rating
   ↓
Logout
```

### 8.2 System Administrator

```text
Login
   ↓
Dashboard
   ↓
Manage Users / Stores
   ↓
View Details
   ↓
Filter / Sort Listings
   ↓
Logout
```

### 8.3 Store Owner

```text
Login
   ↓
Dashboard
   ↓
View Rating Users
   ↓
View Store Average Rating
   ↓
Logout
```

---

## 9. Non-Functional Expectations

The specification states its non-functional expectations qualitatively. They are recorded
here as stated, without being converted into numbers the specification does not contain.

| ID          | Expectation                                                                               | Source                                                                         |
| :---------- | :---------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------- |
| **NFR-001** | Frontend development shall follow best practices.                                         | Specification — "Best practices must be followed for: Frontend development."   |
| **NFR-002** | Backend development shall follow best practices.                                          | Specification — "Best practices must be followed for: Backend development."    |
| **NFR-003** | Database schema design shall follow best practices.                                       | Specification — "Best practices must be followed for: Database schema design." |
| **NFR-004** | The system shall enforce the validation rules in Section 7 correctly.                     | Specification — the validation requirements are stated as requirements.        |
| **NFR-005** | Application tables shall be sortable in both directions, per FR-LIST-001 and FR-LIST-002. | Specification — stated under additional requirements.                          |
| **NFR-006** | The codebase shall be maintainable.                                                       | Derived — entailed by NFR-001 through NFR-003.                                 |

**Not specified, and therefore not stated as requirements here:** response time or
throughput targets; uptime or availability targets; concurrent user or data volume targets;
named security standards or compliance regimes; browser or device support matrices;
accessibility conformance levels; backup, retention, or disaster recovery objectives;
localisation.

The absence of a target above is not permission to ignore the concern. Several of these —
how authentication credentials are protected, in particular — will be settled as engineering
decisions in `docs/architecture/SYSTEM_DESIGN.md` and recorded as ADRs. They are absent from
_this_ document because inventing a number the specification never gave would disguise a
project decision as a product requirement.

---

## 10. Open Questions and Ambiguities

The specification does not determine the following. Each is recorded, none is resolved
here. A question is closed by an approved ADR or by an approved design document, at which
point its status changes and the resolving document is named.

---

**OQ-01 — How is a Store Owner account created, and how does it become associated with a store?**

_Why it matters._ The specification gives the System Administrator the power to add stores,
Normal Users, and Admin Users — Store Owners are not in that list, yet the Store Owner role
exists and must somehow come to exist as data. It also never says how an owner is linked to
a store. This determines the store creation workflow, the account creation workflow, and
what the administrator is required to supply when registering a store.

_Decision status._ **Open.** Blocks `DATABASE_DESIGN.md` and the store management portion of
`API_SPECIFICATION.md`.

---

**OQ-02 — May a single Store Owner own more than one store?**

_Why it matters._ The specification refers to "their store" and "the average rating of their
store" in the singular, but never states a limit. The answer determines the cardinality of
the ownership relationship, whether that relationship is constrained at the database level,
and whether the Store Owner dashboard presents one store or a list.

_Decision status._ **Open.** Blocks `DATABASE_DESIGN.md` and the Store Owner dashboard
contract. Candidate for an ADR.

---

**OQ-03 — May a Store Owner or a System Administrator submit ratings?**

_Why it matters._ Rating submission is stated for the Normal User only. The specification
neither grants the capability to the other roles nor forbids it. The answer determines the
authorisation rule on rating submission, and — if owners may rate — whether an owner may
rate their own store.

_Decision status._ **Open.** Blocks the rating authorisation rules in `API_SPECIFICATION.md`.

---

**OQ-04 — Must a store have an owner at the moment it is created?**

_Why it matters._ If an owner is mandatory at creation, the owner account must exist first,
which constrains the order of administrator workflows. If it is optional, the system must
handle and display an ownerless store.

_Decision status._ **Open.** Depends on OQ-01. Blocks `DATABASE_DESIGN.md`.

---

**OQ-05 — Is pagination required for the listings, and if so with what page size and controls?**

_Why it matters._ The specification requires listings, filtering, and sorting, but never
mentions pagination. The answer affects the listing contracts, the frontend table
components, and how sorting and filtering are expected to interact with paged results.

_Decision status._ **Open.** Note that this is a candidate for a project decision under
NFR-001–003 rather than a product requirement; if adopted it should be recorded as such.

---

**OQ-06 — Must a submitted rating be a whole number?**

_Why it matters._ The specification says ratings range from 1 to 5 and that a user submits
"a rating between 1 and 5". It does not say whether 3.5 is a valid submission. The answer
determines the stored type, the validation rule behind VR-009, and the rating input control
in the UI.

_Decision status._ **Open.** Blocks VR-009's final form and `DATABASE_DESIGN.md`.

---

**OQ-07 — How is a store's "Overall Rating" calculated, and how is it presented?**

_Why it matters._ FR-USER-004 and FR-ADMIN-008 require an overall rating per store;
FR-OWNER-002 requires an average. Whether these are the same quantity, how many decimal
places are shown, how the value is rounded, and what is displayed for a store with no
ratings at all are all unstated. The answer affects the read contracts, the aggregation
strategy, and the empty state in the UI.

_Decision status._ **Open.** Blocks `API_SPECIFICATION.md`.

---

**OQ-08 — What must logging out actually do?**

_Why it matters._ Log out is required for all three roles, but the specification says
nothing about session or token invalidation. The answer determines whether the system needs
server-side session state or token revocation, which is an architectural consequence
disproportionate to the size of the requirement.

_Decision status._ **Open.** Blocks the authentication section of `SYSTEM_DESIGN.md`.

---

**OQ-09 — May the System Administrator update their own password?**

_Why it matters._ Password update is granted explicitly to the Normal User and the Store
Owner. The specification is silent for the System Administrator. The answer determines
whether password update is a capability of every authenticated account or a role-restricted
one.

_Decision status._ **Open.** Blocks the account management contract.

---

**OQ-10 — Does the administrator's user listing include Store Owners?**

_Why it matters._ The specification describes the listing as containing "Normal Users and
Admin Users", yet requires filtering by Role and describes viewing a Store Owner's details.
The answer determines whether the listing is filtered by role by default and how an
administrator reaches a Store Owner's detail view at all.

_Decision status._ **Open.** Blocks the admin listing contract.

---

**OQ-11 — What is the "Rating" shown for a Store Owner in the user details view?**

_Why it matters._ FR-ADMIN-012 requires a Store Owner's Rating to be displayed, without
defining it. It could mean the average rating of the store they own, or something else
entirely. If OQ-02 permits multiple stores, it is also unclear what a single value would
represent.

_Decision status._ **Open.** Depends on OQ-02 and OQ-07.

---

**OQ-12 — Which fields beyond Name and Email must be sortable?**

_Why it matters._ The specification says sorting should be supported for "key fields such
as Name, Email", which names examples rather than a complete set. Address, Role, and Rating
are all plausible. The answer determines the sortable field list on each listing contract.

_Decision status._ **Open.** Blocks the listing contracts in `API_SPECIFICATION.md`.

---

**OQ-13 — Do the Name and Address validation rules apply to stores, or only to users?**

_Why it matters._ VR-001 through VR-003 are stated without naming an entity, in a
specification where both users and stores have a name and an address. Applying a 20
character minimum to store names is a materially different product than not applying it.

_Decision status._ **Open.** Blocks the store creation contract and the validation section
of `SYSTEM_DESIGN.md`.

---

**OQ-14 — What constitutes a "special character" for the password rule?**

_Why it matters._ VR-007 requires at least one special character without defining the set.
The definition must be identical on the client and the server, or a password accepted by one
will be rejected by the other.

_Decision status._ **Open.** To be fixed as a technical decision, and stated once in a single
place that both layers reference.

---

## 11. Explicit Non-Requirements

**This section is intentionally empty at this revision.**

A non-requirement is a deliberate, ratified decision not to build something. The project has
not yet ratified any such decision — the scope boundary is the subject of
`docs/requirements/SCOPE.md`, which is written after this document is approved and which
will own this list.

Recording exclusions here before that approval would smuggle scope decisions into a document
whose purpose is to state what the specification requires. Note also that the specification's
silence on a capability is not the same as the specification prohibiting it: several
capabilities the project is likely to exclude are absent from the challenge rather than
forbidden by it, and `SCOPE.md` must say which of the two it is in each case.

---

## 12. Requirement Summary

### 12.1 Functional requirements

| ID            | Summary                                                    |
| :------------ | :--------------------------------------------------------- |
| FR-AUTH-001   | Single login system for all users                          |
| FR-AUTH-002   | Functionality determined by role                           |
| FR-AUTH-003   | Normal User self-registration                              |
| FR-AUTH-004   | Login for registered users of any role                     |
| FR-AUTH-005   | System Administrator logout                                |
| FR-AUTH-006   | Normal User logout                                         |
| FR-AUTH-007   | Store Owner logout                                         |
| FR-AUTH-008   | Normal User password update                                |
| FR-AUTH-009   | Store Owner password update                                |
| FR-ADMIN-001  | Add new stores                                             |
| FR-ADMIN-002  | Add new Normal Users                                       |
| FR-ADMIN-003  | Add new Admin Users                                        |
| FR-ADMIN-004  | User creation fields: Name, Email, Password, Address       |
| FR-ADMIN-005  | Dashboard — total users                                    |
| FR-ADMIN-006  | Dashboard — total stores                                   |
| FR-ADMIN-007  | Dashboard — total submitted ratings                        |
| FR-ADMIN-008  | Store listing — Name, Email, Address, Rating               |
| FR-ADMIN-009  | User listing — Name, Email, Address, Role                  |
| FR-ADMIN-010  | Filter listings by Name, Email, Address, Role              |
| FR-ADMIN-011  | User details — Name, Email, Address, Role                  |
| FR-ADMIN-012  | User details — Store Owner's Rating additionally displayed |
| FR-USER-001   | View all registered stores                                 |
| FR-USER-002   | Search stores by Name                                      |
| FR-USER-003   | Search stores by Address                                   |
| FR-USER-004   | Store listing fields shown to a Normal User                |
| FR-USER-005   | Option to submit a rating                                  |
| FR-USER-006   | Option to modify a submitted rating                        |
| FR-OWNER-001  | Dashboard — users who rated the store                      |
| FR-OWNER-002  | Dashboard — store average rating                           |
| FR-RATING-001 | Submit a rating between 1 and 5                            |
| FR-RATING-002 | Modify a submitted rating                                  |
| FR-RATING-003 | Overall rating derived per store                           |
| FR-RATING-004 | Average rating presented to the store's owner              |
| FR-LIST-001   | Ascending sorting on all tables                            |
| FR-LIST-002   | Descending sorting on all tables                           |
| FR-LIST-003   | Sorting on key fields including Name and Email             |

**Total: 36 functional requirements.**

### 12.2 Validation requirements

| ID     | Summary                                   |
| :----- | :---------------------------------------- |
| VR-001 | Name — minimum 20 characters              |
| VR-002 | Name — maximum 60 characters              |
| VR-003 | Address — maximum 400 characters          |
| VR-004 | Password — minimum 8 characters           |
| VR-005 | Password — maximum 16 characters          |
| VR-006 | Password — at least one uppercase letter  |
| VR-007 | Password — at least one special character |
| VR-008 | Email — standard email validation         |
| VR-009 | Rating — between 1 and 5                  |

**Total: 9 validation requirements.**

### 12.3 Non-functional expectations

| ID      | Summary                           |
| :------ | :-------------------------------- |
| NFR-001 | Frontend best practices           |
| NFR-002 | Backend best practices            |
| NFR-003 | Database schema best practices    |
| NFR-004 | Correct enforcement of validation |
| NFR-005 | Bidirectional sorting on tables   |
| NFR-006 | Maintainability                   |

**Total: 6 non-functional expectations.**

### 12.4 Open questions

| ID    | Summary                                        | Status |
| :---- | :--------------------------------------------- | :----- |
| OQ-01 | Store Owner creation and store association     | Open   |
| OQ-02 | Store Owner to store cardinality               | Open   |
| OQ-03 | May non-Normal-User roles submit ratings       | Open   |
| OQ-04 | Is an owner mandatory at store creation        | Open   |
| OQ-05 | Pagination requirements                        | Open   |
| OQ-06 | Whole-number ratings                           | Open   |
| OQ-07 | Overall rating calculation and presentation    | Open   |
| OQ-08 | Logout and session invalidation semantics      | Open   |
| OQ-09 | System Administrator password update           | Open   |
| OQ-10 | Store Owners in the administrator user listing | Open   |
| OQ-11 | Meaning of a Store Owner's "Rating"            | Open   |
| OQ-12 | Sortable fields beyond Name and Email          | Open   |
| OQ-13 | Scope of the Name and Address validation rules | Open   |
| OQ-14 | Definition of a special character              | Open   |

**Total: 14 open questions, all unresolved.**

---

## 13. Approval

| Step     | Status     |
| :------- | :--------- |
| Drafted  | 2026-09-01 |
| Reviewed | Pending    |
| Approved | Pending    |

No document downstream of this one — `SCOPE.md`, `DATABASE_DESIGN.md`,
`API_SPECIFICATION.md`, or any ADR — should be drafted until this document is approved.
