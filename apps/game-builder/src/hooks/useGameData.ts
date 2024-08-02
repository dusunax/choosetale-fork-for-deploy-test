"use client";
import { useState } from "react";
import { NewGameBuild } from "@/interface/newGameData";
import type { ExtendsCreateGameResDto } from "@/interface/newGameData";
import type {
  ChoiceType,
  GameBuild,
  GameBuildType,
  PageType,
} from "@/interface/customType";

const tempIsEnding = false;

const setGameWithSource = (
  gameData: GameBuild,
  source: PageType["source"]
): GameBuildType => {
  const pagesWithTag = gameData.pages.map((page) => {
    const choicesWithTag = page.choices.map((choice) => ({
      ...choice,
      source,
    })) as ChoiceType[];

    return {
      ...page,
      choices: choicesWithTag,
      source,
      isEnding: tempIsEnding,
    } as PageType;
  });

  return {
    ...gameData,
    pages: pagesWithTag,
    source,
    description: "",
    isPrivate: false,
  } as GameBuildType;
};

export default function useGameData({
  createdGame,
  gameBuildData,
}: {
  createdGame: ExtendsCreateGameResDto | null;
  gameBuildData: GameBuild;
}) {
  const newGame: GameBuildType | null =
    createdGame && new NewGameBuild(createdGame);
  const game = setGameWithSource(gameBuildData, "server");
  const [gamePageList, setGamePageList] = useState(
    newGame?.pages ?? game.pages
  );

  const updateChoices = (pageId: number, updatedChoice: ChoiceType) => {
    setGamePageList((prevData: PageType[]) =>
      prevData.map((page) =>
        page.id === pageId
          ? {
              ...page,
              choices: page.choices.map((choice) =>
                choice.id === updatedChoice.id ? updatedChoice : choice
              ),
            }
          : page
      )
    );
  };

  const addChoice = (pageId: number, choice: ChoiceType) => {
    setGamePageList((prevData: PageType[]) =>
      prevData.map((page) =>
        page.id === pageId
          ? { ...page, choices: [...page.choices, choice] }
          : page
      )
    );
  };

  const deleteChoice = (pageId: number, choiceId: number) => {
    let toPageId: number | undefined;

    setGamePageList((prevData) =>
      prevData.map((page) => {
        if (page.id === pageId) {
          const updatedChoices = page.choices.filter((choice) => {
            if (choice.id === choiceId) {
              toPageId = choice.toPageId;
              return false;
            }
            return true;
          });

          return { ...page, choices: updatedChoices };
        }
        return page;
      })
    );

    if (toPageId !== undefined) deletePage(toPageId);
  };

  const addPage = ({ depth }: { depth: number }) => {
    // FIXME: api 요청하도록 변경 필요
    const newPageId = gamePageList.length + 1;
    const newPage: PageType = {
      id: newPageId,
      title: "",
      abridgement: "",
      description: "",
      createdAt: new Date().toISOString(),
      depth,
      choices: [],
      source: "client",
      isEnding: false,
    };

    setGamePageList((prevData: PageType[]) => [...prevData, newPage]);
  };

  const updatePage = (updatedPage: Partial<PageType>) => {
    setGamePageList((prevData) =>
      prevData.map((page) =>
        page.id === updatedPage.id ? { ...page, ...updatedPage } : page
      )
    );
  };

  const deletePage = (pageId: number) => {
    setGamePageList((prevData) => {
      const filteredPages = prevData.filter((page) => page.id !== pageId);

      return filteredPages.map((page) => ({
        ...page,
        choices: page.choices.filter(
          (choice: ChoiceType) => choice.toPageId !== pageId
        ),
      }));
    });
  };

  const switchPageIsEnding = (partialPage: Partial<PageType>) => {
    updatePage(partialPage);
  };

  return {
    gamePageList,
    addPage,
    updatePage,
    deletePage,
    addChoice,
    updateChoices,
    deleteChoice,
    switchPageIsEnding,
  };
}
