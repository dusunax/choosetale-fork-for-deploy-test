import type { ReactNode } from "react";
import TopNav from "@/components/common/partial/TopNav";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <TopNav title="새 게임" />
      {children}
    </>
  );
}
