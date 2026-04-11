"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Document {
  _id: string;
  title: string;
  createdAt: string;
  questions?: any[];
  flashcards?: any[];
  pages?: any[];
}

export default function ProjectsPage() {
  const [docs, setDocs] = useState<Document[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5000/documents")
      .then((res) => res.json())
      .then((data) => setDocs(data.documents || []));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-gray-500">
            Your uploaded study documents
          </p>
        </div>

        {/* UPLOAD BUTTON */}
        <button
          onClick={() => router.push("/upload")}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl shadow hover:bg-blue-700"
        >
          + Upload
        </button>
      </div>

      {/* EMPTY STATE */}
      {docs.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-10 text-center border">
          <h2 className="text-xl font-semibold mb-2">
            No Projects Found
          </h2>
          <p className="text-gray-500">
            Upload your first PDF to get started
          </p>
        </div>
      ) : (
        /* CARDS */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {docs.map((doc) => (
            <div
              key={doc._id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition cursor-pointer"
            >

              <h2 className="text-xl font-semibold mb-2">
                {doc.title}
              </h2>

              <p className="text-gray-500 text-sm mb-4">
                Created: {new Date(doc.createdAt).toLocaleString()}
              </p>

              <div className="flex gap-4 text-sm text-gray-600">
                <span>📄 {doc.pages?.length || 1}</span>
                <span>❓ {doc.questions?.length || 0}</span>
                <span>🧠 {doc.flashcards?.length || 0}</span>
              </div>

              <button className="mt-4 text-blue-600 hover:underline">
                Open Project →
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}