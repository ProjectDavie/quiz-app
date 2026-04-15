"use client";

import { use, useEffect, useState } from "react";

export default function FlashcardsPage({ params }: any) {
  const { id } = use(params);

  const [doc, setDoc] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/documents/${id}`)
      .then((res) => res.json())
      .then((data) => setDoc(data.document));
  }, [id]);

  if (!doc) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8">

      <h1 className="text-2xl font-bold mb-6">
        {doc.title}
      </h1>

      {doc.flashcards.map((f: any, i: number) => (
        <div key={i} className="mb-4 border p-4 rounded-xl">
          <p className="font-semibold">{f.front}</p>
          <p className="text-gray-600">{f.back}</p>
        </div>
      ))}

    </div>
  );
}