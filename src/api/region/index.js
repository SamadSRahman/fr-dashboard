import { apiClient, permission, userName } from "../config";

export const getAllRegions = async () => {
  const response = await apiClient.get(
    `get_region_list/?username=${userName}&permission=[${JSON.stringify(permission)}]`
  );
  return response.data;
};
