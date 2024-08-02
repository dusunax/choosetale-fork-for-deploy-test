export default function TextWithCounts({
  text,
  counts,
  color,
}: {
  text: string;
  counts: number;
  color?: string;
}) {
  const displayCounts = counts > 99 ? "99+" : counts;

  return (
    <div className="flex gap-1 items-center">
      <span className="text-xs">{text}</span>
      <div
        className={`w-4 h-4 flex justify-center items-center rounded-full bg-green-400 text-white text-[10px] font-bold ${counts > 99 ? "px-4" : ""}`}
        style={{ color }}
      >
        {displayCounts}
      </div>
    </div>
  );
}
