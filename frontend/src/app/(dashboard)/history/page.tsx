"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Page {
  pageNumber: number;
  text: string;
}

export default function HistoryPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("pdf-data");

      if (!stored) {
        setPages([]);
        setLoading(false);
        return;
      }

      const parsed = JSON.parse(stored);

      setPages(parsed.pages || []);

    } catch (err) {
      console.error("History error:", err);
      setPages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading history...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          📄 PDF History
        </h1>
        <p className="text-gray-500">
          Extracted pages from your uploaded PDF
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto space-y-6">

        {pages.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow text-center">
            <p className="text-gray-500">
              No PDF uploaded yet.
            </p>

            <button
              onClick={() => router.push("/upload")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Upload PDF
            </button>
          </div>
        ) : (
          pages.map((page) => (
            <div
              key={page.pageNumber}
              className="bg-white rounded-2xl shadow-md p-6"
            >
              <h2 className="font-bold text-lg mb-2">
                Page {page.pageNumber}
              </h2>

              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {page.text}
              </p>
            </div>
          ))
        )}

      </div>

      {/* BACK BUTTON */}
      <div className="max-w-5xl mx-auto mt-8">
        <button
          onClick={() => router.push("/upload")}
          className="text-blue-600 hover:underline"
        >
          ← Back to Upload
        </button>
      </div>

    </div>
  );
}