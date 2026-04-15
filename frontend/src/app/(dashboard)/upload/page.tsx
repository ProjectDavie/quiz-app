"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadHeader from "../../../components/uploads/UploadHeader";
import UploadArea from "../../../components/uploads/UploadArea";
import UploadLoader from "../../../components/uploads/UploadLoader";

export default function DashboardHome() {
  const [questions, setQuestions] = useState<any[]>([]);
  const router = useRouter();

  function handleUpload(data: any[]) {
    setQuestions(data);
    localStorage.setItem("quiz-questions", JSON.stringify(data));
  }

  function goToQuiz() {
    router.push("/quiz");
  }

  return (
    <div className="min-h-screen bg-white text-black px-6 md:px-12 py-10">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-12">
        <UploadHeader />
      </div>

      {/* UPLOAD SECTION */}
      <div className="max-w-3xl mx-auto mb-16">

        <div className="bg-white shadow-lg rounded-2xl p-10 text-center">

          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Upload Document
          </h1>

          <p className="text-gray-500 mb-8">
            Generate quizzes and flashcards instantly from your PDF
          </p>

          <UploadArea onUploadComplete={handleUpload} />

        </div>
      </div>

      {/* LOADING STATE */}
      {questions.length > 0 && (
        <div className="max-w-4xl mx-auto mb-10">
          <UploadLoader questionsCount={questions.length} />
        </div>
      )}

      {/* RESULTS */}
      {questions.length > 0 && (
        <div className="max-w-5xl mx-auto">

          {/* TITLE */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Generated Questions
            </h2>
            <p className="text-gray-500 text-sm">
              {questions.length} questions created from your document
            </p>
          </div>

          {/* QUESTION GRID */}
          <div className="grid md:grid-cols-2 gap-6">

            {questions.map((q, i) => (
              <div
                key={i}
                className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition"
              >
                <p className="font-semibold text-lg leading-snug">
                  {q.question}
                </p>

                <p className="text-gray-500 mt-3 text-sm leading-relaxed">
                  {q.answer}
                </p>
              </div>
            ))}

          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <button
              onClick={goToQuiz}
              className="bg-black text-white px-8 py-4 rounded-2xl text-sm font-medium hover:opacity-90 transition"
            >
              Start Quiz →
            </button>
          </div>

        </div>
      )}

    </div>
  );
}