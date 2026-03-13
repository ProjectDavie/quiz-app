"use client"

import { useState } from "react"

export default function Home() {

  const [questions, setQuestions] = useState<any[]>([])

  async function uploadPDF(e: any) {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append("pdf", file)

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData
    })

    const data = await res.json()
    setQuestions(data.questions)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">
          PDF Quiz Generator
        </h1>

        <input 
          type="file" 
          accept="application/pdf" 
          onChange={uploadPDF}
          className="block w-full border border-gray-300 rounded-md p-2 mb-6"
        />

        {questions.length > 0 && (
          <div className="space-y-4">
            {questions.map((q, i) => (
              <div 
                key={i} 
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-black mb-2">
                  Q{i + 1}: {q.question}
                </h3>
                <p className="text-gray-800">{q.answer}</p>
              </div>
            ))}
          </div>
        )}

        {questions.length === 0 && (
          <p className="text-gray-500 text-center mt-6">
            Upload a PDF to generate quiz questions.
          </p>
        )}
      </div>

    </div>
  )
}