"use client";

import { use, useEffect, useState } from "react";

export default function QuizPage({ params }: any) {
  const { id } = use(params);

  const [doc, setDoc] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/documents/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("DOC:", data);
        setDoc(data.document);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!doc) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black px-8 py-10">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-8">
        {doc.title}
      </h1>

      {/* No questions */}
      {doc.questions?.length === 0 && (
        <p className="text-gray-600">
          No questions found
        </p>
      )}

      {/* Questions */}
      <div className="space-y-4">
        {doc.questions?.map((q: any, i: number) => (
          <div
            key={i}
            className="border border-gray-300 rounded-xl p-5 bg-white shadow-sm"
          >
            <p className="font-semibold text-lg mb-2">
              Q{i + 1}: {q.question}
            </p>
            <p className="text-gray-700">
              {q.answer}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}