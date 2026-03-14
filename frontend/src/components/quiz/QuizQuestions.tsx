"use client";

interface Question {
  question: string;
  answer: string;
}

interface QuizQuestionsProps {
  questions: Question[];
}

export default function QuizQuestions({ questions }: QuizQuestionsProps) {
  return (
    <div className="max-w-5xl mx-auto h-[500px] overflow-y-auto px-4 sm:px-6 lg:px-8">
      {questions.length === 0 ? (
        <div className="text-gray-500 text-center py-20 bg-white rounded-2xl shadow-md">
          No questions available yet. Upload a PDF to generate your quiz.
        </div>
      ) : (
        <div className="grid gap-4">
          {questions.map((q, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition flex flex-col"
            >
              <span className="font-semibold text-gray-800 mb-1">Q{i + 1}:</span>
              <h3 className="font-semibold text-gray-900 mb-1">{q.question}</h3>
              <p className="text-gray-700">{q.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}