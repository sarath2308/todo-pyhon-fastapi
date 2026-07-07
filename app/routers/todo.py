from fastapi import APIRouter, Depends, status
from app.schemas.todo import TodoCreate, TodoUpdate, TodoResponse
from app.deps import get_todo_service
from app.services.todo import TodoService

router = APIRouter()


@router.get("/", response_model=list[TodoResponse])
async def read_todos(todo_service: TodoService = Depends(get_todo_service)):
    return await todo_service.list_todos()


@router.post("/", response_model=TodoResponse, status_code=status.HTTP_201_CREATED)
async def create_todo(todo: TodoCreate, todo_service: TodoService = Depends(get_todo_service)):
    return await todo_service.create_todo(todo.model_dump())


@router.patch("/{todo_id}", response_model=TodoResponse)
async def update_todo(
    todo_id: str, todo: TodoUpdate, todo_service: TodoService = Depends(get_todo_service)
):
    return await todo_service.update_todo(todo_id, todo.model_dump(exclude_unset=True))


@router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_todo(todo_id: str, todo_service: TodoService = Depends(get_todo_service)):
    await todo_service.delete_todo(todo_id)