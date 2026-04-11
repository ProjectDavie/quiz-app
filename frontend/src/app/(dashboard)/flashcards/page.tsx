"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Flashcard {
  front: string;
  back: string;
}

export default function FlashcardsPage() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("quiz-questions");

    if (!stored) {
      router.push("/upload");
      return;
    }

    const questions = JSON.parse(stored);

    // Convert questions → flashcards
    const flashcards: Flashcard[] = questions.map((q: any) => ({
      front: extractTerm(q.question),
      back: q.answer,
    }));

    setCards(flashcards);
  }, [router]);

  function extractTerm(question: string) {
    // "What is X?" → "X"
    return question.replace("What is", "").replace("?", "").trim();
  }

  if (cards.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading flashcards...</p>
      </div>
    );
  }

  const card = cards[index];

  function next() {
    if (index < cards.length - 1) {
      setIndex(index + 1);
      setFlipped(false);
    }
  }

  function prev() {
    if (index > 0) {
      setIndex(index - 1);
      setFlipped(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="w-full max-w-xl">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Flashcards</h1>
          <p className="text-gray-500">
            {index + 1} / {cards.length}
          </p>
        </div>

        {/* CARD */}
        <div
          onClick={() => setFlipped(!flipped)}
          className="cursor-pointer bg-white rounded-2xl shadow-lg p-10 text-center min-h-[200px] flex items-center justify-center transition"
        >
          <h2 className="text-xl font-semibold text-gray-800">
            {flipped ? card.back : card.front}
          </h2>
        </div>

        {/* CONTROLS */}
        <div className="flex justify-between mt-6">
          <button
            onClick={prev}
            disabled={index === 0}
            className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          <button
            onClick={() => setFlipped(!flipped)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Flip
          </button>

          <button
            onClick={next}
            disabled={index === cards.length - 1}
            className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* BACK TO UPLOAD */}
        <div className="text-center mt-6">
          <button
            onClick={() => router.push("/upload")}
            className="text-blue-600 hover:underline"
          >
            ← Back to Upload
          </button>
        </div>

      </div>
    </div>
  );
}