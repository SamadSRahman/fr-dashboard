import { useState } from "react";
import { formatDateForAPI } from "../utils/services";
import { getCategoryWiseReport } from "../api/CategoryWiseReport";

export default function useCategoryWiseReport() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [allCategories, setAllCategories] = useState([])
  const [bottomCategrories, setBottomCategorie] = useState([])
  const [topCategories, setTopCategories] = useState([])

  const handleGetCategoryWiseReport = async (dealerCodes, departments,  assessmentIds, dates) => {
    setLoading(true);
    console.log("assessment analytics triggered", assessmentIds, dates);
    let startDate = formatDateForAPI(dates[0])
    let endDate = formatDateForAPI(dates[1])
    try {
      const response = await getCategoryWiseReport(dealerCodes, departments,startDate,endDate, assessmentIds);
      console.log(response);
      setAllCategories(response.all_categories)
      setBottomCategorie(response.bottom_5_categories)
      setTopCategories(response.top_5_categories)
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };
  return {
    loading,
    error,
    handleGetCategoryWiseReport,
    allCategories,
    bottomCategrories,
    topCategories
  };
}
