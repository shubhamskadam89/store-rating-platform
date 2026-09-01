# API Documentation

This directory contains the REST API specifications, conventions, request/response contracts, and error structures for the **Store Rating Platform**.

---

## Planned Contents

When finalized during the design phase, this directory will document:

1. **API Conventions**:
   - Base URL conventions (`/api/v1` or `/api`)
   - HTTP method semantics (GET, POST, PUT, PATCH, DELETE)
   - Status code conventions (200, 201, 204, 400, 401, 403, 404, 409, 422, 500)
2. **Authentication & Authorization Contracts**:
   - Header formatting (`Authorization: Bearer <token>`)
   - Role-Based Access Control (RBAC) rules per endpoint.
3. **Endpoint Specifications**:
   - Request DTO schemas and validation rules.
   - Response DTO schemas and standard pagination/sorting structures.
4. **Standard Error Contract**:
   - Uniform error envelope format (e.g., `statusCode`, `message`, `error`, `timestamp`, `path`).

---

> [!NOTE]
> Specific endpoint contracts will be authored and approved prior to backend controller and DTO implementation.
