import { apiClient, permission, userName } from "../config";

export const getAllDepartments = async () => {
  const response = await apiClient.get(
    `get_all_department/?username=${userName}&permission=${permission}`
  );
  return response.data;
};
