"use client";

import { Dispatch, SetStateAction, useState } from "react";

interface QuizUploadAreaProps {
  setQuestions: Dispatch<SetStateAction<any[]>>;
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
      const formData = new FormData();
      formData.append("pdf", file);

      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to upload PDF");
      }

      const data = await res.json();

      // Make sure data.questions exists
      if (!data.questions) {
        throw new Error("No questions returned from server");
      }

      setQuestions(data.questions);
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