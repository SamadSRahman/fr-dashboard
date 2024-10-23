import { apiClient, permission, userName } from "../config";

export const getAllDealers = async () => {
  const response = await apiClient.get(
    `get_all_dealer/?username=${userName}&permission=${permission}`
  );
  return response.data;
};
