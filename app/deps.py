# app/deps.py
from fastapi import Depends
from app.database.mongo import get_db        # returns the `db` from your mongo module
from app.repo.todo import TodoRepository
from app.services.todo import TodoService

def get_todo_collection(db = Depends(get_db)):
    return db.todos

def get_todo_repo(collection = Depends(get_todo_collection)):
    return TodoRepository(collection)

def get_todo_service(repo = Depends(get_todo_repo)):
    return TodoService(repo)