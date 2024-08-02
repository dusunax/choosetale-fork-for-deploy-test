"use server";
import type { HttpError } from "@choosetale/nestia-type";
import { API_URL } from "@/constant/config";
import type { ApiResponse, SuccessResponse } from "../action";

interface GenerateThumbnailSuccessResponse extends SuccessResponse {
  generatedThumbnail: {
    imageId: number;
    url: string;
  };
}
export const generateThumbnail = async (
  gameId: number
): Promise<ApiResponse<GenerateThumbnailSuccessResponse>> => {
  try {
    const response = await fetch(`${API_URL}/game/${gameId}/recommend-image`, {
      method: "POST",
    });

    if (!response.ok) {
      const errorData = (await response.json()) as { message: string };
      throw new Error(errorData.message || "Failed to generate thumbnail");
    }

    const generatedThumbnail = await response.json();

    return {
      success: true,
      generatedThumbnail,
    };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
