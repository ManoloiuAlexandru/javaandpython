from fastapi import FastAPI
from db.base import Base, engine
from routes.user_routes import router as user_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(user_router)