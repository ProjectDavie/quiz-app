"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import HistoryToolbar from "../../../../components/history/HistoryToolbar";
import PdfViewer from "../../../..//components/history/PdfViewer";
import TextViewer from "../../../..//components/history/TextViewer";
import ProgressBar from "../../../..//components/history/ProgressBar";

const API = "http://192.168.100.55:8000";

export default function HistoryPage() {

    const { id } = useParams();

    const [doc, setDoc] = useState<any>(null);
    const [pageIndex, setPageIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [mode, setMode] = useState<"raw" | "clean">("raw");
    const [progress, setProgress] = useState(0);
    const [extracting, setExtracting] = useState(false);

    // load doc once
    useEffect(() => {
        fetch(`${API}/documents/${id}`)
            .then(r => r.json())
            .then(data => {
                setDoc(data);
                setTotalPages(data.pageCount || 0);
                setProgress(data.progress || 0);
            });
    }, [id]);

    // SAFE polling (only when extracting)
    useEffect(() => {
        if (!extracting) return;

        const interval = setInterval(async () => {
            const res = await fetch(`${API}/documents/${id}`);
            const data = await res.json();

            setProgress(data.progress);

            if (data.status === "completed" || data.status === "failed") {
                setExtracting(false);
                setDoc(data);
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [extracting, id]);

    const extract = async () => {
        if (extracting) return;

        const res = await fetch(`${API}/documents/${id}/extract`, {
            method: "POST"
        });

        const data = await res.json();

        if (data.status === "started") {
            setExtracting(true);
        }
    };

    if (!doc) return <div>Loading...</div>;

    return (
        <div className="h-screen flex flex-col">

            <HistoryToolbar
                pageIndex={pageIndex}
                totalPages={totalPages}
                mode={mode}
                onPrev={() => setPageIndex(p => Math.max(0, p - 1))}
                onNext={() => setPageIndex(p => Math.min(totalPages - 1, p + 1))}
                onToggleMode={() => setMode(m => m === "raw" ? "clean" : "raw")}
                onGoToPage={(p: number) => setPageIndex(p)}
                onExtract={extract}
                extracting={extracting}
            />

            <ProgressBar progress={progress} status={doc.status} />

            <div className="flex flex-1">

                <div className="w-1/2">
                    <PdfViewer
                        documentId={id as string}
                        pageNumber={pageIndex + 1}
                    />
                </div>

                <div className="w-1/2">
                    <TextViewer
                        documentId={id as string}
                        pageIndex={pageIndex}
                        mode={mode}
                    />
                </div>

            </div>
        </div>
    );
}