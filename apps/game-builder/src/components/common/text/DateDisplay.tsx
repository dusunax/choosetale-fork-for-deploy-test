import { format } from "date-fns";

export default function DateDisplay({
  date,
  formatStr = "yyyy-MM-dd",
}: {
  date: string;
  formatStr?: string;
}) {
  const formattedDate = format(new Date(date), formatStr);

  return <>{formattedDate}</>;
}
