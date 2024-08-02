import { TrashIcon } from "@radix-ui/react-icons";
import ThemedIconButton from "@/components/theme/ui/ThemedIconButton";

interface ImageDeleteProps {
  onDelete: () => void;
}

export default function ImageDelete({ onDelete }: ImageDeleteProps) {
  return (
    <ThemedIconButton onClick={onDelete}>
      <TrashIcon className="h-5 w-5 m-1" />
    </ThemedIconButton>
  );
}
