"use client";

import { ReactNode } from "react";
import Menu from "../../components/Sidebar";
import Navbar from "../../components/Header";
import { SidebarProvider } from "../../contexts/SidebarContext";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="h-screen w-screen flex bg-gray-100 overflow-hidden">
        {/* Sidebar */}
        <Menu />

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Navbar */}
          <Navbar />

          {/* Scrollable content area */}
          <main className="flex-1 overflow-y-auto bg-white p-4">
            <div className="w-full p-6 bg-white rounded-xl shadow">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}