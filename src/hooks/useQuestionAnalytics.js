import { useState } from "react";
import { formatDateForAPI } from "../utils/services";
import { getQuestionAnalytics } from "../api/questionAnalytics";

export default function useQuestionAnalytics() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [allQuestions, setAllQuestions] = useState([])
  const [bottomQuestions, setBottomQuestions] = useState([])
  const [topQuestions, setTopQuestions] = useState([])

  const handleGetQuestionAnalytics = async (dealerCodes, departments,  assessmentIds, dates) => {
    setLoading(true);
    console.log("assessment analytics triggered", assessmentIds, dates);
    let startDate = formatDateForAPI(dates[0])
    let endDate = formatDateForAPI(dates[1])
    try {
      const response = await getQuestionAnalytics(dealerCodes, departments,startDate,endDate, assessmentIds);
      console.log(response);
      setAllQuestions(response.all_questions)
      setBottomQuestions(response.bottom_5_questions)
      setTopQuestions(response.top_5_questions)
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };
  return {
    loading,
    error,
    handleGetQuestionAnalytics,
    allQuestions,
    bottomQuestions,
    topQuestions
  };
}
