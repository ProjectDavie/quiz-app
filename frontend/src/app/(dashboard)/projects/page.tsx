"use client";

import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/documents")
      .then((res) => res.json())
      .then((data) => {
        setDocs(data.documents || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // DELETE PROJECT
  async function deleteProject(id: string) {
    const confirmDelete = confirm("Delete this project permanently?");
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/documents/${id}`, {
        method: "DELETE",
      });

      // remove from UI instantly
      setDocs((prev) => prev.filter((d) => d._id !== id));

    } catch (err) {
      console.error("Delete failed", err);
    }
  }

  return (
    <div className="min-h-screen bg-white text-black p-8">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-gray-500 mt-1">
          Manage your study documents
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-gray-500">Loading projects...</div>
      )}

      {/* EMPTY */}
      {!loading && docs.length === 0 && (
        <div className="border shadow-sm rounded-xl p-10 text-center">
          <p className="font-semibold text-lg">No projects yet</p>
        </div>
      )}

      {/* GRID */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {docs.map((doc) => (
          <div
            key={doc._id}
            className="border shadow-sm rounded-xl p-6 hover:shadow-md transition relative"
          >

            {/* TITLE */}
            <h2 className="font-bold text-lg">{doc.title}</h2>

            <p className="text-gray-500 text-sm mt-1">
              {new Date(doc.createdAt).toLocaleString()}
            </p>

            {/* STATS */}
            <div className="mt-4 text-sm space-y-1">
              <p>📄 Pages: {doc.pages?.length || 1}</p>
              <p>❓ Questions: {doc.questions?.length || 0}</p>
              <p>🧠 Flashcards: {doc.flashcards?.length || 0}</p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-6 flex flex-col gap-2">

              {/* START QUIZ */}
              <button
                onClick={() => {
                  localStorage.setItem("active-quiz", JSON.stringify(doc));
                  window.location.href = "/quiz";
                }}
                className="bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Start Quiz
              </button>

              {/* FLASHCARDS */}
              <button
                onClick={() => {
                  localStorage.setItem("active-quiz", JSON.stringify(doc));
                  window.location.href = "/flashcards";
                }}
                className="border border-black py-2 rounded-lg hover:bg-black hover:text-white transition"
              >
                Start Flashcards
              </button>

              {/* DELETE */}
              <button
                onClick={() => deleteProject(doc._id)}
                className="text-red-600 border border-red-600 py-2 rounded-lg hover:bg-red-600 hover:text-white transition"
              >
                Delete Project
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}