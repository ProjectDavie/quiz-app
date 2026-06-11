"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader, CheckCircle, AlertCircle } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://192.168.100.55:8000";

export default function UploadArea() {
  const [msg, setMsg] = useState("");
  const [uploading, setUploading] = useState(false);
  const [msgType, setMsgType] = useState<"success" | "error" | "">("");
  const [dragActive, setDragActive] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(file: File) {
    if (!file.name.endsWith(".pdf")) {
      setMsgType("error");
      setMsg("❌ Please upload a PDF file");
      return;
    }

    setUploading(true);
    setMsgType("");
    setMsg("");

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch(`${API}/upload`, {
        method: "POST",
        body: form,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();

      if (data.documentId) {
        setMsgType("success");
        setMsg(`✅ Uploaded successfully! Redirecting...`);

        // Redirect to history page after 1 second
        setTimeout(() => {
          router.push(`/history/${data.documentId}`);
        }, 1000);
      } else {
        setMsgType("error");
        setMsg("❌ Upload error: No document ID returned");
      }
    } catch (err) {
      setMsgType("error");
      setMsg(`❌ Error: ${err instanceof Error ? err.message : "Unknown error"}`);
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  }

  function handleDrag(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleUpload(file);
    }
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-12 text-center transition duration-200 cursor-pointer
        ${dragActive
            ? "border-blue-500 bg-blue-50"
            : "border-slate-300 bg-slate-50 hover:border-slate-400 hover:bg-slate-100"
          } ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
          aria-label="Upload PDF"
        />

        {uploading ? (
          <div className="space-y-2">
            <div className="flex justify-center">
              <Loader className="animate-spin text-blue-600" size={40} />
            </div>
            <p className="text-slate-700 font-semibold">Uploading...</p>
            <p className="text-slate-500 text-sm">Please wait while your file is being processed</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-center">
              <Upload className="text-slate-400" size={48} />
            </div>
            <p className="text-slate-900 font-semibold text-lg">
              Click to upload or drag and drop
            </p>
            <p className="text-slate-500 text-sm">
              PDF files only • Max 50MB
            </p>
          </div>
        )}
      </div>

      {/* Status Message */}
      {msg && (
        <div
          className={`rounded-lg p-4 flex items-start gap-3 ${msgType === "success"
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
            }`}
        >
          {msgType === "success" ? (
            <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
          ) : (
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
          )}
          <p
            className={`text-sm font-medium ${msgType === "success" ? "text-green-700" : "text-red-700"
              }`}
          >
            {msg}
          </p>
        </div>
      )}
    </div>
  );
}

