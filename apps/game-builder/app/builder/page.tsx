import { Card } from "@repo/ui/components/ui/card.tsx";

export default function Page() {
  return (
    <div className="w-full px-10 mx-auto my-auto">
      <h2>제목</h2>
      <Card className="w-full min-h-24">카드</Card>
    </div>
  );
}
