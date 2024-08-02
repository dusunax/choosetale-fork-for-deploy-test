"use client";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import ThemedIconButton from "@themed/ThemedIconButton";

export default function BackButton() {
  const router = useRouter();

  return (
    <ThemedIconButton className="my-1" onClick={() => router.back()}>
      <ArrowLeftIcon className="h-5 w-5 m-1" />
    </ThemedIconButton>
  );
}
