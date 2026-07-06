# app/services/todo_service.py
from app.repo.todo import TodoRepository
from typing import List

class TodoService:
    def __init__(self, repo: TodoRepository):
        self.repo = repo

    async def list_todos(self, limit: int = 100) -> List[dict]:
        return await self.repo.list(limit)

    async def create_todo(self, payload: dict) -> dict:
        return await self.repo.create(payload)

    async def get_todo(self, obj_id: str) -> dict:
        return await self.repo.get(obj_id)

    async def update_todo(self, obj_id: str, patch: dict) -> dict:
        return await self.repo.update(obj_id, patch)

    async def delete_todo(self, obj_id: str) -> bool:
        return await self.repo.delete(obj_id)