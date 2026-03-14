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
      <div className="h-screen w-screen flex bg-white overflow-hidden">

        <Menu />

        <div className="flex-1 flex flex-col h-full overflow-hidden">

          <Navbar />

          <main className="flex-1 overflow-y-auto bg-white">
            <div className="w-full p-4">
              {children}
            </div>
          </main>

        </div>

      </div>
    </SidebarProvider>
  );
}