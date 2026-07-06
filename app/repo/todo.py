class TodoRepository:
    def __init__(self,collection):
        self.collection = collection

    async def create_todo(self, todo_data):
        todo_data["created_at"] = datetime.utcnow()
        todo_data["updated_at"] = datetime.utcnow()
        todo_data["isDeleted"] = False

        result = await self.collection.insert_one(todo_data)
        return str(result.inserted_id)

    async def get_todo_by_id(self, todo_id):
        todo = await self.collection.find_one({"_id": todo_id})
        return todo

    async def update_todo(self, todo_id, update_data):
        result = await self.collection.update_one({"_id": todo_id}, {"$set": update_data})
        return result.modified_count
    
    async def delete_todo(self, todo_id):
        result = await self.collection.update_one({"_id": todo_id}, {"$set": {"isDeleted": True}})
        return result.modified_count

