from fastapi import APIRouter, HTTPException
from bson import ObjectId
from app.db import db

router = APIRouter()


# =========================
# SERIALIZER
# =========================
def serialize(doc):
    return {
        "_id": str(doc["_id"]),
        "title": doc.get("title"),
        "filename": doc.get("filename"),
        "status": doc.get("status", "uploaded"),
        "pageCount": doc.get("pageCount", 0),
        "progress": doc.get("progress", {}),
        "pdfPath": doc.get("pdfPath"),
    }


# =========================
# GET ALL PROJECTS
# =========================
@router.get("/documents")
async def get_documents():
    docs = []

    async for doc in db.documents.find().sort("_id", -1):
        docs.append(serialize(doc))

    return {
        "documents": docs
    }


# =========================
# GET SINGLE DOCUMENT
# =========================
@router.get("/documents/{doc_id}")
async def get_document(doc_id: str):

    doc = await db.documents.find_one(
        {"_id": ObjectId(doc_id)}
    )

    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")

    return serialize(doc)


# =========================
# PROGRESS
# =========================
@router.get("/documents/{doc_id}/progress")
async def get_progress(doc_id: str):

    doc = await db.documents.find_one(
        {"_id": ObjectId(doc_id)}
    )

    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")

    return doc.get("progress", {
        "processedPages": 0,
        "totalPages": 0,
        "percentage": 0
    })


# =========================
# PAGE DATA
# =========================
@router.get("/documents/{doc_id}/pages/{page_number}")
async def get_page(doc_id: str, page_number: int):

    page = await db.pages.find_one({
        "documentId": doc_id,
        "pageNumber": page_number
    })

    if not page:
        raise HTTPException(status_code=404, detail="Page not found")

    return {
        "_id": str(page["_id"]),
        "pageNumber": page["pageNumber"],
        "rawText": page.get("rawText", ""),
        "cleanText": page.get("cleanText", "")
    }