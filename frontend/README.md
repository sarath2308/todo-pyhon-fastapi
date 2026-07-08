# Todo Frontend

A React + Vite frontend for the todo app.

## Features

- Add tasks via a single input field
- List tasks with inline edit and delete controls
- Mark tasks as completed with one click
- Uses Tailwind CSS for a responsive UI
- Uses React Query for data fetching and cache invalidation

## Structure

- `src/App.jsx`: main app wrapper and page layout
- `src/components/todo.component.jsx`: todo input, list, edit, delete, and complete UI
- `src/hooks/todo.get.js`: fetch todos
- `src/hooks/todo.create.js`: create todos
- `src/hooks/todo.update.js`: update todos
- `src/hooks/todo.delete.js`: remove todos
- `src/api/api.js`: axios HTTP client configured with `VITE_API_URL`

## Run locally

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Create or update `.env`:

```ini
VITE_API_URL=http://127.0.0.1:8000/todos
```

3. Start the app:

```bash
npm run dev
```

4. Open the URL shown by Vite in your browser.

## Notes

- Backend `DELETE /todos/{todo_id}` is a soft delete and uses `isDeleted` to hide tasks.
- React Query refetches the task list after edits and deletions.
- The frontend only submits the task title on create; the backend accepts optional `description`, `priority`, and `due_date` as well.
