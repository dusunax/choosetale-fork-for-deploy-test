"use client";
import type { UseFormReturn } from "react-hook-form";
import type { CreateGameReqDto } from "@choosetale/nestia-type/lib/structures/CreateGameReqDto";
import ThemedInputField from "@themed/ThemedInputField";
import ThemedTextareaField from "@themed/ThemedTextareaField";
import { formatNumberWithCommas } from "@/utils/formatNumberWithCommas";

type GameFieldsProps = UseFormReturn<CreateGameReqDto>;
const MAX_LENGTH = {
  title: 30,
  pageOneContent: 2000,
} as const;

export default function GameCreateFields({ ...useFormProps }: GameFieldsProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormProps;

  const titleLen = watch("title")?.length || 0;
  const titleLenString = formatNumberWithCommas(titleLen);
  const lessThan3LeftForTitle = MAX_LENGTH.title - titleLen < 3;

  const pageContentLen = watch("pageOneContent")?.length || 0;
  const pageContentLenString = formatNumberWithCommas(pageContentLen);
  const lessThan20LeftForPageContent =
    MAX_LENGTH.pageOneContent - pageContentLen < 20;

  return (
    <>
      <div>
        <p
          className={`relative h-0 top-7 px-1 text-xs text-right ${
            lessThan3LeftForTitle ? "text-red-500" : ""
          }`}
        >
          {titleLenString} / {MAX_LENGTH.title}
        </p>
      </div>
      <ThemedInputField
        labelText="게임"
        placeholder="게임 이름 (1~30)"
        maxLength={MAX_LENGTH.title}
        {...register("title", {
          required: "게임의 이름을 입력해주세요",
          maxLength: {
            value: MAX_LENGTH.title,
            message: "게임 이름을 30자 내로 입력해주세요",
          },
        })}
        errMsg={errors.title?.message ?? ""}
        className={lessThan3LeftForTitle ? "text-red-500 border-red-500" : ""}
      />

      <div>
        <p
          className={`relative h-0 top-6 px-1 text-xs text-right ${
            lessThan20LeftForPageContent ? "text-red-500 border-red-500" : ""
          }`}
        >
          {pageContentLenString} /{" "}
          {formatNumberWithCommas(MAX_LENGTH.pageOneContent)}
        </p>
      </div>
      <ThemedTextareaField
        labelText="이야기의 시작"
        placeholder="첫 페이지의 내용 (2,000자 이내)"
        rows={12}
        maxLength={MAX_LENGTH.pageOneContent}
        {...register("pageOneContent", {
          required: "첫 페이지의 내용을 작성해주세요",
          maxLength: {
            value: MAX_LENGTH.pageOneContent,
            message: "2,000자 내로 입력해주세요",
          },
        })}
        errMsg={errors.pageOneContent?.message}
        className={lessThan20LeftForPageContent ? "text-red-500" : ""}
      />
    </>
  );
}
