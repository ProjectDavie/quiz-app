import os
import uuid
from datetime import datetime
from fastapi import APIRouter, UploadFile, File, HTTPException

from app.db import documents

router = APIRouter()

BASE_STORAGE = "/app/storage/documents"


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    try:
        document_id = str(uuid.uuid4())

        # ------------------------
        # 1. CREATE FOLDER
        # ------------------------
        folder = os.path.join(BASE_STORAGE, document_id)
        os.makedirs(folder, exist_ok=True)

        file_path = os.path.join(folder, "original.pdf")

        # ------------------------
        # 2. SAVE FILE
        # ------------------------
        content = await file.read()

        with open(file_path, "wb") as f:
            f.write(content)

        # ------------------------
        # 3. BUILD DOC OBJECT
        # ------------------------
        doc = {
            "documentId": document_id,
            "title": file.filename,
            "pdfPath": f"storage/documents/{document_id}/original.pdf",
            "status": "uploaded",
            "pageCount": 0,
            "createdAt": datetime.utcnow()
        }

        # ------------------------
        # 4. INSERT INTO MONGO (CRITICAL FIX)
        # ------------------------
        result = await documents.insert_one(doc)

        if not result.inserted_id:
            raise HTTPException(status_code=500, detail="Mongo insert failed")

        return {
            "documentId": document_id,
            "status": "uploaded"
        }

    except Exception as e:
        print("UPLOAD ERROR:", str(e))
        raise HTTPException(status_code=500, detail=str(e))