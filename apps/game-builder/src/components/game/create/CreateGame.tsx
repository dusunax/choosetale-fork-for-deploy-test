"use client";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import type { CreateGameReqDto } from "@choosetale/nestia-type/lib/structures/CreateGameReqDto";
import type { ExtendsCreateGameResDto } from "@/interface/newGameData";
import { useGameStore } from "@/store/gameStore";
import { createGame } from "@/actions/game/createGame";
import NextButton from "@components/button/SubmitButton";
import GameCreateFields from "@/components/game/create/form/GameCreateFields";

export default function CreateGame() {
  const router = useRouter();
  const { setCreatedGame } = useGameStore();

  const useFormProps = useForm<CreateGameReqDto>();
  const { handleSubmit } = useFormProps;

  const onSubmit: SubmitHandler<CreateGameReqDto> = async (data) => {
    const res = await createGame(data);

    try {
      if (!res.success) throw new Error("게임 생성 실패");
      const gameId = res.gameInitData.id;
      if (!gameId) throw new Error("게임 생성 실패");

      router.push(`/game/builder/${gameId}`);
      setCreatedGame(res.gameInitData as ExtendsCreateGameResDto);
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full flex flex-col justify-center gap-6"
    >
      <GameCreateFields {...useFormProps} />

      <div className="w-full flex">
        <NextButton text="다음으로" />
      </div>
    </form>
  );
}
