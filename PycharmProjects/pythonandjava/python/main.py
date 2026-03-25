from fastapi import FastAPI, Request
from db.base import Base, engine
from routes import user_routes, home_routes

from fastapi.responses import RedirectResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(user_routes.router)
app.include_router(home_routes.router)


@app.exception_handler(StarletteHTTPException)
async def handle_http_exceptions(request: Request, exc: StarletteHTTPException):
    if exc.status_code == 404:
        return RedirectResponse("/")

    if exc.status_code == 500:
        return RedirectResponse("/")

    return RedirectResponse("/")

@app.exception_handler(Exception)
async def handle_exceptions(request: Request, exc: Exception):
    print(exc)
    return RedirectResponse("/")