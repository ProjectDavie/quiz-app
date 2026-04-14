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
    <div className="min-h-screen bg-white text-black">

      {/* HEADER */}
      <div className="p-8 border-b">
        <UploadHeader />
      </div>

      {/* UPLOAD AREA */}
      <div className="p-8">
        <div className="border bg-white shadow-sm rounded-xl p-6">
          <UploadArea onUploadComplete={handleUpload} />
        </div>
      </div>

      {/* LOADER */}
      {questions.length > 0 && (
        <div className="px-8">
          <UploadLoader questionsCount={questions.length} />
        </div>
      )}

      {/* QUESTIONS */}
      {questions.length > 0 && (
        <div className="p-8 border-t">

          <h2 className="text-2xl font-bold mb-6">
            Generated Questions ({questions.length})
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {questions.map((q, i) => (
              <div
                key={i}
                className="border bg-white shadow-sm rounded-xl p-5
                           hover:shadow-md transition"
              >
                <p className="font-semibold">
                  Q{i + 1}: {q.question}
                </p>
                <p className="text-gray-600 mt-2">
                  Answer: {q.answer}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={goToQuiz}
            className="mt-8 bg-black text-white px-6 py-3 rounded-xl
                       shadow-sm hover:shadow-md transition"
          >
            Start Quiz 🚀
          </button>
        </div>
      )}

    </div>
  );
}