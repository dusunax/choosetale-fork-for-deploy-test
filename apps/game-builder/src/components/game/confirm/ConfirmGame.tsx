"use client";
import { useRouter } from "next/navigation";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { UpdateGameReqDto } from "@choosetale/nestia-type/lib/structures/UpdateGameReqDto";
import type { GameInfo } from "@/interface/customType";
import { updateGame } from "@/actions/game/updateGame";
import NextButton from "@components/button/SubmitButton";
import GameConfirmFields from "@/components/game/confirm/form/GameConfirmFields";

export default function ConirmGame({
  gameInfoData,
  gameId,
}: {
  gameInfoData: GameInfo;
  gameId: number;
}) {
  const router = useRouter();
  const useFormProps = useForm({ defaultValues: gameInfoData });
  const { handleSubmit, watch } = useFormProps;

  const onSubmit: SubmitHandler<GameInfo> = async (fieldValues) => {
    const { title, description, genre, isPrivate } = fieldValues;
    const payload: UpdateGameReqDto = {
      title,
      description,
      genre,
      isPrivate,
      thumbnailImageId: 0,
    };
    const res = await updateGame(payload, gameId);

    if (res.success) {
      router.push(`/?gameid=${gameId}`);
    } else {
      alert(res.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col py-0 gap-6"
    >
      <GameConfirmFields {...useFormProps} />

      <div className="w-full flex">
        <NextButton text={watch("isPrivate") ? "비공개 저장" : "퍼블리시"} />
      </div>
    </form>
  );
}
