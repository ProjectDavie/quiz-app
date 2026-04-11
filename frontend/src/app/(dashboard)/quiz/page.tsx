"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function QuizPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("quiz-questions");

    if (!stored) {
      router.push("/upload");
      return;
    }

    setQuestions(JSON.parse(stored));
  }, [router]);

  if (questions.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading quiz...</p>
      </div>
    );
  }

  const q = questions[current];

  function next() {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  }

  function prev() {
    if (current > 0) {
      setCurrent(current - 1);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-800">
            Quiz Mode
          </h1>

          <span className="text-sm text-gray-500">
            {current + 1} / {questions.length}
          </span>
        </div>

        {/* QUESTION */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            {q.question}
          </h2>

          <p className="mt-3 text-gray-600 bg-gray-50 p-4 rounded-lg">
            {q.answer}
          </p>
        </div>

        {/* NAV BUTTONS */}
        <div className="flex justify-between">
          <button
            onClick={prev}
            disabled={current === 0}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          <button
            onClick={next}
            disabled={current === questions.length - 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* FINISH */}
        {current === questions.length - 1 && (
          <button
            onClick={() => router.push("/upload")}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-xl"
          >
            Finish Quiz
          </button>
        )}
      </div>
    </div>
  );
}