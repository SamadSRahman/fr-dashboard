import { useState } from "react";
import { getAllDealers } from "../api/dealer";

export default function useDealers() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dealerData, setDealerData] = useState([]);
  const [dealerCodes, setDealerCodes] = useState([])
  const [dealerList, setDealerList] = useState([])

  const handleGetDealers = async (regions, groups) => {
    setLoading(true);
    try {
      const response = await getAllDealers(regions,groups);
      console.log(response);
      setDealerData(response);
      setDealerCodes(response.map(ele=>ele.dealer_code))
      setDealerList(response.map(ele=>ele.dealer_name.concat(" - "+ ele.dealer_code)))
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };
  return {
    loading,
    error,
    handleGetDealers,
    dealerCodes,
    dealerData,
    dealerList,
  };
}
