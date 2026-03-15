"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface UploadLoaderProps {
  questionsCount: number;
}

export default function UploadLoader({ questionsCount }: UploadLoaderProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Simulate loader
  setTimeout(() => setLoading(false), 1000);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-6">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col items-center gap-4">
      <div className="text-gray-700 font-medium">
        ✅ Successfully uploaded {questionsCount} questions!
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/quiz")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go to Quiz
        </button>
        <button
          onClick={() => router.push("/flashcards")}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Go to Flashcards
        </button>
        <button
          onClick={() => router.push("/history")}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
        >
          View History
        </button>
      </div>
    </div>
  );
}