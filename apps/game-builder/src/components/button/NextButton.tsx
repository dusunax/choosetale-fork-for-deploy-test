"use client";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ThemedIconButton from "@themed/ThemedIconButton";

// const
export function NextButton({
  nextTo,
  options,
}: {
  nextTo: string;
  options?: {
    searchParams?: Record<string, boolean>;
    withParamsId?: boolean;
  };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  let queryString = "";

  if (options?.searchParams) {
    for (const key in options.searchParams) {
      const match = searchParams.get(key);
      if (match !== null) {
        if (queryString === "") queryString = "?";
        else queryString += "&";
        queryString += `${key}=${match}`;
      }
    }
  }

  let paramsId = "";
  if (options?.withParamsId) {
    const id = pathname.split("/").pop();
    if (id) paramsId = id;
  }

  return (
    <ThemedIconButton
      className="my-1"
      onClick={() =>
        router.push(nextTo + (paramsId ? `/${paramsId}` : "") + queryString)
      }
    >
      <ArrowRightIcon className="h-5 w-5 m-1" />
    </ThemedIconButton>
  );
}
