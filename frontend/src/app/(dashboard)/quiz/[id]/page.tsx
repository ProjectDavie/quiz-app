"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function QuizPage() {
  const params = useParams();
  const id = params?.id;

  const [doc, setDoc] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDoc() {
      try {
        const res = await fetch(
          `http://localhost:5000/documents/${id}`
        );
        const data = await res.json();
        setDoc(data.document);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchDoc();
  }, [id]);

  if (loading) {
    return (
      <div className="p-10 text-gray-500">Loading quiz...</div>
    );
  }

  if (!doc) {
    return (
      <div className="p-10 text-gray-500">
        Document not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black px-6 md:px-12 py-10">

      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-10">
        <h1 className="text-2xl font-bold">
          Quiz: {doc.title}
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Mode: {doc.mode === "ai" ? "AI Generated" : "Offline"}
        </p>
      </div>

      {/* QUESTIONS */}
      <div className="max-w-4xl mx-auto space-y-6">

        {doc.questions?.map((q: any, i: number) => (
          <div
            key={i}
            className="bg-white border shadow-sm rounded-2xl p-6"
          >

            {/* QUESTION */}
            <p className="font-semibold text-lg">
              Q{i + 1}. {q.question}
            </p>

            {/* ANSWER */}
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              {q.answer}
            </p>

            {/* 📍 PAGE REFERENCE BADGE */}
            {q.page && (
              <div className="mt-4">
                <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-black text-white">
                  📄 Page {q.page}
                </span>
              </div>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}