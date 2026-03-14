"use client";

import { useSidebar } from "@/contexts/SidebarContext";

export default function Navbar() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="h-14 border-b flex items-center justify-between px-4 bg-white">

      <button
        onClick={toggleSidebar}
        className="text-xl font-bold"
      >
        ☰
      </button>

      <h1 className="font-semibold">
        Notes → Quiz
      </h1>

      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>

    </header>
  );
}