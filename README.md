# Todo FastAPI + React

A fullstack todo application with a FastAPI backend, MongoDB persistence, and a React + Vite frontend.

## What it does

- Add new tasks with a title
- Edit existing tasks
- Mark tasks completed or incomplete
- Delete tasks using soft-delete (`isDeleted: true`)
- Backend partial updates preserve fields like `description` and `priority`
- Frontend uses Tailwind CSS and React Query for a polished CRUD experience

## Repository structure

- `backend/app/main.py`: FastAPI application entry point
- `backend/app/routers/todo.py`: todo API routes
- `backend/app/services/todo.py`: business logic layer
- `backend/app/repo/todo.py`: MongoDB repository layer
- `backend/app/database/mongo.py`: MongoDB connection setup
- `backend/app/schemas/todo.py`: Pydantic request and response models
- `frontend/src/App.jsx`: application shell and layout
- `frontend/src/components/todo.component.jsx`: todo UI component
- `frontend/src/hooks/*.js`: CRUD hooks using React Query
- `frontend/src/api/api.js`: axios API client

## Backend setup

1. Open a terminal and go to the backend folder:

```bash
cd backend
```

2. Install Python dependencies:

```bash
pip install -r requirements.txt
```

3. Create your environment file:

```bash
copy .env.example .env
```

4. Set your MongoDB URI inside `backend/.env`:

```ini
DB_URI=mongodb+srv://...your-connection-string...
```

## Frontend setup

1. Open a terminal and go to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Add your API endpoint to a frontend environment file:

```ini
VITE_API_URL=http://127.0.0.1:8000/todos
```

4. Start the frontend:

```bash
npm run dev
```

## Running the app

Start the backend via:

```bash
cd backend
uvicorn app.main:app --reload
```

Then start the frontend via:

```bash
cd frontend
npm run dev
```

The frontend will connect to the backend at `VITE_API_URL` and the todo list will render in the browser.

## API endpoints

- `GET /todos/` - list active todos
- `POST /todos/` - create a todo
- `PATCH /todos/{todo_id}` - update one or more todo fields
- `DELETE /todos/{todo_id}` - soft-delete a todo

## Backend data expectations

- Create payload:
  - `title` (required)
  - `description` (optional)
  - `priority` (optional, default `medium`)
  - `due_date` (optional)

- Update payload uses partial updates and can include:
  - `title`, `description`, `completed`, `priority`, `due_date`

## Notes

- Tasks are soft-deleted, so deleted items are hidden from list results but not removed from the database.
- React Query invalidates the `todos` cache after update/delete operations so the UI stays in sync.
- The frontend uses Tailwind CSS for styling and `react-hot-toast` for notifications.
