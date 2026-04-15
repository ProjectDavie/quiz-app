"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProjectsPage() {
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  /* ========================
     FETCH PROJECTS
  ======================== */
  useEffect(() => {
    fetch("http://localhost:5000/documents")
      .then((res) => res.json())
      .then((data) => {
        setDocs(data.documents || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  /* ========================
     DELETE PROJECT
  ======================== */
  async function deleteProject(id: string) {
    const confirmDelete = confirm("Delete this project permanently?");
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/documents/${id}`, {
        method: "DELETE",
      });

      setDocs((prev) => prev.filter((d) => d._id !== id));

    } catch (err) {
      console.error("Delete failed", err);
    }
  }

  /* ========================
     NAVIGATION
  ======================== */
  const openQuiz = (id: string) => {
    router.push(`/quiz/${id}`);
  };

  const openFlashcards = (id: string) => {
    router.push(`/flashcards/${id}`);
  };

  const goToUpload = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-white text-black px-6 md:px-12 py-10">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-12">

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Projects
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Your uploaded study materials
          </p>
        </div>

        <button
          onClick={goToUpload}
          className="bg-black text-white px-6 py-3 rounded-2xl text-sm font-medium hover:opacity-90 transition"
        >
          Upload
        </button>

      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto">

        {/* LOADING */}
        {loading && (
          <p className="text-gray-500">Loading projects...</p>
        )}

        {/* EMPTY STATE */}
        {!loading && docs.length === 0 && (
          <div className="bg-white shadow-lg rounded-2xl p-12 text-center">
            <h2 className="text-xl font-semibold">
              No projects yet
            </h2>
            <p className="text-gray-500 mt-2">
              Upload a PDF to generate quizzes and flashcards
            </p>

            <button
              onClick={goToUpload}
              className="mt-6 bg-black text-white px-6 py-3 rounded-xl text-sm hover:opacity-90"
            >
              Upload Document
            </button>
          </div>
        )}

        {/* PROJECT GRID */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {docs.map((doc) => (
            <div
              key={doc._id}
              className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition"
            >

              {/* TITLE */}
              <h2 className="font-semibold text-lg leading-tight">
                {doc.title}
              </h2>

              <p className="text-gray-400 text-xs mt-1">
                {new Date(doc.createdAt).toLocaleString()}
              </p>

              {/* STATS */}
              <div className="mt-5 text-sm text-gray-600 space-y-1">
                <p>Pages: {doc.pages?.length || 1}</p>
                <p>Questions: {doc.questions?.length || 0}</p>
                <p>Flashcards: {doc.flashcards?.length || 0}</p>
              </div>

              {/* ACTIONS */}
              <div className="mt-6 space-y-2">

                <button
                  onClick={() => openQuiz(doc._id)}
                  className="w-full bg-black text-white py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition"
                >
                  Start Quiz
                </button>

                <button
                  onClick={() => openFlashcards(doc._id)}
                  className="w-full bg-gray-100 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-200 transition"
                >
                  Flashcards
                </button>

                <button
                  onClick={() => deleteProject(doc._id)}
                  className="w-full text-red-600 text-sm py-2 rounded-xl hover:bg-red-50 transition"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}