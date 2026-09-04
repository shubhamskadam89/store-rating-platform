# API Documentation

This directory contains the REST API specifications, conventions, request/response contracts, and error structures for the **Store Rating Platform**.

---

## API Conventions

1. **Base URL**: `/api`
2. **Authentication**: Most routes (except `/auth/login` and `/auth/register`) require a valid JWT token passed in the `Authorization: Bearer <token>` header.
3. **Responses**: The platform uses standardized response wrappers:
   - Success: Returns the expected JSON object directly, or an array of objects.
   - Errors: Return a standardized error object:
     ```json
     {
       "statusCode": 400,
       "message": "Validation failed",
       "error": "Bad Request"
     }
     ```

## Endpoints

### 1. Authentication
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new normal user | No |
| `POST` | `/api/auth/login` | Authenticate and receive JWT | No |
| `GET` | `/api/auth/me` | Get the currently authenticated user's profile | Yes |
| `PUT` | `/api/auth/password` | Update password for the authenticated user | Yes |

### 2. Users (Admin Only)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users/stats` | Get platform statistics (users, stores, ratings) | Yes (Admin) |
| `GET` | `/api/users` | List all users | Yes (Admin) |
| `GET` | `/api/users/:id` | Get details of a specific user | Yes (Admin) |
| `POST` | `/api/users` | Create a user with any role | Yes (Admin) |

### 3. Stores
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/stores` | List public stores with their ratings | Yes |
| `GET` | `/api/stores/admin` | List all stores including unassigned ones (Admin) | Yes (Admin) |
| `POST` | `/api/stores` | Create a new store (Admin) | Yes (Admin) |

### 4. Owner Dashboard
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/owner/dashboard` | Get the store and rating details for the logged-in owner | Yes (Owner) |

### 5. Ratings
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/stores/:storeId/ratings` | List ratings for a specific store | Yes |
| `POST` | `/api/stores/:storeId/ratings` | Submit a new rating for a store (Normal User) | Yes (Normal) |
| `PUT` | `/api/stores/:storeId/ratings` | Modify an existing rating (Normal User) | Yes (Normal) |

### 6. System
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Health check endpoint to verify backend status | No |
