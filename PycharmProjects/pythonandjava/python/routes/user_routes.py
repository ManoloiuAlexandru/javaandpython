from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas.user import User
from services.user_service import add_user_service
from db.session import get_db
from db.models import UserDB

router = APIRouter()


@router.post("/add_user")
def add_user(user: User, db: Session = Depends(get_db)):
    add_user_service(user, db)
    return {"result": "done"}


@router.get("/users")
def read_users(db: Session = Depends(get_db)):
    return db.query(UserDB).all()
