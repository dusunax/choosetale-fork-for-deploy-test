import { useRef } from "react";
import { ImageIcon } from "@radix-ui/react-icons";
import ThemedIconButton from "@/components/theme/ui/ThemedIconButton";

interface ImageUploadProps {
  onUpload: (url: string) => void;
}

export default function ImageUpload({ onUpload }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onUpload(url);
    }
  };

  return (
    <>
      <ThemedIconButton onClick={handleButtonClick}>
        <ImageIcon className="h-5 w-5 m-1" />
      </ThemedIconButton>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="image/*"
      />
    </>
  );
}
