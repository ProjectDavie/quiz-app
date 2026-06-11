import "./globals.css";
import { SidebarProvider } from "../../src/contexts/SidebarContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <SidebarProvider>{children}</SidebarProvider>
      </body>
    </html>
  );
}