"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://192.168.100.55:8000";

type Document = {
    documentId: string;
    title: string;
    pageCount: number;
    status: string;
};

export default function HistoryPage() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    // FETCH DOCUMENTS
    useEffect(() => {
        async function fetchDocuments() {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(`${API}/documents`);

                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}`);
                }

                const data = await res.json();

                // safety guard
                if (!Array.isArray(data)) {
                    throw new Error("Invalid response format");
                }

                setDocuments(data);
            } catch (err: any) {
                console.error("FETCH ERROR:", err);
                setError(err.message || "Failed to load documents");
                setDocuments([]);
            } finally {
                setLoading(false);
            }
        }

        fetchDocuments();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 text-black px-6 md:px-12 py-10">

            {/* HEADER */}
            <div className="max-w-6xl mx-auto mb-10">
                <h1 className="text-4xl font-bold">History</h1>
                <p className="text-gray-500 mt-2">
                    Open a document to view pages and extraction results
                </p>
            </div>

            {/* STATES */}
            <div className="max-w-6xl mx-auto">

                {loading && (
                    <p className="text-gray-500">
                        Loading documents...
                    </p>
                )}

                {error && (
                    <p className="text-red-500">
                        {error}
                    </p>
                )}

                {!loading && documents.length === 0 && !error && (
                    <p className="text-gray-500">
                        No documents found
                    </p>
                )}

                {/* GRID */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {documents.map((doc) => (
                        <div
                            key={doc.documentId}
                            className="bg-white rounded-2xl shadow p-5 flex flex-col"
                        >

                            {/* TITLE */}
                            <h2 className="font-semibold text-lg truncate">
                                {doc.title || "Untitled"}
                            </h2>

                            {/* META */}
                            <p className="text-xs text-gray-500 mt-2">
                                Pages: {doc.pageCount || 0}
                            </p>

                            <p className="text-xs text-gray-400">
                                Status: {doc.status}
                            </p>

                            {/* ID */}
                            <p className="text-[10px] text-gray-300 mt-2 break-all">
                                {doc.documentId}
                            </p>

                            {/* OPEN BUTTON */}
                            <button
                                onClick={() =>
                                    router.push(`/history/${doc.documentId}`)
                                }
                                className="mt-5 bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition"
                            >
                                Open Document
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}