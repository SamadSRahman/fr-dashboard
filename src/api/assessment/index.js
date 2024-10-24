//get_all_assessment
import { apiClient, permission, userName } from "../config";

export const getAllAssesments = async () => {
  const response = await apiClient.get(
    `get_all_assessment/?username=${userName}&permission=${permission}`
  );
  return response.data;
};
