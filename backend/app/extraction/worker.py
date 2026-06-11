import fitz
from app.db import documents, pages


async def extract_document(doc_id: str, pdf_path: str):

    doc = fitz.open(pdf_path)
    total_pages = len(doc)

    await documents.update_one(
        {"documentId": doc_id},
        {"$set": {
            "pageCount": total_pages,
            "status": "extracting",
            "pagesExtracted": 0,
            "progress": 0
        }}
    )

    for i in range(total_pages):
        page = doc.load_page(i)
        text = page.get_text()

        await pages.insert_one({
            "documentId": doc_id,
            "pageNumber": i + 1,
            "rawText": text,
            "cleanText": text.strip()
        })

        pages_done = i + 1
        progress = int((pages_done / total_pages) * 100)

        print(f"📄 Page {pages_done}/{total_pages} extracted")

        await documents.update_one(
            {"documentId": doc_id},
            {"$set": {
                "pagesExtracted": pages_done,
                "progress": progress,
                "status": f"extracting {pages_done}/{total_pages}"
            }}
        )

    await documents.update_one(
        {"documentId": doc_id},
        {"$set": {"status": "completed", "progress": 100}}
    )