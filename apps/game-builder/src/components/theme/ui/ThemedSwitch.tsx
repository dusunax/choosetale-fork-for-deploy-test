import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Switch } from "@repo/ui/components/ui/Switch.tsx";
import { useThemeStore } from "@/store/useTheme";

interface SwitchProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
}

export default function ThemedSwitch<T extends FieldValues>({
  name,
  control,
}: SwitchProps<T>) {
  const { theme } = useThemeStore((state) => state);

  if (theme === "windows-98") {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <div>
              <input
                type="radio"
                id={`${name}-true`}
                {...field}
                value="true"
                checked={field.value === "true"}
                onChange={() => field.onChange("true")}
              />
              <label htmlFor={`${name}-true`}>네</label>
            </div>

            <div>
              <input
                type="radio"
                id={`${name}-false`}
                {...field}
                value="false"
                checked={field.value === "false"}
                onChange={() => field.onChange("false")}
              />
              <label htmlFor={`${name}-false`}>아니오</label>
            </div>
          </>
        )}
      />
    );
  }

  if (theme === "old-game") {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <label className="text-sm font-bold mb-0">
              <input
                type="radio"
                className="nes-radio"
                {...field}
                value="true"
                checked={field.value === "true"}
                onChange={() => field.onChange("true")}
              />
              <span>네</span>
            </label>

            <label className="text-sm font-bold mb-0">
              <input
                type="radio"
                className="nes-radio"
                {...field}
                value="false"
                checked={field.value === "false"}
                onChange={() => field.onChange("false")}
              />
              <span>아니오</span>
            </label>
          </>
        )}
      />
    );
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Switch
          checked={Boolean(field.value)}
          onCheckedChange={field.onChange}
        />
      )}
    />
  );
}
