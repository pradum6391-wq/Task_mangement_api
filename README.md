
# Task Management API

A RESTful Task Management API built using Node.js, Express.js, MongoDB, and Mongoose. It provides secure user authentication and complete task management functionality.

## Features

- User Registration and Login
- JWT Authentication
- Password Hashing using bcryptjs
- Protected API Routes
- Create, Read, Update and Delete Tasks
- Search Tasks by Title
- Filter Tasks by Status and Priority
- MongoDB Atlas Database Integration
- Input Validation and Error Handling
- Task Ownership (users can access their own tasks)

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- cors
- morgan
- express-validator

## Project Structure

```text
task-management-api/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── taskController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   └── routes/
│       ├── taskRoutes.js
│       └── userRoutes.js
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/pradum6391-wq/Task_mangement_api.git
```

2. Navigate into the project:

```bash
cd task-management-api
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory and configure:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

5. Start the development server:

```bash
npm run dev
```

Server runs at:

`http://localhost:5000`

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/users/register | Register user |
| POST | /api/users/login | Login user |
| GET | /api/users/profile | Get user profile |

### Task Management

All task endpoints require a valid JWT token.

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/tasks | Create task |
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/:id | Get single task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |

### Search and Filter

Search tasks:

`GET /api/tasks?search=Submission`

Filter tasks:

`GET /api/tasks?status=pending&priority=high`

### Authentication Header

For protected routes, include:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

## Task Fields

- title
- description
- status: pending, in-progress, completed
- priority: low, medium, high
- dueDate
- user

## Testing

The following operations were tested successfully using PowerShell:

- User Registration
- User Login
- Task Creation
- Get All Tasks
- Task Update
- Task Deletion
- Task Search
- Task Filtering

## Author

**Pradum Maurya**

GitHub: https://github.com/pradum6391-wq

LinkedIn: https://linkedin.com/in/pradum-maurya-902a0b379

## License

This project is licensed under the ISC License.
```