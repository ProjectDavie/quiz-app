from fastapi import APIRouter
from app.db import pages

router = APIRouter()


@router.get("/documents/{doc_id}/pages/{page_num}")
async def get_page(doc_id: str, page_num: int):

    page = await pages.find_one({
        "documentId": doc_id,
        "pageNumber": page_num
    })

    if not page:
        return {
            "documentId": doc_id,
            "pageNumber": page_num,
            "rawText": "",
            "cleanText": ""
        }

    page["_id"] = str(page["_id"])
    return page