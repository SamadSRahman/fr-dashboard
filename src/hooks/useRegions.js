import { useState } from "react";
import { getAllRegions } from "../api/region";

export default function useRegions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [regionData, setRegionData] = useState(null);
  const [regions, setRegions] = useState([]);
  const [zones, setZones] = useState([]);

  const handleGetRegions = async () => {
    setLoading(true);
    try {
      const response = await getAllRegions();
      console.log(response);
      setRegionData(response);
      const regionNames = response.map(
        (regionObj) => Object.keys(regionObj)[0]
      );
      const allZones = response.flatMap((regionObj) => Object.values(regionObj)[0]);
      setZones(allZones);

      setRegions(response);
      console.log(regionNames, allZones);
      
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };
  return {
    loading,
    error,
    handleGetRegions,
    regionData,
    regions,
    zones,
  };
}
