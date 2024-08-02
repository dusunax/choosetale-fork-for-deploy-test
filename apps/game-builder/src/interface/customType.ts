import type { GetAllGameResDto } from "@choosetale/nestia-type/lib/structures/GetAllGameResDto";
import type { Choice } from "@choosetale/nestia-type/lib/structures/Choice";
import type { Page } from "@choosetale/nestia-type/lib/structures/Page";
import type { UpdateGameReqDto } from "@choosetale/nestia-type/lib/structures/UpdateGameReqDto";
import type { Genres } from "@choosetale/nestia-type/lib/structures/Genres";

export interface Thumbnail {
  id: number;
  url: string;
}

export interface GameInfo extends UpdateGameReqDto {
  id: number;
  title: string;
  description: string;
  isPrivate: boolean;
  genre: Genres;
  thumbnails: Thumbnail[];
  createdAt: string;
  counts: {
    pages: number;
    choices: number;
    ending: number;
  };
}
export type GameBuild = GetAllGameResDto;

interface BaseChoice extends Choice {
  title: string;
  description: string;
  source: "server" | "client";
}
interface BasePage extends Page {
  title: string;
  description: string;
  source: "server" | "client";
  choices: BaseChoice[];
  isEnding: boolean;
}

export type PageType = BasePage & { source: "server" | "client" };
export type ChoiceType = BaseChoice & { source: "server" | "client" };
export interface GameBuildType {
  id: number;
  title: string;
  pages: PageType[];
}
export interface GameType {
  id: number;
  title: string;
  description: string;
  isPrivate: boolean;
}

export interface LinkedPage {
  pageId: number;
  title: string;
  isEnding: boolean;
}
