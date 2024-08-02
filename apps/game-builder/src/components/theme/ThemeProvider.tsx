"use client";
import type { ReactNode } from "react";
import { useThemeStore } from "@/store/useTheme";

export default function CSSThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { theme } = useThemeStore((state) => state);
  return (
    <div
      className={`theme-${theme} h-full w-full ${theme === "windows-98" ? "bg-[#c0c0c0] shadow-lg" : "bg-white"}`}
    >
      {children}
    </div>
  );
}
