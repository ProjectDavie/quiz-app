"use client";

import { useParams, useRouter } from "next/navigation";

const questions = [
    {
        question: "What is the primary function of mitochondria?",
        answer: "Energy production",
    },
    {
        question: "What does DNA stand for?",
        answer: "Deoxyribonucleic Acid",
    },
    {
        question: "What organ pumps blood?",
        answer: "Heart",
    },
];

export default function QuizPage() {
    const params = useParams();
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-100 px-6 py-10 text-black">

            <div className="max-w-4xl mx-auto">

                {/* HEADER */}
                <div className="mb-10">
                    <button
                        onClick={() => router.back()}
                        className="text-sm text-gray-500 mb-4"
                    >
                        ← Back
                    </button>

                    <h1 className="text-4xl font-bold">
                        Quiz Session
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Document ID: {params.id}
                    </p>
                </div>

                {/* QUESTIONS */}
                <div className="space-y-6">

                    {questions.map((q, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl shadow-md p-8"
                        >

                            <p className="text-sm text-gray-400 mb-3">
                                Question {index + 1}
                            </p>

                            <h2 className="text-xl font-semibold">
                                {q.question}
                            </h2>

                            <div className="mt-6">
                                <button className="bg-black text-white px-5 py-3 rounded-2xl">
                                    Reveal Answer
                                </button>
                            </div>

                            <p className="mt-5 text-gray-600">
                                {q.answer}
                            </p>

                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}