"use client";
import { useState } from "react";
import Image from "next/image";
import robotIcon from "@asset/icon/robot-solid.svg";
import ThemedIconButton from "@/components/theme/ui/ThemedIconButton";

interface ImageGenerateProps {
  onGenerate: (url: string) => void;
}

export default function ImageGenerate({ onGenerate }: ImageGenerateProps) {
  const [loading, setLoading] = useState(false);

  const onClick = () => {
    setLoading(true);

    const randNum = Math.floor(Math.random() * 10);
    const tempUrl = `https://picsum.photos/600/40${randNum}`;

    onGenerate(tempUrl);
    setLoading(false);
  };

  return (
    <ThemedIconButton onClick={onClick} disabled={loading}>
      <Image
        className={`h-5 w-5 m-1 -translate-y-[2px] ${loading ? "animate-pulse" : ""}`}
        src={robotIcon}
        alt="AI generate image"
      />
    </ThemedIconButton>
  );
}
