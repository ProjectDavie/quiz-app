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
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">{doc.title}</h1>

      {doc.questions?.length === 0 && (
        <p>No questions found</p>
      )}

      {doc.questions?.map((q: any, i: number) => (
        <div key={i} className="mb-4">
          <p className="font-semibold">
            Q{i + 1}: {q.question}
          </p>
          <p className="text-gray-600">
            {q.answer}
          </p>
        </div>
      ))}
    </div>
  );
}