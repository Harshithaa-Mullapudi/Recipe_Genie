from fastapi import FastAPI

from backend.app.db.session import engine, Base
from backend.app.db import models

from fastapi.middleware.cors import CORSMiddleware
from backend.app.api import ai


app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

# Routers
from backend.app.api import auth, recipes

app.include_router(auth.router, prefix="/auth")
app.include_router(recipes.router, prefix="/recipes")
app.include_router(ai.router, prefix="/ai")
