"use client";

import { createContext, useContext, useState } from "react";

const SidebarContext = createContext<any>(null);

export function SidebarProvider({ children }: any) {
  const [collapsed, setCollapsed] = useState(false);

  function toggleSidebar() {
    setCollapsed(!collapsed);
  }

  return (
    <SidebarContext.Provider value={{ collapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}