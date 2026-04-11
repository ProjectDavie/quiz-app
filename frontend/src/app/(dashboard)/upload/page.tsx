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
    <div className="max-w-5xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">

      <UploadHeader />

      <UploadArea onUploadComplete={handleUpload} />

      {questions.length > 0 && (
        <UploadLoader questionsCount={questions.length} />
      )}

      {/* QUESTIONS PREVIEW */}
      {questions.length > 0 && (
        <div className="mt-10 bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-bold mb-4">
            Generated Questions ({questions.length})
          </h2>

          <div className="space-y-4">
            {questions.map((q, index) => (
              <div key={index} className="border p-4 rounded-lg bg-gray-50">
                <p className="font-semibold">
                  Q{index + 1}: {q.question}
                </p>
                <p className="text-gray-600 mt-2">
                  Answer: {q.answer}
                </p>
              </div>
            ))}
          </div>

          {/* 🔥 BUTTON TO QUIZ PAGE */}
          <button
            onClick={goToQuiz}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Start Quiz 🚀
          </button>
        </div>
      )}
    </div>
  );
}