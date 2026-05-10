"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://192.168.100.55:8000";

export default function ProjectsPage() {
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  /* =========================
      FETCH DOCUMENTS
  ========================= */
  useEffect(() => {
    async function fetchDocuments() {
      try {
        console.log("📡 FETCHING:", `${API}/documents`);

        const res = await fetch(`${API}/documents`);

        if (!res.ok) {
          throw new Error("Failed to fetch documents");
        }

        const data = await res.json();

        console.log("✅ DOCUMENTS:", data);

        // FastAPI returns:
        // { documents: [...] }
        setDocs(data.documents || []);

      } catch (err) {
        console.error("❌ FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDocuments();
  }, []);

  /* =========================
      NAVIGATION
  ========================= */
  const openQuiz = (id: string) => {
    router.push(`/quiz/${id}`);
  };

  const openFlashcards = (id: string) => {
    router.push(`/flashcards/${id}`);
  };

  const openDocument = (id: string) => {
    router.push(`/history?id=${id}`);
  };

  const goToUpload = () => {
    router.push("/upload");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black px-6 md:px-12 py-10">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-12">

        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Projects
          </h1>

          <p className="text-gray-500 mt-2">
            Your uploaded study materials
          </p>
        </div>

        <button
          onClick={goToUpload}
          className="bg-black text-white px-6 py-3 rounded-2xl text-sm font-medium hover:opacity-90 transition"
        >
          Upload PDF
        </button>

      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto">

        {/* LOADING */}
        {loading && (
          <p className="text-gray-500">
            Loading projects...
          </p>
        )}

        {/* EMPTY */}
        {!loading && docs.length === 0 && (
          <div className="bg-white rounded-3xl shadow-md p-12 text-center">

            <h2 className="text-2xl font-semibold">
              No projects yet
            </h2>

            <p className="text-gray-500 mt-3">
              Upload PDFs to generate extracted study material
            </p>

            <button
              onClick={goToUpload}
              className="mt-6 bg-black text-white px-6 py-3 rounded-2xl"
            >
              Upload Document
            </button>

          </div>
        )}

        {/* GRID */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {docs.map((doc) => (
            <div
              key={doc._id}
              className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl transition"
            >

              {/* TITLE */}
              <h2 className="font-semibold text-xl leading-tight">
                {doc.title || "Untitled Document"}
              </h2>

              {/* META */}
              <div className="mt-4 space-y-1 text-sm text-gray-500">

                <p>
                  Pages:{" "}
                  {Array.isArray(doc.pages)
                    ? doc.pages.length
                    : doc.pages || 0}
                </p>

                <p>
                  Questions:{" "}
                  {doc.questions?.length || 0}
                </p>

                <p>
                  Flashcards:{" "}
                  {doc.flashcards?.length || 0}
                </p>

              </div>

              {/* ID */}
              <p className="text-xs text-gray-400 mt-4 break-all">
                {doc._id}
              </p>

              {/* ACTIONS */}
              <div className="mt-6 space-y-3">

                <button
                  onClick={() => openDocument(doc._id)}
                  className="w-full bg-gray-100 hover:bg-gray-200 transition py-3 rounded-2xl text-sm font-medium"
                >
                  View Extracted Document
                </button>

                <button
                  onClick={() => openQuiz(doc._id)}
                  className="w-full bg-black text-white py-3 rounded-2xl text-sm font-medium hover:opacity-90 transition"
                >
                  Start Quiz
                </button>

                <button
                  onClick={() => openFlashcards(doc._id)}
                  className="w-full bg-gray-100 hover:bg-gray-200 transition py-3 rounded-2xl text-sm font-medium"
                >
                  Flashcards
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}