import type { CreateGameResDto } from "@choosetale/nestia-type/lib/structures/CreateGameResDto";
import type { PageType } from "./customType";

export const GENRES = [
  "FANTASY",
  "SCI_FI",
  "HORROR",
  "MYSTERY",
  "ROMANCE",
  "THRILLER",
  "HISTORICAL",
  "WESTERN",
  "DYSTOPIA",
  "SATIRE",
  "BIOGRAPHY",
  "AUTOBIOGRAPHY",
  "ESSAY",
  "DRAMA",
  "POETRY",
  "COMIC",
  "NON_FICTION",
  "FICTION",
  "OTHER",
] as const;

export type GenreType = (typeof GENRES)[number];
export interface ExtendsCreateGameResDto extends CreateGameResDto {
  page: {
    id: number;
    title: string;
    content: string;
    abridgement: string;
  };
  isPrivate: boolean;
}
export class NewGameBuild {
  id: number;
  title: string;
  pages: PageType[];
  isPrivate: boolean;
  description: string;

  constructor(props: ExtendsCreateGameResDto) {
    this.id = props.id;
    this.title = "";
    this.description = "";
    this.isPrivate = false;
    this.pages = [
      {
        ...props.page,
        id: props.page.id,
        description: props.page.content,
        createdAt: new Date().toISOString(),
        depth: 0,
        choices: [],
        source: "client",
        isEnding: false,
      },
    ];
  }
}
