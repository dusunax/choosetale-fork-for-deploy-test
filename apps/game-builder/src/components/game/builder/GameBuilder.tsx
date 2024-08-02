"use client";
import useGameData from "@/hooks/useGameData";
import { useGameStore } from "@/store/gameStore";
import type { GameBuild } from "@/interface/customType";
import GameBuilderContent from "./GameBuilderContent";

export default function GameBuilder({
  gameBuildData,
  gameId,
}: {
  gameBuildData: GameBuild;
  gameId: number;
}) {
  const { createdGame } = useGameStore((state) => state);
  const useGameDataProps = useGameData({
    createdGame,
    gameBuildData,
  });

  return <GameBuilderContent {...useGameDataProps} gameId={gameId} />;
}
