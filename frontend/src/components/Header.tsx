"use client";

import { useSidebar } from "../contexts/SidebarContext";

export default function Navbar() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white shadow-sm sticky top-0 z-50">
      {/* Left: Hamburger & App Name */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-2xl font-bold p-2 rounded hover:bg-gray-100 transition"
        >
          ☰
        </button>

        <h1 className="text-xl font-semibold text-gray-800">
          Notes → Quiz
        </h1>
      </div>

      {/* Right: Icons / User Avatar */}
      <div className="flex items-center gap-4">
        {/* Notification Icon */}
        <button className="p-2 rounded hover:bg-gray-100 transition">
          🔔
        </button>

        {/* Profile Avatar */}
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-semibold text-gray-700 cursor-pointer hover:ring-2 hover:ring-blue-500 transition">
          JD
        </div>
      </div>
    </header>
  );
}