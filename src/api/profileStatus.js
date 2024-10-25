
import {  apiClientWithFormData, permission, userName } from "./config";

export const getProfileData = async (dealerCodes, departments, startDate, endDate) => {

  // Create a new FormData object
const formData = new FormData();

// Add each field to the FormData object
formData.append('username', userName);
formData.append('permission', permission);
formData.append('start_date', startDate);
formData.append('end_date', endDate);
formData.append('dealer_code_list', JSON.stringify(dealerCodes));
formData.append('department_list', JSON.stringify(departments));


  const response = await apiClientWithFormData.post(
    `profile_stats/`, formData
  );
  return response.data;
};
