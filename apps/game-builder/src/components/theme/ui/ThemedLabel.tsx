import { Label } from "@repo/ui/components/ui/Label.tsx";
import { useThemeStore } from "@/store/useTheme";

interface ThemedInputFieldProps {
  labelText: string;
  htmlFor?: string;
  className?: string;
}

export default function ThemedLabel({
  labelText,
  htmlFor,
  className,
}: ThemedInputFieldProps) {
  const { theme } = useThemeStore((state) => state);
  let themeClass;

  switch (theme) {
    case "old-game":
      themeClass = "text-lg font-black";
      break;
    case "windows-98":
      themeClass = "font-bold";
      break;
    default:
  }

  return (
    <Label
      htmlFor={htmlFor}
      className={`mb-0 ml-[1px] ${className} ${themeClass}`}
    >
      {labelText}
    </Label>
  );
}
