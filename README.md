# Simple Todo List Web Application

A simple web-based Todo List application, designed to showcase fullstack development skills using Node.js (Express) backend, Vue 3 frontend (TypeScript), and Domain Driven Design architecture, complete with live API documentation using Swagger 

The application allows users to create, read, update, and delete (CRUD) todo items.

## Goals
1. Build a clean and modular fullstack web application  
2. Showcase separation of concerns: frontend ↔ backend communication  
3. Apply Domain-Driven Design (DDD) pattern for backend architecture
4. Provide API documentation using Swagger UI
5. Make frontend cleanly typed with TypeScript and fetch for API calls 

## Features
1. View Todos - User can view all existing todo items
2. Add Todo - User can add a new todo item with a text input 
3. Toggle Todo - Done/Undone	User can mark a todo as done or undone
4. Delete Todo - User can delete a specific todo item
5. API Documentation - Developer can view API contract via Swagger UI

## User Stories
1. **US01** : As a user, I want to view all my todos, so that I can track my tasks
2. **US02** : As a user, I want to add a new todo, so that I can add new task to do
3. **US03** : As a user, I want to toggle a todo status, so that I can mark tasks as complete or incomplete
4. **US04** : As a user, I want to delete a todo, so that I can remove tasks that are no longer needed

## Requirements
### Frontend Requirements
1. Built with Vue 3 (Composition API)
2. Written in Typescript
3. Use fetch API for backend communication (no axios)
4. Display list of all todos
5. Form to add new todo
6. Button to toggle todo status (done/undone)
7. Button to delete todo

### Backend Requirements
1. Built with Node.js & Express.js
2. Codebase follow Domain Driven Design Architecture
3. Data is stored in memory (simple array) - no database needed
4. API documented with swagger

## Installation and Setup
### Development Environment
#### Prerequisites
- Node.js (v20 or higher)
- pnpm (v10 or higher)

#### Initial Setup
1. Clone the repository
   ```bash
   git clone https://github.com/ahmaruff/todolist-express-vue
   cd todolist-express-vue
   ```

2. Install all dependencies at once from the root directory
   ```bash
   # Install both backend and frontend dependencies
   pnpm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   PORT=3000
   NODE_ENV=development
   SERVE_FRONTEND=false
   CORS_ALLOWED_ORIGINS=http://localhost:5173
   ```

#### Running in Development Mode
All the following commands should be run from the root directory of the project:

1. Start the backend server in development mode
   ```bash
   pnpm run dev:backend
   ```
   The API will be available at http://localhost:3000/api

2. In a new terminal, start the frontend development server
   ```bash
   pnpm run dev:frontend
   ```
   The frontend will be available at http://localhost:5173

### Production Environment

#### Build and Run for Production
All commands should be run from the root directory of the project:

1. Build the frontend
   ```bash
   pnpm run build:frontend
   ```
   This will create a `dist` folder in the frontend directory.

2. Configure the backend for production
   Create or update the `.env` file in the backend directory with:
   ```
   PORT=3000
   NODE_ENV=production
   SERVE_FRONTEND=true
   ```

3. Start the production server
   ```bash
   pnpm run start:full
   ```

The application will be available at http://localhost:3000 with both the API and frontend served from the same server.

## API Specification
| Method | Endpoint         | Description                | Request Body / Query Parameters                             | Response                           |
|--------|------------------|-----------------------------|-------------------------------------------------------------|------------------------------------|
| GET    | `/api`            | Home route            | -                                                           | `{ app_name, description }`        |
| GET    | `/api/todos`      | Get all todos (with filters) | **Query Parameters** (optional): <br> - `start_date` (ISO date string) <br> - `end_date` (ISO date string) <br> - `completed` (`true` or `false`) <br> - `search` (string) | `{status, code, message, data: [{ id, description, completedAt, createdAt }]}` |
| POST   | `/api/todos`      | Create a new todo           | `{ description }`                                           | `{status, code, message, data: {todo} }` |
| GET    | `/api/todos/{id}` | Get single todo by ID        | -                                                           | `{status, code, message, data: {todo} }` |
| PATCH  | `/api/todos/{id}` | Mark a todo as completed    | -                                                           | `{status, code, message, data: {todo} }` |
| DELETE | `/api/todos/{id}` | Delete a todo               | -                                                           | `{status, code, message, data: null }` |
| GET    | `/api/docs`       | API documentation (Swagger) | -                                                           | Swagger UI page                    |

## Acceptance Criteria
1. **AC01** : When user open the app, all current todos are fetched and displayed
2. **AC02** : When user adds a todo, it appear immediately in the list without refreshing
3. **AC03** : When user toggles a todo, its status changes and updates visually
4. **AC04** : When user deletes a todo, it is immediately removed from the list
5. **AC05** : API documentation is accessible at `/api-docs` and lists all endpoints with example requests and responses

## Non Functional Requirements
1. Code quality: clean, modular, DDD-compliant
2. Performance: Fast API responses (under 100ms simulated)
3. Documentation: Swagger docs generated from code comments
4. UX: Minimal, clean, responsive UI (no heavy styling needed)
5. Scalability: Backend architecture should allow easy replacement of memory storage with database later

## Tech Stack
1. Vue 3 + Typescript
2. Vite
3. Node.js + Express.js (Javascript)
4. Swagger

## Notes:
1. Since the data is stored in-memory, all data will be lost if the server is restarted (this is expected).
2. In a real project, the repository can be easily switched to PostgreSQL/MongoDB by only modifying the Infrastructure Layer, while the Domain Layer remains clean and unaffected
3. When deploying to production with `SERVE_FRONTEND=true`, make sure the frontend is built and the `dist` folder exists in the correct location.
4. For SPA routing to work correctly, the backend uses a regex pattern to serve the frontend for all non-API routes.

## Troubleshooting
- If you encounter 404 errors when accessing frontend routes, make sure your server is configured to handle SPA routing correctly using the regex pattern approach.
- If API requests fail with CORS errors during development, check that your `CORS_ALLOWED_ORIGINS` environment variable includes your frontend development server URL.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Copyright

© [Ahmad Ma'ruf](mailto:ahmadmaruf2701@gmail.com) - 2025
