"use client";

import "./globals.css";

import { WagmiConfig } from "wagmi";
import { config } from "@/wagmi";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`h-full`} suppressHydrationWarning>
        <div className="flex flex-col justify-space items-center bg-green-100 h-full">
          <WagmiConfig config={config}>{children}</WagmiConfig>
        </div>
      </body>
    </html>
  );
}
