"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://192.168.100.55:8000";

export default function QuizHomePage() {
    const [docs, setDocs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    /* =========================
        FETCH DOCUMENTS
    ========================= */
    useEffect(() => {
        async function fetchDocuments() {
            try {
                const res = await fetch(`${API}/documents`);
                const data = await res.json();

                setDocs(data.documents || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchDocuments();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 text-black px-6 py-10">

            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="mb-12">

                    <h1 className="text-4xl font-bold">
                        Quiz Library
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Select a document to start a quiz
                    </p>

                </div>

                {/* LOADING */}
                {loading && (
                    <p className="text-gray-500">
                        Loading quizzes...
                    </p>
                )}

                {/* EMPTY */}
                {!loading && docs.length === 0 && (
                    <div className="bg-white rounded-3xl p-10 shadow-md">
                        <h2 className="text-2xl font-semibold">
                            No quiz documents
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Upload PDFs first
                        </p>
                    </div>
                )}

                {/* GRID */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {docs.map((doc) => (
                        <div
                            key={doc._id}
                            className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl transition"
                        >

                            <h2 className="text-xl font-semibold leading-tight">
                                {doc.title || "Untitled Document"}
                            </h2>

                            <div className="mt-4 text-sm text-gray-500 space-y-1">

                                <p>
                                    Pages:{" "}
                                    {Array.isArray(doc.pages)
                                        ? doc.pages.length
                                        : 0}
                                </p>

                                <p>
                                    Questions:{" "}
                                    {doc.questions?.length || 0}
                                </p>

                            </div>

                            <button
                                onClick={() =>
                                    router.push(`/quiz/${doc._id}`)
                                }
                                className="mt-6 w-full bg-black text-white py-3 rounded-2xl"
                            >
                                Start Quiz
                            </button>

                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}