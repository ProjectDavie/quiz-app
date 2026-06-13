import fitz
from app.db import documents, pages


async def extract_document(doc_id: str, pdf_path: str):

    # 🚨 GUARD: prevent duplicate workers
    doc = await documents.find_one({"documentId": doc_id})

    if not doc:
        return

    if doc.get("status") == "completed":
        return

    if doc.get("status") == "extracting":
        print("⚠️ Worker already running for this document")
        return

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

        # 🚨 optional safety check (prevents zombie duplicate workers mid-run)
        current = await documents.find_one({"documentId": doc_id})
        if current.get("status") != "extracting":
            print("🛑 Extraction aborted externally")
            return

        page = doc.load_page(i)
        text = page.get_text()

        await pages.update_one(
            {
                "documentId": doc_id,
                "pageNumber": i + 1
            },
            {
                "$set": {
                    "rawText": text,
                    "cleanText": text.strip()
                }
            },
            upsert=True
        )

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
        {"$set": {
            "status": "completed",
            "progress": 100
        }}
    )