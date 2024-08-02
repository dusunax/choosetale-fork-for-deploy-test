import { create } from "zustand";
import type { ExtendsCreateGameResDto } from "@/interface/newGameData";

interface GameState {
  createdGame: ExtendsCreateGameResDto | null;
  setCreatedGame: (data: ExtendsCreateGameResDto) => void;
  clearCreatedGameData: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  createdGame: null,
  setCreatedGame: (data: ExtendsCreateGameResDto) => set({ createdGame: data }),
  clearCreatedGameData: () => set({ createdGame: null }),
}));
