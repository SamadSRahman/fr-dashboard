import { useState } from "react";
import { getAllDealers } from "../api/dealer";

export default function useDealers() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dealerData, setDealerData] = useState(null);


  const handleGetDealers = async () => {
    setLoading(true);
    try {
      const response = await getAllDealers();
      console.log(response);
      setDealerData(response);
    
      
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };
  return {
    loading,
    error,
    handleGetDealers,
    dealerData,
  };
}
