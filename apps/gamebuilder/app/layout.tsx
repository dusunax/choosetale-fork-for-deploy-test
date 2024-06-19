import "./styles.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MobileWrapper from "@repo/ui/components/mobile-wrapper.tsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChooseTale",
  description: "이야기 만들기",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MobileWrapper>{children}</MobileWrapper>
      </body>
    </html>
  );
}
