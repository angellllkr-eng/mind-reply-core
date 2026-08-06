import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "GitHub + Python Profit Audit — MindReply",
  description:
    "A seven-day, evidence-backed GitHub and Python audit for security, delivery, and automation opportunities.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
