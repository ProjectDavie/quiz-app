from fastapi import APIRouter, UploadFile, File
import fitz  # PyMuPDF

router = APIRouter()


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        return {"error": "Only PDF allowed"}

    content = await file.read()

    doc = fitz.open(stream=content, filetype="pdf")

    pages = []

    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text = page.get_text("text")

        pages.append({
            "pageNumber": page_num + 1,
            "text": text.strip()
        })

    return {
        "filename": file.filename,
        "pages": pages,
        "totalPages": len(pages)
    }