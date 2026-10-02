import type { Metadata } from "next";
import "./globals.css";
import ToastProvider from "@/src/components/ui/ToastProvider";
// 💡 Note: Custom configuration logic structure template track path:
// client router context path check relative import -> import ToastProvider from "../components/ToastProvider" jodi typescript resolution override hoy!

export const metadata: Metadata = {
  title: "BiteFlow | Premium Multi-Tenant SaaS Restaurant Framework",
  description:
    "Next-gen dynamic restaurant cloud operations scale suite infrastructure node.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900">
        {/* Global Action Event Notifications Engine Injection */}
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
