"use client";

import { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc =
    "/pdf.worker.min.mjs";

export default function PdfViewer({
    documentId,
    pageNumber,
}: {
    documentId: string;
    pageNumber: number;
}) {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {

        const load = async () => {

            const pdf = await pdfjsLib.getDocument(
                `http://192.168.100.55:8000/files/${documentId}`
            ).promise;

            const page = await pdf.getPage(pageNumber);

            const viewport = page.getViewport({ scale: 1 });

            const canvas = canvasRef.current;

            if (!canvas) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({
                canvasContext: ctx,
                viewport,
                canvas
            }).promise;
        };

        load();

    }, [documentId, pageNumber]);

    return (
        <div className="h-full overflow-auto flex justify-center bg-gray-100">
            <canvas ref={canvasRef} />
        </div>
    );
}