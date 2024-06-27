import { Button } from "@repo/ui/components/ui/button.tsx";
import { useFormStatus } from "react-dom";

export default function NextButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" type="submit" disabled={pending}>
      다음으로
    </Button>
  );
}
