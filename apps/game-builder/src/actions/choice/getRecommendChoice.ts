"use server";
import type { HttpError } from "@choosetale/nestia-type";
import { API_URL } from "@/constant/config";
import type { ApiResponse, SuccessResponse } from "../action";

// --게임 정보 불러오기--
interface GetRecommendChoiceSuccessResponse extends SuccessResponse {
  choices: {
    title: string;
    description: string;
  }[];
}

export const getRecommendChoice = async (
  gameId: number,
  pageId: number
): Promise<ApiResponse<GetRecommendChoiceSuccessResponse>> => {
  try {
    const response = await fetch(
      `${API_URL}/game/${gameId}/page/${pageId}/recommend-choices`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const choices = await response.json();
    return { success: true, choices };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
