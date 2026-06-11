from fastapi import APIRouter, BackgroundTasks
from app.db import documents
from app.extraction.worker import extract_document

router = APIRouter()


@router.post("/documents/{doc_id}/extract")
async def start_extraction(doc_id: str, background_tasks: BackgroundTasks):

    doc = await documents.find_one({"documentId": doc_id})

    if not doc:
        return {"error": "Document not found"}

    pdf_path = "/app/" + doc["pdfPath"].replace("storage/", "storage/")

    background_tasks.add_task(extract_document, doc_id, pdf_path)

    return {"status": "started"}