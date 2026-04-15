"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function QuizPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [doc, setDoc] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/documents/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setDoc(data.document);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading quiz...
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="h-screen flex items-center justify-center">
        Quiz not found
      </div>
    );
  }

  const questions = doc.questions || [];
  const q = questions[current];

  return (
    <div className="min-h-screen bg-white text-black p-8">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">{doc.title} - Quiz</h1>
        <span>{current + 1} / {questions.length}</span>
      </div>

      {/* QUESTION */}
      <div className="border shadow-sm rounded-xl p-6">
        <p className="font-semibold text-lg">{q.question}</p>
        <p className="mt-3 text-gray-600">{q.answer}</p>
      </div>

      {/* CONTROLS */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setCurrent((p) => Math.max(p - 1, 0))}
          className="border px-4 py-2 rounded-lg"
        >
          Previous
        </button>

        <button
          onClick={() => setCurrent((p) => Math.min(p + 1, questions.length - 1))}
          className="border px-4 py-2 rounded-lg"
        >
          Next
        </button>
      </div>

      <button
        onClick={() => router.push("/projects")}
        className="mt-8 text-blue-600 hover:underline"
      >
        Back to Projects
      </button>
    </div>
  );
}