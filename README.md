# Todo FastAPI

A simple FastAPI application for managing todos with MongoDB.

## Features

- Create, list, update, and delete todos
- MongoDB-backed persistence
- Pydantic models for request and response validation
- Dependency injection for repository and service layers

## Project structure

- app/main.py: application entry point and lifespan events
- app/routers/todo.py: API routes for todo operations
- app/services/todo.py: business logic for todos
- app/repo/todo.py: MongoDB repository layer
- app/database/mongo.py: MongoDB connection setup
- app/schemas/todo.py: request and response schemas

## Requirements

Install dependencies with:

```bash
pip install -r requirements.txt
```

## Environment setup

Create a local environment file based on the example:

```bash
copy .env.example .env
```

Then update the DB_URI value to point to your MongoDB instance.

## Run the app

Start the development server with:

```bash
uvicorn app.main:app --reload
```

The API will be available at:

- http://127.0.0.1:8000/todos/

## API endpoints

- GET /todos/ - list todos
- POST /todos/ - create a todo
- PATCH /todos/{todo_id} - update a todo
- DELETE /todos/{todo_id} - delete a todo

## Notes

- The app uses the MongoDB database specified in DB_URI.
- Todo records are soft-deleted via the isDeleted flag.
- The repository converts MongoDB ObjectId values to strings in responses.
