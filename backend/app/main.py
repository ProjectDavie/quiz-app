from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.document import router as document_router
from app.routes.upload import router as upload_router


app = FastAPI(title="Quiz AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(document_router)

@app.get("/")
async def root():
    return {"status": "Quiz AI API running clean"}