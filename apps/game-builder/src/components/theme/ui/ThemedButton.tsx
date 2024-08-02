import type { ReactNode } from "react";
import type { ButtonProps } from "@repo/ui/components/ui/Button.tsx";
import { Button } from "@repo/ui/components/ui/Button.tsx";
import { useThemeStore } from "@/store/useTheme";

interface ThemedButtonProps extends ButtonProps {
  children: ReactNode;
  className?: string;
}

export default function ThemedButton({
  children,
  className,
  ...props
}: ThemedButtonProps) {
  const { theme } = useThemeStore((state) => state);
  const themeClass = theme === "old-game" ? "nes-btn" : "";

  if (theme === "windows-98") {
    return (
      <button type="button" className={`py-2 px-4 text-lg ${className}`}>
        {children}
      </button>
    );
  }

  return (
    <Button
      type="button"
      className={`${className} ${themeClass} !leading-4`}
      {...props}
    >
      {children}
    </Button>
  );
}
