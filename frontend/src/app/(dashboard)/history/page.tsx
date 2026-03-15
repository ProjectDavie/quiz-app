"use client";

import { useState } from "react";

export default function HistoryPage() {
  const [pdfPages, setPdfPages] = useState<{ pageNumber: number; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  async function uploadPDF(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setPdfPages(data.pages);
      } else {
        alert("Failed to extract PDF text");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading PDF");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      {/* Upload PDF */}
      <div className="mb-6">
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

      {/* Display Extracted Pages */}
      {pdfPages.length === 0 ? (
        <div className="text-gray-500 text-center py-20 bg-white rounded-2xl shadow-md">
          No PDF uploaded yet.
        </div>
      ) : (
        <div className="space-y-6">
          {pdfPages.map((page) => (
            <div
              key={page.pageNumber}
              className="bg-white rounded-2xl shadow-md p-6"
            >
              <h2 className="font-semibold text-lg mb-2">
                Page {page.pageNumber}
              </h2>
              <p className="text-gray-700 whitespace-pre-wrap">{page.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}