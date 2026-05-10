from fastapi import APIRouter, UploadFile, File
import fitz  # PyMuPDF
from app.db import db

router = APIRouter()


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    content = await file.read()

    pdf = fitz.open(stream=content, filetype="pdf")

    pages = []

    for page_num in range(len(pdf)):
        page = pdf.load_page(page_num)
        text = page.get_text("text")

        blocks = [
            {
                "text": t.strip(),
                "type": "paragraph",
                "page": page_num + 1
            }
            for t in text.split("\n")
            if t.strip()
        ]

        pages.append({
            "pageNumber": page_num + 1,
            "blocks": blocks
        })

    document = {
        "title": file.filename,
        "pages": pages,
        "questions": [],
        "flashcards": []
    }

    result = await db.documents.insert_one(document)

    return {
        "documentId": str(result.inserted_id),
        "pages": len(pages)
    }