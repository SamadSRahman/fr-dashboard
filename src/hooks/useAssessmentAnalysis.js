import { useState } from "react";
import { formatDateForAPI } from "../utils/services";
import { getAssessmentAnalysis } from "../api/assessmentAnalysis";

export default function useAssessmentAnalysis() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [assessmentAnalysisData, setAssesmentAnalysisData] = useState([])

  const handleGetAssessmentAnalysis = async (dealerCodes, departments,  assessmentIds, dates) => {
    setLoading(true);
    console.log("assessment analytics triggered", assessmentIds, dates);
    let startDate = formatDateForAPI(dates[0])
    let endDate = formatDateForAPI(dates[1])
    try {
      const response = await getAssessmentAnalysis(dealerCodes, departments,startDate,endDate, assessmentIds);
      console.log(response);
      setAssesmentAnalysisData(response.performance_stats)
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };
  return {
    loading,
    error,
    handleGetAssessmentAnalysis,
    assessmentAnalysisData

  };
}
