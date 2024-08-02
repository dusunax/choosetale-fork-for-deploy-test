"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  CheckIcon,
  Cross2Icon,
  Link2Icon,
  LockOpen2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { CardContent, CardFooter } from "@repo/ui/components/ui/Card.tsx";
import type { ChoiceType, LinkedPage } from "@/interface/customType";
import ThemedCard from "@themed/ThemedCard";
import ThemedIconButton from "@themed/ThemedIconButton";
import ThemedInputField from "@/components/theme/ui/ThemedInputField";
import ThemedTextareaField from "@/components/theme/ui/ThemedTextareaField";
import DotIndicator from "./DotIndicator";
import { StaticChoice } from "./StaticChoice";

interface PageCardProps {
  choice: ChoiceType;
  defaultFixed: boolean;
  fixChoice: (partialChoice: ChoiceType) => void;
  removeChoice: () => void;
  availablePages: LinkedPage[];
  linkedPage: LinkedPage | undefined;
}

export default function ChoiceCard({
  choice,
  defaultFixed,
  fixChoice,
  removeChoice,
  availablePages,
  linkedPage,
}: PageCardProps) {
  const [isFixed, setIsFixed] = useState(defaultFixed);
  const isSavedChoice = defaultFixed;

  const defaultValues = {
    ...choice,
    title: choice.title,
    description: choice.description,
  };
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm({ defaultValues });

  const onSubmit = (formData: typeof defaultValues) => {
    const newChoice = {
      ...formData,
      toPageId: Number(formData.toPageId),
    };

    fixChoice(newChoice);
    setIsFixed(!isFixed);
  };

  const handleRemove = () => {
    if (confirm("선택지를 삭제 하시겠습니까?")) removeChoice();
  };
  const handleEdit = () => {
    setIsFixed(false);
  };
  const handleCancel = () => {
    setIsFixed(true);
    reset(choice);
  };

  if (isFixed) {
    return (
      <StaticChoice
        {...getValues()}
        removeChoice={handleRemove}
        editChoice={handleEdit}
        linkedPage={linkedPage}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-4">
      <ThemedCard className="relative min-h-24 !ml-12" isChoice>
        <DotIndicator isChoosen={isFixed} />

        <div className="flex-1">
          <CardContent className="py-2 !pb-3 px-4 sm:p-6 h-full flex flex-col justify-center">
            <ThemedInputField
              placeholder="선택지 제목"
              labelText=""
              {...register("title", { required: true })}
              className={`${errors.title ? "border-red-500" : ""}`}
            />
            <ThemedTextareaField
              placeholder="선택지 내용"
              labelText=""
              rows={2}
              {...register("description", { required: true })}
              className={`${errors.description ? "border-red-500" : ""}`}
            />

            <div className="flex items-center gap-2 justify-end mt-2">
              <Link2Icon className="h-5 w-5" />
              <select
                {...register("toPageId", { required: true })}
                className={`p-2 shadow-sm border rounded-sm text-xs w-full ${errors.toPageId ? "border-red-500" : ""}`}
              >
                {availablePages.map((page) => (
                  <option key={page.pageId} value={page.pageId}>
                    {page.title}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </div>

        <CardFooter className="flex flex-col justify-end items-center p-0 pr-4 py-4 gap-2">
          {isSavedChoice && (
            <ThemedIconButton
              type="submit"
              className="!absolute top-1 right-1 min-w-6 p-0 min-h-0 px-2 py-[2px]"
            >
              <LockOpen2Icon className="h-4 w-4" />
            </ThemedIconButton>
          )}
          {!isSavedChoice && (
            <ThemedIconButton
              type="submit"
              className="!absolute top-1 right-1 min-w-6 p-0 min-h-0 px-2 py-[2px]"
            >
              <CheckIcon className="h-6 w-6" />
            </ThemedIconButton>
          )}
          {isSavedChoice && (
            <ThemedIconButton onClick={handleCancel}>
              <Cross2Icon className="h-6 w-6" />
            </ThemedIconButton>
          )}

          <ThemedIconButton onClick={handleRemove}>
            <TrashIcon className="h-5 w-5 m-[1px]" />
          </ThemedIconButton>
        </CardFooter>
      </ThemedCard>
    </form>
  );
}
