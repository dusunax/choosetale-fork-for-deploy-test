"use client";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@repo/ui/components/ui/Drawer.tsx";
import ThemedButton from "@/components/theme/ui/ThemedButton";
import GameEditFields from "@/components/game/edit/form/GameEditFields";
import type { PageType } from "@/interface/customType";
import type useGameData from "@/hooks/useGameData";
import GameEditDrawTriggerButton from "./GameEditDrawTriggerButton";
import EndingPageSwitch from "./form/EndingPageSwitch";

interface GameEditDrawProps {
  theme?: string;
  page: PageType;
  updatePage: ReturnType<typeof useGameData>["updatePage"];
}
export interface GameEditFieldsType {
  abridgement: string;
  description: string;
}

export default function GameEditDraw({
  theme,
  page,
  updatePage,
}: GameEditDrawProps) {
  const [isOpen, setIsOpen] = useState(false);
  const useFormProps = useForm({ defaultValues: page });
  const { handleSubmit, reset, control } = useFormProps;

  const onSubmit: SubmitHandler<PageType> = (fieldValues) => {
    updatePage(fieldValues);
    setIsOpen(false);
  };

  const onClose = () => {
    reset();
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <GameEditDrawTriggerButton />

      <DrawerContent
        className={`h-[calc(100vh-3rem)] ${theme === "windows-98" ? "bg-[#c0c0c0]" : ""}`}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-xl h-full mx-auto px-6 flex flex-col gap-4"
        >
          <DrawerHeader className="!px-0 !pt-4 !pb-0">
            <DrawerTitle>이야기 수정하기</DrawerTitle>
            <DrawerDescription className="!mb-0">
              어떤 내용을 수정할까요?
            </DrawerDescription>
          </DrawerHeader>

          <GameEditFields {...useFormProps} />

          <EndingPageSwitch control={control} />

          <DrawerFooter className="flex flex-col !px-0 mb-6">
            <ThemedButton className="w-full is-success" type="submit">
              수정
            </ThemedButton>
            <DrawerClose
              onClick={onClose}
              className="w-full px-0 text-sm py-2 underline"
            >
              닫기
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
