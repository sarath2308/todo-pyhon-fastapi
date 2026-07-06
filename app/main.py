from fastapi import FastAPI
from app.routers.todo import router as todo_router
from app.database.mongo import connect_to_mongo, close_mongo_connection
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()

    yield

    await close_mongo_connection()

app = FastAPI(lifespan=lifespan)

app.include_router(todo_router, prefix="/todos")