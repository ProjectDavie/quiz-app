"use client";

import { useState } from "react";
import QuizUploadArea from "../../../components/quiz/QuizUploadArea";
import QuizQuestions from "../../../components/quiz/QuizQuestions";

export default function QuizPage() {
  const [questions, setQuestions] = useState<any[]>([]);

  return (
    <div className="mt-10">
      {/* Upload PDF */}
      <QuizUploadArea setQuestions={setQuestions} />

      {/* Questions List */}
      <QuizQuestions questions={questions} />
    </div>
  );
}