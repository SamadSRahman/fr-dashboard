import { apiClient, permission, userName } from "../config";

export const getAllDealers = async (regions, groups) => {
  const response = await apiClient.get(
    `get_all_dealer/?username=${userName}&permission=[${JSON.stringify(permission)}]&region=${JSON.stringify(
      regions
    )}&group=${JSON.stringify(groups)}`
  );
  return response.data;
};
