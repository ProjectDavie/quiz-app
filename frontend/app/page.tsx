"use client"

import { useState } from "react"

export default function Home() {

  const [questions, setQuestions] = useState<any[]>([])

  async function uploadPDF(e:any) {

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
    <div style={{padding:40}}>

      <h1>PDF Quiz Generator</h1>

      <input type="file" accept="application/pdf" onChange={uploadPDF} />

      <hr />

      {questions.map((q,i)=>(
        <div key={i}>
          <h3>{q.question}</h3>
          <p>{q.answer}</p>
        </div>
      ))}

    </div>
  )
}