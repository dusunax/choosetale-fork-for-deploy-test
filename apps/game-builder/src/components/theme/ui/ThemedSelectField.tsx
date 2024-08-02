import { forwardRef } from "react";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { InputProps } from "@repo/ui/components/ui/Input.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/Select.tsx";
import { useThemeStore } from "@/store/useTheme";
import type { GameInfo } from "@/interface/customType";
import { GENRES } from "@/interface/newGameData";
import ThemedLabel from "./ThemedLabel";

interface ThemedSelectFieldProps extends InputProps {
  labelText: string;
  name: keyof GameInfo;
  control: Control<GameInfo>;
}

const ThemedSelectField = forwardRef<HTMLSelectElement, ThemedSelectFieldProps>(
  ({ labelText, name, control, ...props }, ref) => {
    const { theme } = useThemeStore((state) => state);

    if (theme === "old-game" || theme === "windows-98") {
      return (
        <div className="flex flex-col gap-2">
          <ThemedLabel htmlFor={name} labelText={labelText} />
          <div className="nes-select">
            <Controller
              name={name}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <select
                  {...field}
                  id={name}
                  value={field.value ? String(field.value) : ""}
                  ref={ref}
                  required
                >
                  <option value="" disabled hidden>
                    {props.value}
                  </option>
                  {GENRES.map((genre) => (
                    <option value={genre} key={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-2">
        <ThemedLabel labelText={labelText} />
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              value={field.value ? String(field.value) : ""}
            >
              <SelectTrigger className="!text-xs !w-full bg-white">
                <SelectValue placeholder={props.value} />
              </SelectTrigger>
              <SelectContent>
                {GENRES.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
    );
  }
);

ThemedSelectField.displayName = "ThemedSelectField";

export default ThemedSelectField;
