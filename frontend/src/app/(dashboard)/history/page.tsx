"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:8000";

export default function HistoryListPage() {
    const [docs, setDocs] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch(`${API}/documents`);
                const data = await res.json();
                setDocs(data || []);
            } catch (err) {
                console.error("Failed to load documents", err);
            }
        };

        load();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">
                History
            </h1>

            <div className="space-y-3">
                {docs.map((doc) => (
                    <div
                        key={doc.documentId}
                        onClick={() =>
                            router.push(
                                `/history/${doc.documentId}`
                            )
                        }
                        className="p-4 border rounded-lg cursor-pointer hover:bg-gray-100 transition"
                    >
                        <div className="font-semibold">
                            {doc.fileName ||
                                doc.documentId}
                        </div>

                        <div className="text-sm text-gray-500">
                            Pages: {doc.pageCount || 0}
                        </div>

                        <div className="text-xs text-gray-400">
                            Status: {doc.status || "idle"} •{" "}
                            Progress: {doc.progress || 0}%
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}