from fastapi import FastAPI,Depends
from utils.classes import User
from sqlalchemy.orm import Session
from utils.db import init_db,get_db,UserDB
init_db()
app = FastAPI()


@app.get("/")
def home():
    return {"message": "Welcome to Personal Library"}


@app.post("/add_user")
def add_user(user: User,db: Session = Depends(get_db)):
    user_db = UserDB(name=user.name,password=user.password)
    db.add(user_db)
    db.commit()
    db.refresh(user_db)
    return {"result": "done"}

@app.get("/users")
def read_users(db: Session = Depends(get_db)):
    users = db.query(UserDB).all()
    return users

