from fastapi import APIRouter
from app.schemas.todo import TodoCreate, TodoUpdate
from app.services.todo import TodoService
from app.repo.todo import TodoRepository

router = APIRouter()

#service

todoRepository = TodoRepository(collection=)
todoService = TodoService(repo=todoRepository)
@router.get("/")

async def read_todos():
    return {"message": "List of todos"}


@router.post("/")    
async def create_todo(todo: TodoCreate):
    return {"message": "Todo created"}


@router.patch("/{todo_id}")
async def update_todo(todo_id: int, todo: TodoUpdate):
    return {"message": f"Todo {todo_id} updated"}

@router.delete("/{todo_id}")
async def delete_todo(todo_id: int):
    return {"message": f"Todo {todo_id} deleted"}    
    
