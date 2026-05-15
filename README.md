
# API Route Usage Guide

This guide explains how to use the HAS Authentication and Authorization API.

Base URL:

```txt
https://has-auth.onrender.com/api
````

---

# Authentication Flow

```txt
1. Register account
2. Login account
3. Receive authentication cookie
4. Use protected routes
5. Admin assigns user roles
```

---

# Free Testing Account

Use this account for testing admin features.

```txt
Admin Test Account

Email: admin@gmail.com
Password: Admin123@
Role: admin
```

---

# Authentication System

This API uses:

* JWT Authentication
* HTTP Only Cookies
* Role-Based Access Control (RBAC)

After successful login, the server automatically stores the authentication token inside a secure HTTP-only cookie.

Protected routes automatically read the cookie for authentication.

---

# 1. Register User

Creates a new user account.

## Route

```http
POST /auth/register
```

Full URL:

```txt
https://has-auth.onrender.com/api/auth/register
```

---

## Request Body

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@gmail.com",
  "password": "123456"
}
```

---

## Important Notes

* Newly registered users automatically receive the `patient` role.
* Users cannot assign their own roles during registration.
* Role assignment is managed only by administrators.

---

## Success Response

```json
{
  "message": "User created"
}
```

---

# 2. Login User

Authenticates the user and creates an authentication cookie.

## Route

```http
POST /auth/login
```

Full URL:

```txt
https://has-auth.onrender.com/api/auth/login
```

---

## Request Body

```json
{
  "email": "john@gmail.com",
  "password": "123456"
}
```

---

## Success Response

```json
{
  "message": "Login successful"
}
```

---

# Cookie Authentication

After login:

* The server automatically creates a secure HTTP-only cookie.
* The browser automatically sends the cookie on protected requests.
* No manual JWT handling is required.

Example Cookie:

```txt
token=JWT_TOKEN_HERE
```

---

# 3. Protected Routes

Protected routes require authentication.

The system automatically verifies the authentication cookie before allowing access.

---

# 4. Assign Role (Admin Only)

Allows administrators to assign roles to users.

---

## Route

```http
PATCH /users/:userId/role
```

Full URL Example:

```txt
https://has-auth.onrender.com/api/users/f3891476-98aa-467c-ac74-5109b9e4cb45/role
```

---

## Request Body

```json
{
  "role": "doctor"
}
```

---

## Allowed Roles

```txt
patient
doctor
staff
admin
```

---

# Important Notes About Role Assignment

* Only users with the `admin` role can assign roles.
* Non-admin users cannot modify roles.
* Invalid roles are automatically rejected by the system.

---

# Example Role Assignment Flow

```txt
1. User registers
2. User becomes patient by default
3. Admin logs in
4. Admin sends PATCH request
5. User role changes to doctor/staff/admin
```

---

# Example Using Thunder Client / Postman

## Step 1 — Login as Admin

```http
POST https://has-auth.onrender.com/api/auth/login
```

Body:

```json
{
  "email": "admin@gmail.com",
  "password": "Admin123@"
}
```

---

## Step 2 — Copy Authentication Cookie

After login:

* Open Cookies tab in Thunder Client/Postman
* Copy the generated `token` cookie
* Protected routes will automatically use it

---

## Step 3 — Send Role Update Request

```http
PATCH https://has-auth.onrender.com/api/users/USER_ID/role
```

Body:

```json
{
  "role": "staff"
}
```

---

# Common Errors

## Invalid or Expired Token

```json
{
  "message": "Invalid or expired token"
}
```

Possible Causes:

* missing cookie
* expired token
* invalid JWT secret

---

## Access Denied

```json
{
  "message": "Access denied"
}
```

Possible Cause:

* authenticated user is not an admin

---

## Invalid Role

```json
{
  "message": "Invalid role"
}
```

Allowed Roles:

```txt
patient
doctor
staff
admin
```

---

## User Not Found

```json
{
  "message": "User not found"
}
```

Possible Cause:

* invalid user ID

---

# Current Role System

| Role    | Permissions                            |
| ------- | -------------------------------------- |
| patient | Basic patient access                   |
| doctor  | Doctor-level access                    |
| staff   | Staff management access                |
| admin   | Full system access and role assignment |

---

# Technology Stack

* Node.js
* Express.js
* PostgreSQL
* Supabase
* JWT Authentication
* HTTP-only Cookies
* Role-Based Access Control (RBAC)
* Render Deployment

```
```
