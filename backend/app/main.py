from fastapi import FastAPI
<<<<<<< HEAD

from backend.app.db.session import engine, Base
from backend.app.db import models

from fastapi.middleware.cors import CORSMiddleware
from backend.app.api import ai


app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
=======
from fastapi.middleware.cors import CORSMiddleware

from backend.app.db.session import engine, Base
from backend.app.db import models
from backend.app.api import ai, auth, recipes

# --------------------------------------------------------
#       🔥 CLEAN SWAGGER UI (REMOVE OAUTH2 POPUP)
# --------------------------------------------------------
from fastapi.openapi.utils import get_openapi

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema

    openapi_schema = get_openapi(
        title="Recipe Genie API",
        version="1.0",
        description="Backend API for Recipe Genie",
        routes=app.routes,
    )

    # Add simple Bearer Token authentication
    openapi_schema["components"]["securitySchemes"] = {
        "bearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        }
    }

    # Apply Bearer Token globally
    for path in openapi_schema["paths"]:
        for method in openapi_schema["paths"][path]:
            openapi_schema["paths"][path][method]["security"] = [{"bearerAuth": []}]

    app.openapi_schema = openapi_schema
    return app.openapi_schema


# Create FastAPI app
app = FastAPI()
app.openapi = custom_openapi   # ⭐ override swagger generator

# --------------------------------------------------------
#                     CORS SETTINGS
# --------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
>>>>>>> auth-feature
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

<<<<<<< HEAD
Base.metadata.create_all(bind=engine)

# Routers
from backend.app.api import auth, recipes

=======
# --------------------------------------------------------
#                     DATABASE
# --------------------------------------------------------
Base.metadata.create_all(bind=engine)

# --------------------------------------------------------
#                    ROUTERS
# --------------------------------------------------------
>>>>>>> auth-feature
app.include_router(auth.router, prefix="/auth")
app.include_router(recipes.router, prefix="/recipes")
app.include_router(ai.router, prefix="/ai")
