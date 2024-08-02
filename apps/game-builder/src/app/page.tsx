"use client";
import Link from "next/link";
import ThemedButton from "@/components/theme/ui/ThemedButton";

export default function Page(): JSX.Element {
  return (
    <main className="flex-1 flex items-center justify-center">
      <Link href="/game/create">
        <ThemedButton>Game Builder</ThemedButton>
      </Link>
    </main>
  );
}
