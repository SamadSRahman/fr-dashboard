import { useState } from "react";
import { getAllGroups } from "../api/group";

export default function useGroup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [groups, setGroups] = useState([]);

  const handleGetGroups= async (selectedRegions) => {
    console.log(selectedRegions);
    
    setLoading(true);
    try {
      const response = await getAllGroups(selectedRegions);
      console.log(response);
      setGroups(response);     
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };
  return {
    loading,
    error,
    handleGetGroups,
    groups,
  };
}
