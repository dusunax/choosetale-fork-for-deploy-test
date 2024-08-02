import { Link1Icon } from "@radix-ui/react-icons";
import type { LinkedPage } from "@/interface/customType";

export default function LinkedPageIndicator({
  linkedPage,
  onClick,
}: {
  linkedPage: LinkedPage;
  onClick: () => void;
}) {
  return (
    <button
      className={`w-full absolute -bottom-1 translate-y-full rounded-lg shadow-sm border border-green-500 text-card-foreground cursor-pointer hover:shadow-md transition ${linkedPage.isEnding ? "!bg-green-100" : ""}`}
      onClick={onClick}
      type="button"
    >
      <div className="flex items-center px-2 py-1">
        <Link1Icon className="h-4 w-4" color="#24c45d" />
        <p className="px-1 text-xs text-green-500 overflow-hidden whitespace-nowrap overflow-ellipsis">
          {linkedPage?.title}
        </p>
      </div>
    </button>
  );
}
