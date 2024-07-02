"use client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { DrawerTrigger } from "@repo/ui/components/ui/Drawer.tsx";
import { useThemeStore } from "@/store/useTheme";

export default function GameEditDrawTriggerButton() {
  const { theme } = useThemeStore((state) => state);

  return (
    <DrawerTrigger className="!absolute top-1 right-1 min-w-6 p-0 min-h-0 px-2 py-[2px]">
      {theme === "windows-98" ? "수정" : <Pencil2Icon className="h-4 w-4" />}
    </DrawerTrigger>
  );
}
