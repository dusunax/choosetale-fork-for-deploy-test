"use server";
import type { HttpError } from "@choosetale/nestia-type";
import type { UpdateGameReqDto } from "@choosetale/nestia-type/lib/structures/UpdateGameReqDto";
import { API_URL } from "@/constant/config";
import type { ApiResponse, SuccessResponse } from "../action";

interface UpdateSuccessResponse extends SuccessResponse {
  game: UpdateGameReqDto;
}

export const updateGame = async (
  formData: UpdateGameReqDto,
  gameId: number
): Promise<ApiResponse<UpdateSuccessResponse>> => {
  try {
    const response = await fetch(`${API_URL}/game/${gameId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const game = (await response.json()) as UpdateGameReqDto;

    return { success: true, game };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
