"use client";
import { Input } from "@repo/ui/components/ui/input.tsx";
import { Label } from "@repo/ui/components/ui/label.tsx";
import { Textarea } from "@repo/ui/components/ui/textarea.tsx";
import { FormEvent, useState } from "react";
import { createGame } from "@/app/action";
import NextButton from "./next-button";
import { useRouter } from "next/navigation";

export default function NewGame() {
  const [formData, setFormData] = useState({ titles: "", pageOneContent: "" });
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createGame(formData);
    router.push("/game/builder");
  };

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">이야기</Label>
        <Input
          name="title"
          placeholder="이야기 이름"
          onChange={(e) => setFormData({ ...formData, titles: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <Label htmlFor="pageOneContent">이야기의 시작</Label>
        <Textarea
          placeholder="pageOneContent"
          rows={10}
          onChange={(e) =>
            setFormData({ ...formData, pageOneContent: e.target.value })
          }
        />
      </div>

      <div className="w-full flex">
        <NextButton />
      </div>
    </form>
  );
}
