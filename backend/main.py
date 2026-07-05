from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import (
    auth,
    courses,
    playlist,
    notes
)

from database import engine
from models import Base


# =====================
# CREATE TABLES
# =====================

Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="UniTube API"
)


# =====================
# CORS
# =====================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =====================
# ROUTERS
# =====================

app.include_router(
    auth.router,
    prefix="/auth"
)

app.include_router(
    courses.router
)

app.include_router(
    playlist.router
)

app.include_router(
    notes.router
)


# =====================
# HOME
# =====================

@app.get("/")
def home():

    return {
        "message": "UniTube API running"
    }
