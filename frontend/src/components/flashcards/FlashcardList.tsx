"use client";

import FlashcardCard from "./FlashcardCard";

interface Flashcard {
  front: string;
  back: string;
}

interface FlashcardListProps {
  flashcards: Flashcard[];
}

export default function FlashcardList({ flashcards }: FlashcardListProps) {
  return (
    <div className="max-w-5xl mx-auto h-125 overflow-y-auto px-4 sm:px-6 lg:px-8 grid gap-4">
      {flashcards.length === 0 ? (
        <div className="text-gray-500 text-center py-20 bg-white rounded-2xl shadow-md">
          No flashcards yet. Upload a PDF to generate flashcards.
        </div>
      ) : (
        flashcards.map((card, i) => (
          <FlashcardCard key={i} front={card.front} back={card.back} />
        ))
      )}
    </div>
  );
}