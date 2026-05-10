from fastapi import APIRouter
from app.db import db
from bson import ObjectId

router = APIRouter()


# GET ALL DOCUMENTS (for Next.js list page)
@router.get("/documents")
async def get_documents():
    docs = []

    async for doc in db.documents.find():
        docs.append({
            "id": str(doc["_id"]),
            "title": doc.get("title"),
            "pages": len(doc.get("pages", []))
        })

    return docs


# GET SINGLE DOCUMENT
@router.get("/document/{doc_id}")
async def get_document(doc_id: str):
    doc = await db.documents.find_one({"_id": ObjectId(doc_id)})

    if not doc:
        return {"error": "Not found"}

    doc["_id"] = str(doc["_id"])
    return doc