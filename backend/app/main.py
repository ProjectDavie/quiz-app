from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.upload import router as upload_router
from app.routes.documents import router as documents_router
from app.routes.extract import router as extract_router
from app.routes.files import router as files_router

app = FastAPI(
    title="Quiz App API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS (ALLOW FRONTEND)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(documents_router)
app.include_router(extract_router)
app.include_router(files_router)

@app.get("/")
def root():
    return {"status": "ok"}