from datetime import datetime

from bson import ObjectId

class TodoRepository:
    def __init__(self,collection):
        self.collection = collection

    async def list_todos(self):
      todos = await self.collection.find({"isDeleted": False}).to_list(length=None)
      for todo in todos:
        todo["_id"] = str(todo["_id"])
      return todos
    
    async def create_todo(self, todo_data):
        todo_data["created_at"] = datetime.utcnow()
        todo_data["updated_at"] = datetime.utcnow()
        todo_data["isDeleted"] = False
        todo_data["completed"] = False

        result = await self.collection.insert_one(todo_data)
        todo_data["_id"] = str(result.inserted_id)
        return todo_data

    async def get_todo_by_id(self, todo_id):
        todo = await self.collection.find_one({"_id": todo_id})
        return todo
    async def update_todo(self, todo_id, update_data):
     update_data["updated_at"] = datetime.utcnow()
    
     result = await self.collection.find_one_and_update(
        {"_id": ObjectId(todo_id)},          # 1. convert str -> ObjectId for the query
        {"$set": update_data},
        return_document=True                  # 2. return the updated doc, not update metadata
    )
    
     if result:
        result["_id"] = str(result["_id"])   # 3. convert ObjectId -> str for the response
     return result

    async def delete_todo(self, todo_id):
        result = await self.collection.update_one({"_id": todo_id}, {"$set": {"isDeleted": True}})
        return result.modified_count

