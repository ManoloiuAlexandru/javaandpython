from fastapi import APIRouter, Depends

router = APIRouter()

@router.get("/")
def home():
    print(8/0)
    return {"result": "Welcome to Personal Library"}