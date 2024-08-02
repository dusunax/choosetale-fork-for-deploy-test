import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useThemeStore } from "@/store/useTheme";

interface ComponentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  themeClass?: string;
}

export default function ThemedIconButton({
  children,
  className,
  themeClass: parentThemeClass,
  ...props
}: ComponentProps) {
  const { theme } = useThemeStore((state) => state);
  let themeClass;

  switch (theme) {
    case "old-game":
      themeClass = "nes-btn !absolute !m-0";
      break;
    case "windows-98":
      themeClass = "rounded-none";
      break;
    default:
  }

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        className={`absolute w-full h-full min-w-0 left-0 outline-none ${themeClass} ${parentThemeClass}`}
        {...props}
      />
      <div className="relative p-1 pointer-events-none">{children}</div>
    </div>
  );
}
