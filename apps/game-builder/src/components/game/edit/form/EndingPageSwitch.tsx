import React from "react";
import type { Control } from "react-hook-form";
import type { PageType } from "@/interface/customType";
import ThemedSwitch from "@/components/theme/ui/ThemedSwitch";

export default function EndingPageSwitch({
  control,
}: {
  control: Control<PageType>;
}) {
  return (
    <div className="flex gap-4 items-center">
      <p className="mb-0 text-sm font-bold">엔딩 페이지</p>
      <ThemedSwitch name="isEnding" control={control} />
    </div>
  );
}
