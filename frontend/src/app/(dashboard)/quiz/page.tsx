"use client";

import { useState } from "react";

export default function Home() {

  const [questions, setQuestions] = useState<any[]>([]);

  async function uploadPDF(e:any) {

    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("pdf", file);

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    setQuestions(data.questions);
  }

  return (

    <div className="max-w-3xl">

      <h1 className="text-3xl font-bold mb-6">
        Generate Quiz From Notes
      </h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={uploadPDF}
      />

      <div className="mt-6 space-y-4">

        {questions.map((q,i)=>(
          <div key={i} className="p-4 bg-gray-100 rounded">

            <h3 className="font-semibold">{q.question}</h3>
            <p className="text-gray-600">{q.answer}</p>

          </div>
        ))}

      </div>

    </div>

  );
}