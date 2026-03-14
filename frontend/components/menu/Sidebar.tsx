"use client";

import Link from "next/link";
import { useSidebar } from "@/contexts/SidebarContext";

export default function Menu() {
  const { collapsed } = useSidebar();

  return (
    <aside
      className={`h-full bg-gray-900 text-white transition-all duration-300
      ${collapsed ? "w-20" : "w-64"}`}
    >
      <div className="p-4 font-bold text-lg border-b border-gray-700">
        {collapsed ? "NQ" : "Notes → Quiz"}
      </div>

      <nav className="flex flex-col gap-2 p-2">

        <Link
          href="/"
          className="p-3 rounded hover:bg-gray-800"
        >
          {collapsed ? "🏠" : "Dashboard"}
        </Link>

        <Link
          href="/quiz"
          className="p-3 rounded hover:bg-gray-800"
        >
          {collapsed ? "🧠" : "Generate Quiz"}
        </Link>

        <Link
          href="/flashcards"
          className="p-3 rounded hover:bg-gray-800"
        >
          {collapsed ? "📚" : "Flashcards"}
        </Link>

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