

import {  apiClientWithFormData, permission, userName } from "./config";

export const getDealerPerformance = async (dealerCodes, departments, startDate, endDate, assessmentIds) => {

  // Create a new FormData object
const formData = new FormData();

// Add each field to the FormData object
formData.append('username', userName);
formData.append('permission', permission);
formData.append('start_date', startDate);
formData.append('end_date', endDate);
formData.append('dealer_code_list', JSON.stringify(dealerCodes));
formData.append('department_list', JSON.stringify(departments));
formData.append('assessment_id', JSON.stringify(assessmentIds))

  const response = await apiClientWithFormData.post(
    `dealer_performance/`, formData
  );
  return response.data;
};
