"use client";

import { useRouter } from "next/navigation";
import UploadArea from "../../../components/uploads/UploadArea";

export default function UploadPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-black">
            Upload Document
          </h1>

          <p className="text-gray-500 mt-2">
            Extract quizzes, flashcards and structured notes
          </p>
        </div>

        {/* UPLOAD */}
        <UploadArea
          onSuccess={(data) => {
            console.log("UPLOAD COMPLETE:", data);

            // optional redirect
            router.push("/projects");
          }}
        />

      </div>
    </div>
  );
}