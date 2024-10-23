import { apiClient, permission, userName } from "../config";



export const getAllRegions = async()=>{
    const response = await apiClient.get(`get_region_zone_list/?username=${userName}&permission=${permission}`);
    return response.data
  }