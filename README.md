# Factory Management API

A Node.js project for managing a factory, including employees, departments, shifts, and user permissions.

## Project Description

This system provides an API for managing employees, departments, shifts, and user permissions in a factory environment. It features an Express-based API, MongoDB database connection, JWT-based user authentication, and user action tracking.

## Main Features
- Employee management (CRUD)
- Department management (CRUD)
- Shift management (CRUD)
- User and permissions management
- JWT-based user authentication
- Daily action limit per user
- Load external users from JSONPlaceholder

## Project Structure
```
Factory/
  |-- index.js
  |-- LoadJsonplaceholderUsers.js
  |-- package.json
  |-- .env
  |-- config/
  |-- Controller/
  |-- Data/
  |-- Middlewares/
  |-- Models/
  |-- Repositories/
  |-- Services/
  |-- utils/
  |-- Validate/
```

## Installation & Running
1. Install dependencies:
   ```
   npm install
   ```
2. Set up a `.env` file with the following environment variables:
   - `MONGO_URI`: MongoDB connection string
   - `SECRET_JWT`: Secret key for JWT
3. Start the server:
   ```
   node index.js
   ```

## API Usage
- All protected routes require a JWT in the header.
- Main routes:
  - `/api/users` - User management
  - `/api/usersWs` - External user login
  - `/api/departments` - Department management
  - `/api/employees` - Employee management
  - `/api/shifts` - Shift management

## Main Dependencies
- express
- mongoose
- dotenv
- cors
- jsonwebtoken
- joi
- axios

## Author
- esti koren

---

*For further questions, please contact the project maintainer.*
