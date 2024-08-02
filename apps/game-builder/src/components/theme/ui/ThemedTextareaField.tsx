import { forwardRef } from "react";
import type { TextareaProps } from "@repo/ui/components/ui/Textarea.tsx";
import { Textarea } from "@repo/ui/components/ui/Textarea.tsx";
import { useThemeStore } from "@/store/useTheme";
import FieldErrorMessage from "@/components/common/form/FieldErrorMessage";
import ThemedLabel from "./ThemedLabel";

interface ThemedTextareaFieldProps extends TextareaProps {
  labelText: string;
  className?: string;
  errMsg?: string;
}

const ThemedTextareaField = forwardRef<
  HTMLTextAreaElement,
  ThemedTextareaFieldProps
>(({ labelText, className, errMsg, ...props }, ref) => {
  const { theme } = useThemeStore((state) => state);
  let themeClass;

  switch (theme) {
    case "old-game":
      themeClass = "nes-input";
      break;
    case "windows-98":
      themeClass = "rounded-none";
      break;
    default:
  }

  return (
    <div className="flex flex-col gap-2">
      <ThemedLabel htmlFor={props.name} labelText={labelText} />
      <Textarea
        ref={ref}
        {...props}
        className={`${className} ${themeClass} bg-white ${errMsg ? "border-red-500" : ""}`}
      />
      {errMsg && <FieldErrorMessage message={errMsg} />}
    </div>
  );
});

ThemedTextareaField.displayName = "ThemedTextareaField";

export default ThemedTextareaField;
