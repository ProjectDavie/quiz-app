"use client";

import Link from "next/link";
import { useSidebar } from "../contexts/SidebarContext";

export default function Menu() {
  const { collapsed } = useSidebar();

  return (
    <aside
      className={`h-full bg-gray-900 text-white transition-all duration-300
      ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* BRAND */}
      <div className="p-4 font-bold text-lg border-b border-gray-700">
        {collapsed ? "NQ" : "Notes → Quiz"}
      </div>

      <nav className="flex flex-col gap-2 p-2">

        {/* DASHBOARD / UPLOAD */}
        <Link
          href="/upload"
          className="p-3 rounded hover:bg-gray-800"
        >
          {collapsed ? "📤" : "Upload PDF"}
        </Link>

        {/* QUIZ */}
        <Link
          href="/quiz"
          className="p-3 rounded hover:bg-gray-800"
        >
          {collapsed ? "🧠" : "Quiz"}
        </Link>

        {/* FLASHCARDS */}
        <Link
          href="/flashcards"
          className="p-3 rounded hover:bg-gray-800"
        >
          {collapsed ? "📚" : "Flashcards"}
        </Link>

        {/* HISTORY (optional future) */}
        <Link
          href="/history"
          className="p-3 rounded hover:bg-gray-800"
        >
          {collapsed ? "🕓" : "History"}
        </Link>

      </nav>
    </aside>
  );
}