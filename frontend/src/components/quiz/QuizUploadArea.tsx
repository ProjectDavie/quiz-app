"use client";

import { Dispatch, SetStateAction, useState } from "react";

interface QuizUploadAreaProps {
  setQuestions: Dispatch<SetStateAction<any[]>>;
}

export default function QuizUploadArea({ setQuestions }: QuizUploadAreaProps) {
  const [loading, setLoading] = useState(false);

  async function uploadPDF(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("pdf", file);

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setQuestions(data.questions);
    setLoading(false);
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
    </div>
  );
}