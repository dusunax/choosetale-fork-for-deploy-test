import "./styles.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MobileWrapper from "@repo/ui/components/MobileWrapper.tsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChooseTale",
  description: "game page description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <MobileWrapper>
          <div className="h-full w-full">
            <div className="h-full flex flex-col bg-white">
              <div className="flex-1 overflow-y-scroll">
                <div className="w-full h-full flex flex-col">{children}</div>
              </div>
            </div>
          </div>
        </MobileWrapper>
      </body>
    </html>
  );
}
