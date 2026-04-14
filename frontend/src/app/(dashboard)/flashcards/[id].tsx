"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function FlashcardsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [doc, setDoc] = useState<any>(null);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/documents/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDoc(data.document);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading flashcards...
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="h-screen flex items-center justify-center">
        Flashcards not found
      </div>
    );
  }

  const cards = (doc.questions || []).map((q: any) => ({
    front: q.question.replace("What is", "").replace("?", "").trim(),
    back: q.answer,
  }));

  const card = cards[index];

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-8">

      <div className="w-full max-w-xl">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">{doc.title}</h1>
          <p className="text-gray-500">
            {index + 1} / {cards.length}
          </p>
        </div>

        {/* CARD */}
        <div
          onClick={() => setFlipped(!flipped)}
          className="border shadow-sm rounded-xl p-10 text-center cursor-pointer"
        >
          <p className="text-lg font-semibold">
            {flipped ? card.back : card.front}
          </p>
        </div>

        {/* CONTROLS */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setIndex((p) => Math.max(p - 1, 0))}
            className="border px-4 py-2 rounded-lg"
          >
            Previous
          </button>

          <button
            onClick={() => setFlipped(!flipped)}
            className="border px-4 py-2 rounded-lg"
          >
            Flip
          </button>

          <button
            onClick={() => setIndex((p) => Math.min(p + 1, cards.length - 1))}
            className="border px-4 py-2 rounded-lg"
          >
            Next
          </button>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => router.push("/projects")}
            className="text-blue-600 hover:underline"
          >
            Back to Projects
          </button>
        </div>

      </div>
    </div>
  );
}