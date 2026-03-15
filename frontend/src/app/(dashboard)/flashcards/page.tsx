"use client";

import { useState } from "react";
import FlashcardUploadArea from "../../../components/flashcards/FlashcardUploadArea";
import FlashcardList from "../../../components/flashcards/FlashcardList";

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState<any[]>([]);

  return (
    <div className="mt-10">
      {/* Upload PDF */}
      <FlashcardUploadArea setFlashcards={setFlashcards} />

      {/* Flashcards List */}
      <FlashcardList flashcards={flashcards} />
    </div>
  );
}