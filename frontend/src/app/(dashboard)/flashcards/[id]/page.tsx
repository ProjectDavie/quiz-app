"use client";

import { use, useEffect, useState } from "react";

export default function FlashcardsPage({ params }: any) {
  const { id } = use(params);

  const [doc, setDoc] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/documents/${id}`)
      .then((res) => res.json())
      .then((data) => setDoc(data.document));
  }, [id]);

  if (!doc) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black px-8 py-10">
      
      {/* Title */}
      <h1 className="text-3xl font-bold mb-8">
        {doc.title}
      </h1>

      {/* Flashcards */}
      <div className="space-y-4">
        {doc.flashcards.map((f: any, i: number) => (
          <div
            key={i}
            className="border border-gray-300 rounded-xl p-5 bg-white shadow-sm"
          >
            <p className="font-semibold text-lg mb-2">
              {f.front}
            </p>
            <p className="text-gray-700">
              {f.back}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}