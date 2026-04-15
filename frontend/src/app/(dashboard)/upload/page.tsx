"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"ai" | "offline">("offline");
  const [questions, setQuestions] = useState<any[]>([]);
  const router = useRouter();

  async function upload(file: File) {
    setLoading(true);

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("aiMode", String(mode === "ai"));

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setQuestions(data.questions || []);

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-white text-black px-6 md:px-12 py-10">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-10">
        <h1 className="text-3xl font-bold tracking-tight">
          Upload Document
        </h1>
        <p className="text-gray-500 mt-1">
          Generate quizzes & flashcards instantly
        </p>
      </div>

      {/* UPLOAD CARD */}
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">

        {/* MODE TOGGLE */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setMode("offline")}
            className={`flex-1 py-3 rounded-xl text-sm font-medium border ${
              mode === "offline"
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            Offline Mode
          </button>

          <button
            onClick={() => setMode("ai")}
            className={`flex-1 py-3 rounded-xl text-sm font-medium border ${
              mode === "ai"
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            AI Mode
          </button>
        </div>

        {/* UPLOAD INPUT */}
        <label className="block border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer hover:bg-gray-50 transition">
          <input
            type="file"
            accept="application/pdf"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) upload(file);
            }}
          />

          <p className="text-lg font-medium">
            Click to upload PDF
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Mode: {mode === "ai" ? "AI Enhanced" : "Offline NLP"}
          </p>
        </label>

        {/* LOADING */}
        {loading && (
          <p className="text-center mt-6 text-gray-500">
            Processing document...
          </p>
        )}
      </div>

      {/* RESULTS */}
      {questions.length > 0 && (
        <div className="max-w-5xl mx-auto mt-12">

          <h2 className="text-xl font-semibold mb-6">
            Generated Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {questions.map((q, i) => (
              <div
                key={i}
                className="bg-white shadow-md rounded-2xl p-6"
              >
                <p className="font-semibold">{q.question}</p>
                <p className="text-gray-500 mt-2 text-sm">
                  {q.answer}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => router.push("/projects")}
            className="mt-10 bg-black text-white px-6 py-3 rounded-xl"
          >
            Go to Projects →
          </button>

        </div>
      )}
    </div>
  );
}