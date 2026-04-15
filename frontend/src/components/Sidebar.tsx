"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSidebar } from "../contexts/SidebarContext";

import {
  LayoutGrid,
  Upload,
  Brain,
  BookOpen,
  Clock,
  LogOut,
} from "lucide-react";

export default function Menu() {
  const { collapsed } = useSidebar();
  const router = useRouter();

  function signOut() {
    // clear session if you add auth later
    localStorage.clear();
    router.push("/sign-in");
  }

  return (
    <aside
      className={`h-full bg-[#0f172a] text-white border-r border-gray-800 transition-all duration-300 flex flex-col
      ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* BRAND */}
      <div className="h-16 flex items-center px-4 border-b border-gray-800">
        <span className="font-semibold text-sm tracking-wide">
          {collapsed ? "NQ" : "Notes → Quiz"}
        </span>
      </div>

      {/* NAV */}
      <nav className="flex-1 p-2 space-y-1">

        <NavItem
          href="/projects"
          icon={<LayoutGrid size={18} />}
          label="Projects"
          collapsed={collapsed}
        />

        <NavItem
          href="/upload"
          icon={<Upload size={18} />}
          label="Upload PDF"
          collapsed={collapsed}
        />

        <NavItem
          href="/quiz"
          icon={<Brain size={18} />}
          label="Quiz"
          collapsed={collapsed}
        />

        <NavItem
          href="/flashcards"
          icon={<BookOpen size={18} />}
          label="Flashcards"
          collapsed={collapsed}
        />

        <NavItem
          href="/history"
          icon={<Clock size={18} />}
          label="History"
          collapsed={collapsed}
        />
      </nav>

      {/* SIGN OUT */}
      <div className="p-2 border-t border-gray-800">
        <button
          onClick={signOut}
          className="flex items-center gap-3 w-full p-3 rounded-lg text-red-400 hover:bg-red-500/10 transition"
        >
          <LogOut size={18} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}

/* ========================
   NAV ITEM COMPONENT
======================== */
function NavItem({
  href,
  icon,
  label,
  collapsed,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition"
    >
      <span className="text-gray-400">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}