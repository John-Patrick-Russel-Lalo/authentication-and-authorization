# API Route Usage Guide

This guide explains how to use the authentication and authorization API routes.

Base URL:

```txt id="r1"
https://has-auth.onrender.com/api
```

---

# Authentication Flow

```txt id="r2"
1. Register account
2. Login account
3. Receive JWT token
4. Use token for protected routes
5. Admin can assign roles
```

---

# 1. Register User

Creates a new user account.

## Route

```http id="r3"
POST /auth/register
```

Full URL:

```txt id="r4"
https://has-auth.onrender.com/api/auth/register
```

---

## Request Body

```json id="r5"
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@gmail.com",
  "password": "123456"
}
```

---

## Important Notes

* Newly registered users automatically receive:

```txt id="r6"
patient
```

role by default.

* Users cannot assign their own role during registration.

---

## Success Response

```json id="r7"
{
  "message": "User created"
}
```

---

# 2. Login User

Authenticates the user and returns a JWT token.

## Route

```http id="r8"
POST /auth/login
```

Full URL:

```txt id="r9"
https://has-auth.onrender.com/api/auth/login
```

---

## Request Body

```json id="r10"
{
  "email": "john@gmail.com",
  "password": "123456"
}
```

---

## Success Response

```json id="r11"
{
  "message": "Login successful",
  "token": "YOUR_JWT_TOKEN"
}
```

---

# 3. Using Protected Routes

Protected routes require a JWT token.

After login, copy the token and include it in the request headers.

---

## Authorization Header Format

```http id="r12"
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# 4. Assign Role (Admin Only)

Allows an admin to change another user's role.

---

## Route

```http id="r13"
PATCH /users/:userId/role
```

Full URL Example:

```txt id="r14"
https://has-auth.onrender.com/api/users/f3891476-98aa-467c-ac74-5109b9e4cb45/role
```

---

## Required Headers

```http id="r15"
Authorization: Bearer ADMIN_TOKEN
```

---

## Request Body

```json id="r16"
{
  "role": "doctor"
}
```

---

## Allowed Roles

```txt id="r17"
patient
doctor
staff
admin
```

---

# Important Notes About Role Assignment

* Only users with:

```txt id="r18"
admin
```

role can assign roles.

* Non-admin users will receive:

```json id="r19"
{
  "message": "Access denied"
}
```

---

# Example Role Assignment Flow

```txt id="r20"
1. User registers
2. User becomes patient
3. Admin logs in
4. Admin sends PATCH request
5. User role changes to doctor/staff/admin
```

---

# Example Using Thunder Client / Postman

## Step 1 — Login as Admin

```http id="r21"
POST https://has-auth.onrender.com/api/auth/login
```

Copy the returned token.

---

## Step 2 — Set Authorization Header

```http id="r22"
Authorization: Bearer YOUR_ADMIN_TOKEN
```

---

## Step 3 — Send Role Update Request

```http id="r23"
PATCH https://has-auth.onrender.com/api/users/USER_ID/role
```

Body:

```json id="r24"
{
  "role": "staff"
}
```

---

# Common Errors

## Invalid Token

```json id="r25"
{
  "message": "Invalid or expired token"
}
```

Cause:

* missing token
* expired token
* incorrect JWT_SECRET

---

## Access Denied

```json id="r26"
{
  "message": "Access denied"
}
```

Cause:

* user is not admin

---

## Invalid Role

```json id="r27"
{
  "message": "Invalid role"
}
```

Cause:

* role is not:

```txt id="r28"
patient
doctor
staff
admin
```

---

## User Not Found

```json id="r29"
{
  "message": "User not found"
}
```

Cause:

* invalid user ID

---

# Current Role System

| Role    | Permissions                   |
| ------- | ----------------------------- |
| patient | Basic user access             |
| doctor  | Doctor access                 |
| staff   | Staff access                  |
| admin   | Full system + role assignment |
