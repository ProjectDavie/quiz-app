"use client";

import { useState } from "react";

interface UploadAreaProps {
  onUploadComplete: (questions: any[]) => void;
}

export default function UploadArea({ onUploadComplete }: UploadAreaProps) {
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
    onUploadComplete(data.questions);
    setLoading(false);
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center justify-center border border-gray-200 w-full">
      <label
        htmlFor="pdf-upload"
        className={`cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-10 w-full text-center hover:border-blue-500 hover:bg-blue-50 transition-colors ${
          loading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <svg
          className="w-12 h-12 mb-3 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v8m0 0l-4-4m4 4l4-4M12 4v8"
          />
        </svg>
        <span className="text-gray-600 font-medium">
          {loading ? "Uploading..." : "Click to upload or drag and drop PDF"}
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