"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSidebar } from "../contexts/SidebarContext";

import {
  LayoutGrid,
  Upload,
  Brain,
  BookOpen,
  Clock,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const { collapsed, toggleSidebar } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();

  function signOut() {
    localStorage.clear();
    router.push("/sign-in");
  }

  const isActive = (href: string) => {
    return pathname?.startsWith(href);
  };

  return (
    <aside
      className={`bg-slate-900 text-white transition-all duration-300 ease-in-out flex flex-col border-r border-slate-800 shadow-lg
      ${collapsed ? "w-20" : "w-64"} h-screen`}
    >
      {/* BRAND */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
        <span className={`font-bold tracking-wide text-lg transition-opacity ${collapsed ? "opacity-0 hidden" : "opacity-100"}`}>
          NQ
        </span>
        <button
          onClick={toggleSidebar}
          className="text-slate-400 hover:text-white transition-colors p-1"
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      {/* NAV */}
      <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
        <NavItem
          href="/projects"
          icon={<LayoutGrid size={20} />}
          label="Projects"
          collapsed={collapsed}
          isActive={isActive("/projects")}
        />

        <NavItem
          href="/upload"
          icon={<Upload size={20} />}
          label="Upload PDF"
          collapsed={collapsed}
          isActive={isActive("/upload")}
        />

        <NavItem
          href="/quiz"
          icon={<Brain size={20} />}
          label="Quiz"
          collapsed={collapsed}
          isActive={isActive("/quiz")}
        />

        <NavItem
          href="/flashcards"
          icon={<BookOpen size={20} />}
          label="Flashcards"
          collapsed={collapsed}
          isActive={isActive("/flashcards")}
        />

        <NavItem
          href="/history"
          icon={<Clock size={20} />}
          label="History"
          collapsed={collapsed}
          isActive={isActive("/history")}
        />
      </nav>

      {/* SIGN OUT */}
      <div className="p-3 border-t border-slate-800">
        <button
          onClick={signOut}
          className={`flex items-center gap-3 w-full p-3 rounded-lg text-red-300 hover:bg-red-600/20 hover:text-red-200 transition duration-200
          ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut size={20} />
          {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
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
  isActive,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition duration-200
      ${isActive
          ? "bg-blue-600 text-white shadow-md"
          : "text-slate-300 hover:text-white hover:bg-slate-800"
        } ${collapsed ? "justify-center" : ""}`}
    >
      <span className="flex-shrink-0">{icon}</span>
      {!collapsed && <span className="font-medium">{label}</span>}
    </Link>
  );
}