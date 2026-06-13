from fastapi import APIRouter
from app.db import documents
from app.extraction.worker import extract_document

router = APIRouter()

@router.post("/documents/{doc_id}/extract")
async def start_extraction(doc_id: str):

    doc = await documents.find_one({"documentId": doc_id})

    if not doc:
        return {"error": "Document not found"}

    # prevent duplicate jobs
    if doc.get("status") == "processing":
        return {"status": "already_processing"}

    if doc.get("status") == "completed":
        return {"status": "already_completed"}

    await documents.update_one(
        {"documentId": doc_id},
        {
            "$set": {
                "status": "processing",
                "progress": 0,
                "pagesExtracted": 0
            }
        }
    )

    pdf_path = "/app/" + doc["pdfPath"].replace("storage/", "storage/")

    # IMPORTANT: fire-and-forget worker (still in process, but not tied to request lifecycle)
    import asyncio
    asyncio.create_task(extract_document(doc_id, pdf_path))

    return {"status": "started"}