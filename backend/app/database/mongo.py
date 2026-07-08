from pymongo import AsyncMongoClient
from app.config.config import MONGO_URI

client = None
db = None

async def connect_to_mongo():
    global client, db

    client = AsyncMongoClient(MONGO_URI)
    db = client.get_default_database()

    print("Connected to MongoDB")

async def close_mongo_connection():
    global client

    if client:
        await client.close()
        print("MongoDB connection closed")

def get_db():
    return db