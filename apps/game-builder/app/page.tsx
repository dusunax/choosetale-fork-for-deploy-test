"use client";
import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button.tsx";

export default function Page(): JSX.Element {
  return (
    <main className="flex-1 flex items-center justify-center">
      <Link href="/game/create">
        <Button>Game Builder</Button>
      </Link>
    </main>
  );
}
