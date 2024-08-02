import { ReaderIcon } from "@radix-ui/react-icons";
import { DrawerTrigger } from "@repo/ui/components/ui/Drawer.tsx";

export default function GameEditDrawTriggerButton({
  theme,
}: {
  theme?: string;
}) {
  return (
    <DrawerTrigger className="!absolute top-2 right-1 min-w-6 p-0 min-h-0 px-2 py-[2px]">
      {theme === "windows-98" ? "수정" : <ReaderIcon className="h-4 w-4" />}
    </DrawerTrigger>
  );
}
