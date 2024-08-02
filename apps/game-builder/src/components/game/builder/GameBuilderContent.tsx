"use client";
import useClientChoices from "@/hooks/useClientChoices";
import type useGameData from "@/hooks/useGameData";
import type { ChoiceType } from "@/interface/customType";
import ChoiceCard from "@/components/card/choice/ChoiceCard";
import PageCard from "@components/card/page/PageCard";
import GameSubmitButton from "@/components/button/GameSubmitButton";
import UnLinkedPages from "./UnLinkedPages";
import StoryLine from "./StoryLine";

interface GameBuilderContentProps extends ReturnType<typeof useGameData> {
  gameId: number;
}

export default function GameBuilderContent({
  gameId,
  ...useGameDataProps
}: GameBuilderContentProps) {
  const { gamePageList, deleteChoice, updatePage, updateChoices, deletePage } =
    useGameDataProps;
  const {
    clientChoicesMap,
    addClientChoice,
    removeClientChoice,
    addAiChoice,
    updateClientChoice,
    isGenerating,
  } = useClientChoices({
    gamePageList,
  });

  const handleAddChoice = (pageId: number) => {
    addClientChoice(pageId);
  };
  const handleAddChoiceByAI = (pageId: number) => {
    addAiChoice({ gameId, pageId });
  };
  const handleFixChoice = (pageId: number, choice: ChoiceType) => {
    if (choice.source === "server") updateChoices(pageId, choice);
    if (choice.source === "client") updateClientChoice(pageId, choice);
  };
  const handleDeleteChoice = (pageId: number, choice: ChoiceType) => {
    if (choice.source === "server") deleteChoice(pageId, choice.id);
    if (choice.source === "client") removeClientChoice(pageId, choice.id);
  };
  const handleDeletePage = (pageId: number) => {
    if (confirm("페이지를 삭제하면 페이지의 선택지가 함께 삭제됩니다."))
      deletePage(pageId);
  };

  const availablePages = gamePageList.map((page) => ({
    pageId: page.id,
    title: page.abridgement,
    isEnding: page.isEnding,
  }));
  const getLinkedPage = (toPageId: number) =>
    availablePages.find((p) => p.pageId === toPageId);

  return (
    <div className="flex-1 relative px-6">
      <div className="pl-6">
        <UnLinkedPages
          gamePageList={gamePageList}
          updatePage={updatePage}
          handleDeletePage={handleDeletePage}
        />
      </div>

      <div className="flex">
        <div>
          <StoryLine />
          <GameSubmitButton />
        </div>

        <div className="flex-1 pb-28">
          {gamePageList.map((page) => {
            if (page.depth < 0) return;
            const choices = page.choices as ChoiceType[];
            const clientChoice = clientChoicesMap.get(page.id) as
              | ChoiceType[]
              | undefined;

            return (
              <div key={`page${page.id}`} className="flex flex-col">
                <PageCard
                  page={page}
                  choicesLength={
                    page.choices.length + (clientChoice?.length ?? 0)
                  }
                  addChoice={() => handleAddChoice(page.id)}
                  addAIChoice={() => handleAddChoiceByAI(page.id)}
                  updatePage={updatePage}
                  deletePage={() => handleDeletePage(page.id)}
                  isGenerating={isGenerating}
                />
                {[...choices, ...(clientChoice ? clientChoice : [])].map(
                  (choice) => {
                    return (
                      <ChoiceCard
                        key={`${choice.source}-page${page.id}-choice${choice.id}`}
                        choice={choice}
                        defaultFixed={choice.source === "server"}
                        fixChoice={(partialChoice) =>
                          handleFixChoice(page.id, partialChoice)
                        }
                        removeChoice={() => handleDeleteChoice(page.id, choice)}
                        availablePages={availablePages}
                        linkedPage={getLinkedPage(choice.toPageId)}
                      />
                    );
                  }
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
