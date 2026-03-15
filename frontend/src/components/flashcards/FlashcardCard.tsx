"use client";

import { useState } from "react";

interface FlashcardProps {
  front: string;
  back: string;
}

export default function FlashcardCard({ front, back }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="cursor-pointer perspective w-full max-w-md mx-auto"
    >
      <div
        className={`relative w-full h-40 text-center transition-transform duration-500 transform ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-md flex items-center justify-center p-4">
          <p className="text-gray-900 font-semibold">{front}</p>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden bg-green-50 rounded-2xl shadow-md flex items-center justify-center p-4 rotate-y-180">
          <p className="text-gray-800">{back}</p>
        </div>
      </div>
    </div>
  );
}