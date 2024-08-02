"use server";
import type { HttpError } from "@choosetale/nestia-type";
import { API_URL } from "@/constant/config";
import type { ApiResponse, SuccessResponse } from "../action";

export const deleteThumbnail = async (
  gameId: number,
  imageId: number
): Promise<ApiResponse<SuccessResponse>> => {
  try {
    const response = await fetch(
      `${API_URL}/game/${gameId}/thumbnail/${imageId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errorData = (await response.json()) as { message: string };
      throw new Error(errorData.message || "Failed to delete thumbnail");
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
