from fastapi import FastAPI
from backend.app.db.session import engine, Base
from backend.app.db import models

app = FastAPI()

# Create tables automatically
Base.metadata.create_all(bind=engine)

# Routers
from backend.app.api import auth
app.include_router(auth.router, prefix="/auth")
