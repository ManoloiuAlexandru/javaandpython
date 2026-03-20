from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas.user import User
from controllers.user_controllers import add_user_controller
from db.session import get_db
from db.models import UserDB

router = APIRouter()


@router.post("/add_user")
def add_user(user: User, db: Session = Depends(get_db)):
    add_user_controller(user, db)
    return {"result": "done"}


@router.get("/users")
def read_users(db: Session = Depends(get_db)):
    return db.query(UserDB).all()
