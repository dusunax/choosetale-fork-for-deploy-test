"use client";
import type { ReactNode } from "react";
import BackButton from "@/components/button/BackButton";

export default function TopNav({
  title,
  hasBackButton = false,
  isSticky = true,
  children,
}: {
  title: string;
  hasBackButton?: boolean;
  isSticky?: boolean;
  children?: ReactNode;
}) {
  return (
    <div
      className={`w-full h-12 px-6 flex justify-between items-center bg-[rgba(255,255,255,0.75)] backdrop-blur-lg transition-all z-[15] ${isSticky ? "sticky top-0" : ""}`}
    >
      <div>{hasBackButton && <BackButton />}</div>
      <h4 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {title}
      </h4>
      <div>{children}</div>
    </div>
  );
}
