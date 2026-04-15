"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const year = new Date().getFullYear();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // later: connect to backend auth
    router.push("/upload");
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT FORM PANEL */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 bg-white text-black">
        <div className="w-full max-w-sm space-y-8">

          <div className="text-center">
            <h1 className="text-3xl font-medium">Create account</h1>
            <p className="text-sm text-black/70">
              Sign up to start learning
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white rounded-md py-2 hover:opacity-90 transition"
            >
              Sign up
            </button>
          </form>

          <div className="text-center text-sm text-black/70">
            Already have an account?{" "}
            <a href="/sign-in" className="underline font-medium">
              Sign in
            </a>
          </div>

        </div>
      </div>

      {/* RIGHT INFO PANEL */}
      <div className="hidden md:flex w-1/2 h-screen bg-black text-white p-16 rounded-tl-[60px] rounded-bl-[60px] flex-col justify-between">
        <div>
          <h1 className="text-4xl font-semibold mb-6">
            Start Learning Smarter
          </h1>
          <p className="text-white/70 max-w-md leading-relaxed">
            Upload documents, generate quizzes, and turn notes into structured learning systems instantly.
          </p>
        </div>

        <p className="text-sm text-white/40">© {year} Notes Quiz App</p>
      </div>

    </div>
  );
}