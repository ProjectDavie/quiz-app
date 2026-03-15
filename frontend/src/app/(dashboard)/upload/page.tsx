"use client";

import { useState } from "react";
import UploadHeader from "../../../components/uploads/UploadHeader";
import UploadArea from "../../../components/uploads/UploadArea";
import UploadLoader from "../../../components/uploads/UploadLoader";

export default function DashboardHome() {
  const [questions, setQuestions] = useState<any[]>([]);
  const userName = "David"; // Replace with real user data later

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      {/* Header with date/time and welcome */}
      <UploadHeader />

      {/* Upload area */}
      <UploadArea onUploadComplete={(data) => setQuestions(data)} />

      {/* Loader & Redirect buttons */}
      {questions.length > 0 && <UploadLoader questionsCount={questions.length} />}
    </div>
  );
}