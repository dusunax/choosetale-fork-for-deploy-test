"use server";
import type { HttpError } from "@choosetale/nestia-type";
import { API_URL } from "@/constant/config";
import type { ApiResponse, SuccessResponse } from "../action";

interface UploadThumbnailSuccessResponse extends SuccessResponse {
  uploadedThumbnail: {
    id: number;
    url: string;
    gameId: number;
    createdAt: string;
    updatedAt: string;
  }[];
}
export const uploadThumbnail = async (
  gameId: number,
  images: FormData
): Promise<ApiResponse<UploadThumbnailSuccessResponse>> => {
  try {
    const response = await fetch(`${API_URL}/game/${gameId}/upload-thumbnail`, {
      method: "POST",
      body: images,
    });

    if (!response.ok) {
      const errorData = (await response.json()) as { message: string };
      throw new Error(errorData.message || "Failed to upload thumbnails");
    }

    const uploadedThumbnail = await response.json();
    return { success: true, uploadedThumbnail };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
