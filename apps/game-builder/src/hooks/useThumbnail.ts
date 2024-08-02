import { useCallback, useState } from "react";
import type { useForm } from "react-hook-form";
import type { GameInfo } from "@/interface/customType";
import { uploadThumbnail } from "@/actions/thumbnail/uploadThumbnail";
import { deleteThumbnail } from "@/actions/thumbnail/deleteThumbnail";
import { generateThumbnail } from "@/actions/thumbnail/generateThumbnail";

export default function useThumbnail({
  ...useFormProps
}: ReturnType<typeof useForm<GameInfo>>) {
  const { setValue, getValues } = useFormProps;
  const [currentThumbnailIdx, setCurrentThumbnailIdx] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  // 이미지 업로드
  const handleUpload = useCallback(
    async (gameId: number, files: FileList) => {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("images", file);
      });

      const response = await uploadThumbnail(gameId, formData);
      if (response.success) {
        const currentThumbnails = getValues("thumbnails") || [];
        setValue("thumbnails", [
          ...currentThumbnails,
          ...response.uploadedThumbnail,
        ]);

        setTimeout(() => {
          setCurrentThumbnailIdx(getValues("thumbnails").length + 1);
        }, 500);
      }
    },
    [getValues, setValue]
  );

  // AI 이미지 생성 요청 핸들러
  const handleGenerate = useCallback(
    async (gameId: number) => {
      setIsGenerating(true);
      const response = await generateThumbnail(gameId);

      if (response.success) {
        const currentThumbnails = getValues("thumbnails") || [];
        const { imageId, url } = response.generatedThumbnail;
        setValue("thumbnails", [...currentThumbnails, { id: imageId, url }]);

        setTimeout(() => {
          setIsGenerating(false);
          setCurrentThumbnailIdx(getValues("thumbnails").length + 1);
        }, 500);
      }
    },
    [setValue, getValues]
  );

  // 썸네일 이미지 삭제 핸들러
  const handleDelete = useCallback(
    async (gameId: number, index: number) => {
      const imageId = getValues("thumbnails")[index].id;
      const response = await deleteThumbnail(gameId, imageId);

      if (response.success) {
        const currentThumbnails = getValues("thumbnails") || [];
        const updatedThumbnails = currentThumbnails.filter(
          (_, i) => i !== index
        );
        setValue("thumbnails", updatedThumbnails);
      }
    },
    [getValues, setValue]
  );

  return {
    handleUpload,
    handleGenerate,
    handleDelete,
    currentThumbnailIdx,
    setCurrentThumbnailIdx,
    isGenerating,
  };
}
