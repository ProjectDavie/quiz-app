# /app/routes/document.py

from fastapi import APIRouter
from app.db import db
from bson import ObjectId

router = APIRouter()

# =========================
# GET ALL DOCUMENTS
# =========================
@router.get("/documents")
async def get_documents():

    documents = []

    async for doc in db.documents.find():

        doc["_id"] = str(doc["_id"])

        documents.append(doc)

    return {
        "documents": documents
    }


# =========================
# GET SINGLE DOCUMENT
# =========================
@router.get("/documents/{document_id}")
async def get_document(document_id: str):

    document = await db.documents.find_one({
        "_id": ObjectId(document_id)
    })

    if not document:
        return {
            "error": "Document not found"
        }

    document["_id"] = str(document["_id"])

    return {
        "document": document
    }