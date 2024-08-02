import { notFound } from "next/navigation";
import ConfirmGame from "@/components/game/confirm/ConfirmGame";
import { getGameInfoById } from "@/actions/game/getGame";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const gameId = Number(id);
  const gameInfoResponse = await getGameInfoById(gameId);

  if (isNaN(gameId) || !gameInfoResponse.success) {
    notFound();
  }

  return (
    <div className="w-full px-12 pt-4 pb-10">
      <ConfirmGame gameId={gameId} gameInfoData={gameInfoResponse.gameInfo} />
    </div>
  );
}
