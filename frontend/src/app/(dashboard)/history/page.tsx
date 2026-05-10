
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API = "http://192.168.100.55:8000";

export default function HistoryPage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  /* =========================
      FETCH DOCUMENTS
  ========================= */
  useEffect(() => {
    async function fetchDocuments() {
      try {
        const res = await fetch(`${API}/documents`);
        const data = await res.json();

        console.log("DOCUMENTS:", data);

        setDocuments(data.documents || []);
      } catch (err) {
        console.error("FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDocuments();
  }, []);

  /* =========================
      VIEW DOCUMENT
  ========================= */
  async function openDocument(id: string) {
    try {
      const res = await fetch(`${API}/documents/${id}`);
      const data = await res.json();

      console.log("DOCUMENT:", data);

      setSelectedDocument(data.document);
    } catch (err) {
      console.error("OPEN DOCUMENT ERROR:", err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 text-black px-6 md:px-12 py-10">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-10 flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            History
          </h1>

          <p className="text-gray-500 mt-2">
            View uploaded PDFs and extracted content
          </p>
        </div>

        <button
          onClick={() => router.push("/upload")}
          className="bg-black text-white px-6 py-3 rounded-2xl"
        >
          Upload PDF
        </button>
      </div>

      {/* MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8">

        {/* LEFT SIDEBAR */}
        <div className="bg-white rounded-3xl shadow-md p-6 h-fit">

          <h2 className="text-xl font-semibold mb-5">
            Documents
          </h2>

          {loading && (
            <p className="text-gray-500">
              Loading documents...
            </p>
          )}

          {!loading && documents.length === 0 && (
            <p className="text-gray-500">
              No uploaded documents yet.
            </p>
          )}

          <div className="space-y-4">
            {documents.map((doc) => (
              <button
                key={doc._id}
                onClick={() => openDocument(doc._id)}
                className="w-full text-left border rounded-2xl p-4 hover:bg-gray-50 transition"
              >
                <h3 className="font-semibold text-sm leading-tight">
                  {doc.title || "Untitled Document"}
                </h3>

                <p className="text-xs text-gray-500 mt-2">
                  {doc.pages?.length || 0} pages
                </p>

                <p className="text-xs text-gray-400 mt-1 break-all">
                  {doc._id}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white rounded-3xl shadow-md p-8 min-h-[700px] overflow-hidden">

          {!selectedDocument && (
            <div className="h-full flex items-center justify-center text-center text-gray-400">
              <div>
                <h2 className="text-2xl font-semibold mb-3">
                  Select a document
                </h2>

                <p>
                  Click any uploaded PDF to view extracted pages and text blocks.
                </p>
              </div>
            </div>
          )}

          {selectedDocument && (
            <div>

              {/* DOCUMENT HEADER */}
              <div className="border-b pb-6 mb-8">
                <h2 className="text-3xl font-bold leading-tight">
                  {selectedDocument.title}
                </h2>

                <p className="text-gray-500 mt-2">
                  {selectedDocument.pages?.length || 0} extracted pages
                </p>
              </div>

              {/* PAGES */}
              <div className="space-y-10 max-h-[75vh] overflow-y-auto pr-3">

                {selectedDocument.pages?.map((page: any, index: number) => (
                  <div
                    key={index}
                    className="border rounded-3xl p-6 bg-gray-50"
                  >

                    {/* PAGE LABEL */}
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-lg font-semibold">
                        Page {page.page || page.pageNumber || index + 1}
                      </h3>

                      <span className="text-xs bg-black text-white px-3 py-1 rounded-full">
                        Extracted Text
                      </span>
                    </div>

                    {/* PAGE CONTENT */}
                    <div className="space-y-4">

                      {page.blocks?.length > 0 ? (
                        page.blocks.map((block: any, blockIndex: number) => (
                          <div
                            key={blockIndex}
                            className="bg-white border rounded-2xl p-5"
                          >
                            <p className="text-sm leading-7 whitespace-pre-wrap text-gray-800">
                              {block.text}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="bg-white border rounded-2xl p-5">
                          <p className="text-sm leading-7 whitespace-pre-wrap text-gray-800">
                            {page.text}
                          </p>
                        </div>
                      )}

                    </div>
                  </div>
                ))}

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}