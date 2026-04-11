"use client";

import { Dispatch, SetStateAction, useState } from "react";

interface Question {
  question: string;
  answer: string;
}

interface QuizUploadAreaProps {
  setQuestions: Dispatch<SetStateAction<Question[]>>;
}

export default function QuizUploadArea({ setQuestions }: QuizUploadAreaProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function uploadPDF(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      // 1️⃣ Upload PDF
      const formData = new FormData();
      formData.append("pdf", file);

      const uploadRes = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("Failed to upload PDF");
      const uploadData = await uploadRes.json();
      if (!uploadData.pages) throw new Error("No pages returned from server");

      // 2️⃣ Generate questions for each page
      const allQuestions: Question[] = [];

      for (const page of uploadData.pages) {
        const questionRes = await fetch("http://localhost:5000/generate-questions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: page.text }),
        });

        if (!questionRes.ok) throw new Error("Failed to generate questions");

        const questionData = await questionRes.json();
        if (!questionData.questions) continue;

        questionData.questions.forEach((q: Question) =>
          allQuestions.push({
            question: `Page ${page.pageNumber}: ${q.question}`,
            answer: q.answer,
          })
        );
      }

      setQuestions(allQuestions);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md mx-auto mb-6">
      <label
        htmlFor="pdf-upload"
        className={`cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 w-full text-center hover:border-blue-500 hover:bg-blue-50 transition-colors ${
          loading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <span className="text-gray-600 font-medium">
          {loading ? "Uploading..." : "Click or drag PDF to upload"}
        </span>
        <input
          id="pdf-upload"
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={uploadPDF}
        />
      </label>

      {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
    </div>
  );
}