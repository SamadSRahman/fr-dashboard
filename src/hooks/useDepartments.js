import { useState } from "react";
import { getAllDepartments } from "../api/department";

export default function useDepartments() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [departments, setDepartments] = useState([]);

  const handleGetDepartments= async () => {
       
    setLoading(true);
    try {
      const response = await getAllDepartments();
      setDepartments(response);     
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };
  return {
    loading,
    error,
    handleGetDepartments,
    departments,
  };
}
