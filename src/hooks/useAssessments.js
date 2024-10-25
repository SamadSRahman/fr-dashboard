import { useState } from "react";
import { getAllAssesments } from "../api/assessment";

export default function useAssessments() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [assessments, setAssessments] = useState([]);
  const [assessmentData, setAssessmentData] = useState([])

  const handleGetAssessments= async () => {
    setLoading(true);
    try {
      const response = await getAllAssesments();
      setAssessmentData(response)
      setAssessments(response.map(ele=>ele.assessment_name));     
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };
  return {
    loading,
    error,
    handleGetAssessments,
    assessmentData,
    assessments,
  };
}
