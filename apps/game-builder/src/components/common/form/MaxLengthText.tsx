import { formatNumberWithCommas } from "@/utils/formatNumberWithCommas";

interface MaxLengthTextProps {
  contentLength: number;
  maxLength: number;
  isLessThan: boolean;
  className?: string;
}

export default function MaxLengthText({
  contentLength,
  maxLength,
  isLessThan,
  className,
}: MaxLengthTextProps) {
  return (
    <div>
      <p
        className={`relative h-0 px-1 text-xs text-right ${
          isLessThan ? "text-red-500 border-red-500" : ""
        } ${className}`}
      >
        {formatNumberWithCommas(contentLength)} /{" "}
        {formatNumberWithCommas(maxLength)}
      </p>
    </div>
  );
}

export function setMaxLengthOptions(
  contentLength: number,
  maxLength: number,
  lessThan: number
) {
  return {
    contentLength,
    maxLength,
    isLessThan: maxLength - contentLength < lessThan,
  };
}
