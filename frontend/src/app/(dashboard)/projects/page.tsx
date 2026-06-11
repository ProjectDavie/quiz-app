"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function ProjectsPage() {
    const [docs, setDocs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchDocuments() {
            try {
                const res = await fetch(`${API}/documents`);

                if (!res.ok) {
                    console.error("Backend error:", res.status);
                    setDocs([]);
                    return;
                }

                const data = await res.json();

                console.log("PROJECTS:", data);

                setDocs(data || []);
            } catch (err) {
                console.error("FETCH ERROR:", err);
                setDocs([]);
            } finally {
                setLoading(false);
            }
        }

        fetchDocuments();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 text-black px-6 py-10">

            <h1 className="text-3xl font-bold mb-6">Projects</h1>

            {loading && <p>Loading...</p>}

            {!loading && docs.length === 0 && (
                <p>No documents found</p>
            )}

            <div className="grid md:grid-cols-3 gap-4">
                {docs.map((doc) => (
                    <div
                        key={doc.documentId}
                        className="bg-white p-4 rounded-xl shadow"
                    >
                        <h2 className="font-bold">
                            {doc.title}
                        </h2>

                        <p className="text-sm text-gray-500">
                            {doc.pageCount} pages • {doc.status}
                        </p>

                        <button
                            onClick={() =>
                                router.push(`/history/${doc.documentId}`)
                            }
                            className="mt-4 bg-black text-white px-4 py-2 rounded"
                        >
                            Open
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}