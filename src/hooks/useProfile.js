import { useState } from "react";
import { formatDateForAPI } from "../utils/services";
import { getProfileData } from "../api/profileStatus";

export default function useProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [overallStats, setOverallStats] = useState({});
  const [portalWiseStats, setPortalWiseStats] = useState([]);
  const [regionWiseStats, setRegionWiseStats] = useState([]);
  const [roleWiseStats, setRoleWiseStats] = useState([]);



  const handleGetProfileData = async (dealerCodes, departments, dates) => {
    setLoading(true);
    let startDate = formatDateForAPI(dates[0])
    let endDate = formatDateForAPI(dates[1])
    try {
      const response = await getProfileData(dealerCodes, departments,startDate,endDate,);
      console.log(response);
      setOverallStats(response.overall_stats);
      setPortalWiseStats(response.portal_wise_stats);
      setRegionWiseStats(response.region_wise_stats);
      setRoleWiseStats(response.role_wise_stats);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };
  return {
    loading,
    error,
    handleGetProfileData,
    overallStats, portalWiseStats, regionWiseStats, roleWiseStats

  };
}
