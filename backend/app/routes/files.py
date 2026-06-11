from fastapi import APIRouter
from fastapi.responses import FileResponse

router = APIRouter()


@router.get("/files/{doc_id}")
async def get_file(doc_id: str):
    path = f"/app/storage/documents/{doc_id}/original.pdf"
    return FileResponse(path, media_type="application/pdf")