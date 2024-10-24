import { apiClient, permission, userName } from "../config";

export const getAllGroups = async (regions) => {
  const response = await apiClient.get(
    `get_all_group/?username=${userName}&permission=[${JSON.stringify(permission)}]&region=${JSON.stringify(regions)}`
  );
  return response.data;
};
