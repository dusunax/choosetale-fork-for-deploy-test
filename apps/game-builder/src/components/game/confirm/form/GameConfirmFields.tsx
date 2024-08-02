import type { useForm } from "react-hook-form";
import { InfoCircledIcon, Pencil1Icon } from "@radix-ui/react-icons";
import ThemedInputField from "@themed/ThemedInputField";
import ThemedTextareaField from "@themed/ThemedTextareaField";
import ThemedSwitch from "@themed/ThemedSwitch";
import ThemedSelectField from "@themed/ThemedSelectField";
import type { GameInfo } from "@/interface/customType";
import { formatNumberWithCommas } from "@/utils/formatNumberWithCommas";
import MaxLengthText, {
  setMaxLengthOptions,
} from "@/components/common/form/MaxLengthText";
import TextWithCounts from "@/components/common/text/TextWithCounts";
import DateDisplay from "@/components/common/text/DateDisplay";
import Thumbnails from "./Thumbnails";

const MAX_LENGTH = {
  title: 50,
  description: 2000,
} as const;

export default function GameConfirmFields({
  ...useFormProps
}: ReturnType<typeof useForm<GameInfo>>) {
  const {
    register,
    formState: { errors },
    watch,
    getValues,
    control,
  } = useFormProps;

  const titleContentLen = watch("title").length || 0;
  const titleMaxLengthOptions = setMaxLengthOptions(
    titleContentLen,
    MAX_LENGTH.title,
    20
  );

  const descriptioContentLen = watch("description").length || 0;
  const descriptionMaxLengthOptions = setMaxLengthOptions(
    descriptioContentLen,
    MAX_LENGTH.description,
    20
  );

  return (
    <>
      <MaxLengthText {...titleMaxLengthOptions} className="top-7" />
      <ThemedInputField
        labelText="제목"
        placeholder="게임의 제목을 입력하세요"
        maxLength={MAX_LENGTH.title}
        {...register("title", {
          required: "게임의 제목을 입력해주세요",
          maxLength: {
            value: MAX_LENGTH.title,
            message: `제목을 ${MAX_LENGTH.title}자 내로 입력해주세요`,
          },
        })}
        autoComplete="off"
        errMsg={errors.title?.message ?? ""}
      />

      <Thumbnails {...useFormProps} />

      <ThemedSelectField name="genre" labelText="게임 장르" control={control} />

      <MaxLengthText {...descriptionMaxLengthOptions} className="top-6" />
      <ThemedTextareaField
        labelText="게임 소개"
        placeholder={`게임을 소개해주세요 (${formatNumberWithCommas(MAX_LENGTH.description)}자 내)`}
        rows={6}
        {...register("description", {
          required: "내용을 입력해주세요",
          maxLength: {
            value: MAX_LENGTH.description,
            message: `게임 소개를 ${formatNumberWithCommas(MAX_LENGTH.description)}자 내로 입력해주세요`,
          },
        })}
        autoComplete="off"
        errMsg={errors.description?.message ?? ""}
      />

      <div className="flex flex-col sm:!flex-row gap-2">
        <div className="flex gap-2 items-center">
          <p className="mb-0 text-xs">게임을 비공개로 올릴까요?</p>
          <ThemedSwitch name="isPrivate" control={control} />
        </div>

        <div className="flex flex-col gap-1 flex-1 items-end min-w-[230px]">
          <div className="text-xs flex items-center gap-2" title="작성 날짜">
            <Pencil1Icon color="#28c362" />
            <DateDisplay date={getValues("createdAt")} />
          </div>

          <div className="flex gap-2 flex-wrap" title="게임 상세">
            <InfoCircledIcon color="#28c362" />
            <TextWithCounts
              text="페이지 수"
              counts={getValues("counts.pages")}
            />
            <TextWithCounts
              text="선택지 수"
              counts={getValues("counts.choices")}
            />
            <TextWithCounts
              text="엔딩 수"
              counts={getValues("counts.ending")}
            />
          </div>
        </div>
      </div>
    </>
  );
}
