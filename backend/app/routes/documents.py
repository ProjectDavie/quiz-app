from fastapi import APIRouter
from app.db import documents, pages

router = APIRouter()


@router.get("/documents")
async def get_documents():
    docs = await documents.find({}).to_list(100)

    for doc in docs:
        doc["_id"] = str(doc["_id"])
        doc.setdefault("progress", 0)
        doc.setdefault("pagesExtracted", 0)
        doc.setdefault("pageCount", 0)

    return docs


@router.get("/documents/{doc_id}")
async def get_document(doc_id: str):
    doc = await documents.find_one({"documentId": doc_id})

    if not doc:
        return None

    doc["_id"] = str(doc["_id"])
    doc.setdefault("progress", 0)
    doc.setdefault("pagesExtracted", 0)
    doc.setdefault("pageCount", 0)

    return doc