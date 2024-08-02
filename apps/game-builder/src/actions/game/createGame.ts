"use server";
import type { HttpError } from "@choosetale/nestia-type";
import type { CreateGameReqDto } from "@choosetale/nestia-type/lib/structures/CreateGameReqDto";
import type { CreateGameResDto } from "@choosetale/nestia-type/lib/structures/CreateGameResDto";
import { API_URL } from "@/constant/config";
import type { ApiResponse, SuccessResponse } from "../action";

interface CreateSuccessResponse extends SuccessResponse {
  gameInitData: CreateGameResDto;
}

export const createGame = async (
  formData: CreateGameReqDto
): Promise<ApiResponse<CreateSuccessResponse>> => {
  try {
    const response = await fetch(`${API_URL}/game`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      mode: "no-cors",
    });
    const gameInitData = (await response.json()) as CreateGameResDto;

    return { success: true, gameInitData };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
