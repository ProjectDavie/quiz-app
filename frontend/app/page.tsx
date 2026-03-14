"use client"

import { useState } from "react"

export default function Home() {

  const [questions, setQuestions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  async function uploadPDF(e: any) {

    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append("pdf", file)

    setLoading(true)

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData
    })

    const data = await res.json()
    setQuestions(data.questions)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">

      <div className="w-full max-w-3xl">

        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          PDF Quiz Generator
        </h1>

        {/* Upload Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border">

          <label className="block text-gray-600 mb-3 font-medium">
            Upload a PDF to generate quiz questions
          </label>

          <input
            type="file"
            accept="application/pdf"
            onChange={uploadPDF}
            className="block w-full text-sm text-gray-600
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-600 file:text-white
            hover:file:bg-blue-700
            cursor-pointer"
          />

          {loading && (
            <p className="mt-4 text-blue-600 font-medium">
              Generating questions...
            </p>
          )}
        </div>

        {/* Questions */}
        <div className="space-y-6">

          {questions.map((q, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-xl p-6 border"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {q.question}
              </h3>

              <p className="text-gray-600">
                {q.answer}
              </p>
            </div>
          ))}

        </div>

      </div>

    </div>
  )
}