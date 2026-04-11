"use client";

import { useState } from "react";

export default function UploadArea() {
  const [loading, setLoading] = useState(false);

  async function uploadPDF(e: any) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("pdf", file);

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    console.log("UPLOAD RESPONSE:", data);

    if (data.documentId) {
      localStorage.setItem("documentId", data.documentId);
    }

    setLoading(false);
  }

  return (
    <div className="p-6 border rounded-xl bg-white">
      <input type="file" accept="application/pdf" onChange={uploadPDF} />
      {loading && <p>Uploading...</p>}
    </div>
  );
}