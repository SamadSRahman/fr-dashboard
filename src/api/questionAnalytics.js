// overview/?username=tkm_dashboard&permission=["TKM"]&start_date=01-01-2024&end_date=01-10-2024&dealer_code_list=["KS011", "PL01A", "BH01B"]&department_list=["Sales","Service"]


import {  apiClientWithFormData, permission, userName } from "./config";

export const getQuestionAnalytics = async (dealerCodes, departments, startDate, endDate, assessmentIds) => {

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
    `qn_analysis/`, formData
  );
  return response.data;
};
