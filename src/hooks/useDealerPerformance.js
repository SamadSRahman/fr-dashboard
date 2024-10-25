import { useState } from "react";
import { formatDateForAPI } from "../utils/services";
import { getDealerPerformance } from "../api/dealerPerformance";

export default function useDealerPerformance() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

//   const [dealerPerformanceData, setdealerPerformanceData] = useState([])
  const [topdealer , setTopDealer] = useState([]);
  const [bottomdealer , setBottomDealer] = useState([]);

  const handleGetDealerPerformance = async (dealerCodes, departments,  assessmentIds, dates) => {
    setLoading(true);
    console.log("dealer performance triggered", assessmentIds, dates);
    let startDate = formatDateForAPI(dates[0])
    let endDate = formatDateForAPI(dates[1])
    try {
      const response = await getDealerPerformance(dealerCodes, departments,startDate,endDate, assessmentIds);
      console.log(response);
    //   setdealerPerformanceData(response.data)
      setTopDealer(response.top_5_dealers)
      setBottomDealer(response.bottom_5_dealers)

    } catch (err) {
      console.log(err);
      setError(err);
    }
  };
  return {
    loading,
    error,
    handleGetDealerPerformance,
    topdealer,
    bottomdealer
  };
}
