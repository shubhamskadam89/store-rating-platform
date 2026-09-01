# Requirements Documentation

This directory serves as the single source of truth for the functional and non-functional specifications of the **Store Rating Platform**.

---

## Contents

| Document                                               | Status            | Purpose                                                                                                                |
| :----------------------------------------------------- | :---------------- | :--------------------------------------------------------------------------------------------------------------------- |
| [`PRODUCT_REQUIREMENTS.md`](./PRODUCT_REQUIREMENTS.md) | Approved (v1.0.0) | What the system must do, traced to the coding challenge specification. Records ambiguities rather than resolving them. |
| `SCOPE.md`                                             | Not started       | What the project will and will not build, and which exclusions are decisions rather than specification silence.        |
| `REQUIREMENT_TRACEABILITY.md`                          | Not started       | Requirement ID → implementation → test.                                                                                |

---

> [!NOTE]
> `SCOPE.md` is drafted only after `PRODUCT_REQUIREMENTS.md` is approved, and
> `REQUIREMENT_TRACEABILITY.md` only once implementation begins. Non-functional targets
> (response times, browser support, availability) are deliberately absent from the product
> requirements: the specification states none, so any the project adopts are engineering
> decisions and belong in `docs/architecture/` and the ADRs.
