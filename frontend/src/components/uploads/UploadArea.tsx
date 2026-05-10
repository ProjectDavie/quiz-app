"use client";

import { useState } from "react";

const API = "http://192.168.100.55:8000";

type Props = {
  onSuccess?: (data: any) => void;
};

export default function UploadArea({ onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setLoading(true);
    setMessage("");

    try {
      console.log("📡 Uploading to:", API);

      const formData = new FormData();

      // MUST MATCH FASTAPI PARAMETER NAME
      formData.append("file", file);

      const res = await fetch(`${API}/upload`, {
        method: "POST",
        body: formData,
      });

      console.log("📡 STATUS:", res.status);

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      const data = await res.json();

      console.log("✅ SUCCESS:", data);

      localStorage.setItem(
        "documentId",
        data.documentId
      );

      setMessage(
        `Uploaded successfully • ${data.pages} pages extracted`
      );

      onSuccess?.(data);

    } catch (err: any) {
      console.error("❌ UPLOAD ERROR:", err);

      setMessage(
        err.message || "Upload failed"
      );
    } finally {
      setLoading(false);

      // reset input
      e.target.value = "";
    }
  }

  return (
    <div className="bg-white border rounded-2xl p-8 shadow-md">

      <h2 className="text-2xl font-semibold mb-2">
        Upload PDF
      </h2>

      <p className="text-gray-500 mb-6">
        Upload study material to extract quizzes and flashcards
      </p>

      <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-12 cursor-pointer hover:bg-gray-50 transition">

        <input
          type="file"
          accept="application/pdf"
          hidden
          onChange={handleUpload}
        />

        <p className="text-lg font-medium">
          Click to Upload PDF
        </p>

        <p className="text-sm text-gray-400 mt-2">
          PDF only
        </p>
      </label>

      {loading && (
        <p className="mt-5 text-blue-500">
          Processing document...
        </p>
      )}

      {message && (
        <p className="mt-5 text-sm text-gray-700">
          {message}
        </p>
      )}
    </div>
  );
}