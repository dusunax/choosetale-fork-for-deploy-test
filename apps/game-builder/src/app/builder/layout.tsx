import type { ReactNode } from "react";
import TopNav from "@/components/common/partial/TopNav";
import { NextButton } from "@/components/button/NextButton";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <TopNav title="새 게임" isSticky={false}>
        <NextButton nextTo="/game/confirm" options={{ withParamsId: true }} />
      </TopNav>
      {children}
    </>
  );
}
