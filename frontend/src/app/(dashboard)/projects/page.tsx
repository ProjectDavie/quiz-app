"use client";

import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/documents")
      .then((res) => res.json())
      .then((data) => {
        console.log("PROJECTS:", data);
        setDocs(data.documents || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8">

      <h1 className="text-2xl font-bold mb-6">Projects</h1>

      {loading && <p>Loading...</p>}

      {!loading && docs.length === 0 && (
        <div className="p-6 border rounded-xl bg-gray-50">
          No projects yet
        </div>
      )}

      <div className="grid gap-6">
        {docs.map((doc) => (
          <div key={doc._id} className="p-6 border rounded-xl bg-white shadow">

            <h2 className="font-bold text-lg">{doc.title}</h2>

            <p className="text-sm text-gray-500">
              {new Date(doc.createdAt).toLocaleString()}
            </p>

            <div className="mt-3 text-sm">
              📄 {doc.pages?.length || 1} pages <br />
              ❓ {doc.questions?.length || 0} questions <br />
              🧠 {doc.flashcards?.length || 0} flashcards
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}