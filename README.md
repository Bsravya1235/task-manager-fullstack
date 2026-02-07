## Task Manager – Full Stack Application

This is a simple full-stack Task Manager web application.
## What this project does

- Users can register and log in
- Authenticated users can create tasks
- Tasks can be viewed, marked as completed, updated, and deleted
- Each user can see only their own tasks
- Backend APIs are protected using JWT authentication

## Tech Stack Used

### Frontend
- React (Vite)
- JavaScript
- CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Tools
- Git & GitHub
- Postman
- VS Code

## Authentication Flow

1. User registers or logs in
2. Backend generates a JWT token
3. Token is stored in browser localStorage
4. Token is sent in request headers for protected APIs
5. Backend middleware verifies the token before allowing access

## API Endpoints

### Auth
- POST /api/auth/register – Register user
- POST /api/auth/login – Login user

### Tasks 
- GET /api/tasks – Get all tasks
- POST /api/tasks – Create task
- PUT /api/tasks/:id – Update task
- DELETE /api/tasks/:id – Delete task

## Database Schema

### User
- _id
- name: String
- email: String
- password: String (hashed)

### Task
- _id
- title: String
- completed: Boolean
- userId: ObjectId
