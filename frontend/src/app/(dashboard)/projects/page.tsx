"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://192.168.100.55:8000";

type DocumentItem = {
    documentId: string;
    title?: string;
    fileName?: string;
    status?: string;
    pageCount?: number;
    progress?: number;
    createdAt?: string;
};

export default function ProjectsPage() {
    const [documents, setDocuments] = useState<DocumentItem[]>([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const loadDocuments = async () => {
            try {
                const res = await fetch(`${API}/documents`);

                if (!res.ok) {
                    throw new Error("Failed to load documents");
                }

                const data = await res.json();

                console.log("📦 Documents:", data);

                setDocuments(data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadDocuments();
    }, []);

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Projects
                </h1>

                <p className="text-gray-500 mt-1">
                    Uploaded PDFs and extracted study materials
                </p>
            </div>

            {loading && (
                <div className="text-gray-500">
                    Loading projects...
                </div>
            )}

            {!loading && documents.length === 0 && (
                <div className="border rounded-lg p-8 text-center text-gray-500">
                    No projects found
                </div>
            )}

            <div className="space-y-4">
                {documents.map((doc) => (
                    <div
                        key={doc.documentId}
                        className="bg-white border rounded-xl p-5 shadow-sm"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h2 className="font-semibold text-lg">
                                    {doc.title ||
                                        doc.fileName ||
                                        doc.documentId}
                                </h2>

                                <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                                    <span>
                                        Pages: {doc.pageCount ?? 0}
                                    </span>

                                    <span>
                                        Status: {doc.status ?? "unknown"}
                                    </span>

                                    <span>
                                        Progress: {doc.progress ?? 0}%
                                    </span>
                                </div>

                                <div className="mt-2 text-xs text-gray-400 break-all">
                                    {doc.documentId}
                                </div>
                            </div>

                            <button
                                onClick={() =>
                                    router.push(
                                        `/history/${doc.documentId}`
                                    )
                                }
                                className="ml-4 px-4 py-2 bg-black text-white rounded-lg hover:opacity-90"
                            >
                                Open Project
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}