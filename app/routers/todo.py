from fastapi import APIRouter

router = APIRouter()

@router.get("/")

async def read_todos():
    return {"message": "List of todos"}


@router.post("/")    
async def create_todo():
    return {"message": "Todo created"}


@router.patch("/{todo_id}")
async def update_todo(todo_id: int):
    return {"message": f"Todo {todo_id} updated"}

@router.delete("/{todo_id}")
async def delete_todo(todo_id: int):
    return {"message": f"Todo {todo_id} deleted"}    
    