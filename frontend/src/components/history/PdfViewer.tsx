"use client";

export default function PdfViewer({
    documentId,
    pageNumber,
}: {
    documentId: string;
    pageNumber: number;
}) {
    const url = `http://192.168.100.55:8000/files/${documentId}#page=${pageNumber}`;

    return (
        <iframe
            src={url}
            className="w-full h-full border-0"
        />
    );
}