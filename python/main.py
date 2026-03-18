from fastapi import FastAPI
from utils.classes import User

app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "Java and Python application"}


@app.post("/add_user")
def add_user(user: User):
    print(user.name)
    print(user.password)
    return {"result": "cartoful magic este aici"}
