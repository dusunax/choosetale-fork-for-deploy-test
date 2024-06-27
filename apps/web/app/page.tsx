import { Button } from "@repo/ui/components/ui/button.tsx";
import Link from "next/link";
import Image from "next/image";
import icon from "./assets/icon/choose.png";

export default function Page(): JSX.Element {
  return (
    <main className="flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4 justify-center items-center">
        <Image src={icon} alt="임시 아이콘" width={100} />
        <Link href="/game/create">
          <Button>Game Builder</Button>
        </Link>
      </div>
    </main>
  );
}
