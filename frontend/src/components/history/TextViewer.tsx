"use client";

import { useEffect, useState } from "react";

const API =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://192.168.100.55:8000";

export default function TextViewer({
    documentId,
    pageIndex,
    mode,
}: {
    documentId: string;
    pageIndex: number;
    mode: "raw" | "clean";
}) {
    const [pageData, setPageData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!documentId) return;

        const load = async () => {
            setLoading(true);

            try {
                const res = await fetch(
                    `${API}/documents/${documentId}/pages/${pageIndex + 1}`
                );

                if (!res.ok) {
                    setPageData(null);
                    return;
                }

                const data = await res.json();
                setPageData(data);
            } catch (err) {
                setPageData(null);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [documentId, pageIndex]);

    const text =
        mode === "raw"
            ? pageData?.rawText
            : pageData?.cleanText;

    return (
        <div className="h-full overflow-y-auto bg-white p-4">
            {loading ? (
                <div className="text-gray-500 text-sm">
                    Loading page...
                </div>
            ) : (
                <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                    {text || "No text available"}
                </pre>
            )}
        </div>
    );
}