"use client";

import { useState } from "react";

export default function UploadArea() {
  const [loading, setLoading] = useState(false);

  async function uploadPDF(e: any) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("pdf", file);

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.documentId) {
      localStorage.setItem("documentId", data.documentId);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-10 text-center border">

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-2">
          Upload Your Study Material
        </h1>

        <p className="text-gray-500 mb-8">
          Upload a PDF and generate quizzes + flashcards instantly
        </p>

        {/* DROP AREA */}
        <label className="cursor-pointer block border-2 border-dashed border-gray-300 rounded-2xl p-12 hover:border-blue-500 hover:bg-blue-50 transition">

          <input
            type="file"
            accept="application/pdf"
            onChange={uploadPDF}
            className="hidden"
          />

          {loading ? (
            <p className="text-blue-600 font-medium">Processing PDF...</p>
          ) : (
            <>
              <div className="text-5xl mb-4">📄</div>
              <p className="text-gray-600 font-medium">
                Click to upload or drag & drop PDF
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Supports only PDF files
              </p>
            </>
          )}

        </label>
      </div>
    </div>
  );
}