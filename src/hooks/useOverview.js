import { useState } from "react";
import { getOverviewData } from "../api/overview";
import { formatDateForAPI } from "../utils/services";

export default function useOverview() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [groups, setGroups] = useState([]);
  const [assessmentSummary, setAssessmentSummary] = useState([])
  const [statistics, setStatistics] = useState([])

  const handleGetOverviewData = async (dealerCodes, departments, dates) => {
    // let splicedArray = dealerCodes.length>20? dealerCodes.splice(0,250) : [...dealerCodes]
    setLoading(true);
    console.log("dealer codes usehook", dealerCodes);
    let startDate = formatDateForAPI(dates[0])
    let endDate = formatDateForAPI(dates[1])
    
    try {
      const response = await getOverviewData(dealerCodes, departments,startDate,endDate);
      console.log(response);
      setStatistics(response.statistics)
      setAssessmentSummary(response.assessment_summary)
      setGroups(response);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };
  return {
    loading,
    error,
    handleGetOverviewData,
    groups,
    statistics,
    assessmentSummary

  };
}
