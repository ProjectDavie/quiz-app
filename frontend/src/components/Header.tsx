"use client";

import { useSidebar } from "../contexts/SidebarContext";
import { Menu, Bell, User } from "lucide-react";

export default function Header() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white shadow-sm sticky top-0 z-40">
      {/* Left: Hamburger & App Name */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 p-2 rounded-lg transition duration-200"
          title="Toggle Sidebar"
        >
          <Menu size={24} />
        </button>

        <h1 className="text-xl font-bold text-slate-900">
          Notes → Quiz
        </h1>
      </div>

      {/* Right: Icons / User Avatar */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notification Icon */}
        <button className="p-2 rounded-lg hover:bg-slate-100 transition duration-200 text-slate-600 hover:text-slate-900" title="Notifications">
          <Bell size={20} />
        </button>

        {/* Profile Avatar */}
        <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center font-semibold text-white cursor-pointer hover:shadow-lg hover:ring-2 hover:ring-blue-300 transition duration-200">
          JD
        </div>
      </div>
    </header>
  );
}