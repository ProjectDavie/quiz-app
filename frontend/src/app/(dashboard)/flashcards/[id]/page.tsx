"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

const flashcards = [
    {
        front: "What is ATP?",
        back: "The energy currency of the cell",
    },
    {
        front: "What is the capital of France?",
        back: "Paris",
    },
    {
        front: "What is photosynthesis?",
        back: "Conversion of light into chemical energy",
    },
];

export default function FlashcardsPage() {
    const params = useParams();
    const router = useRouter();

    const [active, setActive] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-gray-100 px-6 py-10 text-black">

            <div className="max-w-5xl mx-auto">

                {/* HEADER */}
                <div className="mb-10">

                    <button
                        onClick={() => router.back()}
                        className="text-sm text-gray-500 mb-4"
                    >
                        ← Back
                    </button>

                    <h1 className="text-4xl font-bold">
                        Flashcards
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Document ID: {params.id}
                    </p>

                </div>

                {/* FLASHCARDS */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {flashcards.map((card, index) => {
                        const flipped = active === index;

                        return (
                            <button
                                key={index}
                                onClick={() =>
                                    setActive(flipped ? null : index)
                                }
                                className="bg-white rounded-3xl shadow-md p-8 text-left min-h-[220px] hover:shadow-xl transition"
                            >

                                <p className="text-xs text-gray-400 mb-3">
                                    Flashcard {index + 1}
                                </p>

                                {!flipped ? (
                                    <>
                                        <p className="text-sm text-gray-400">
                                            FRONT
                                        </p>

                                        <h2 className="text-xl font-semibold mt-3">
                                            {card.front}
                                        </h2>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-sm text-gray-400">
                                            BACK
                                        </p>

                                        <h2 className="text-lg mt-3 text-gray-700">
                                            {card.back}
                                        </h2>
                                    </>
                                )}

                            </button>
                        );
                    })}

                </div>
            </div>
        </div>
    );
}