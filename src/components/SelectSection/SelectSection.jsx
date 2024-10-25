import PropTypes from "prop-types";
import SelectComponent from "../SelectComponent/Select";
import styles from "./SelectSection.module.css";
import useRegions from "../../hooks/useRegions";
import useDealers from "../../hooks/useDealers";
import { useEffect, useRef, useState } from "react";
import useGroup from "../../hooks/useGroup";
import useDepartments from "../../hooks/useDepartments";
import useAssessments from "../../hooks/useAssessments";
import AutocompleteComponent from "../Autocomplete/Autocomplete";
import DateInputFeild from "../DateInput/DateInputFeild";
import { useLocation } from "react-router-dom";
import BasicAutocompleteComponent from "../Autocomplete/BasicAutocomplete";

function SelectSection({
  onApply,
  page,
  isRegion,
  isGroupCode,
  isDealerCode,
  isDepartment,
  isAssessment,
  isDate,
}) {
  const isFirstLoad = useRef(true);
  const { handleGetRegions, regions } = useRegions();
  const { handleGetDealers, dealerList, dealerData } = useDealers();
  const { handleGetGroups, groups } = useGroup();

  const { assessments, handleGetAssessments, assessmentData } =
    useAssessments();
  const { departments, handleGetDepartments } = useDepartments();
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedAssessments, setSelectedAssessments] = useState("");
  const [selectedDealerCode, setSelectedDealerCode] = useState([]);
  const [dates, setDates] = useState([]);
  const location = useLocation();

  useEffect(() => {
    handleGetRegions();
    handleGetDepartments();
    handleGetAssessments();
  }, []);
  useEffect(() => {
    setSelectedAssessments(assessments ? assessments[0] : "");
  }, [assessments]);
  useEffect(() => {
    if (selectedRegions.length > 0) {
      handleGetGroups(selectedRegions);
    }
  }, [selectedRegions]);
  useEffect(() => {
    if (selectedRegions.length > 0 && selectedGroups.length > 0) {
      handleGetDealers(selectedRegions, selectedGroups);
    }
  }, [selectedGroups]);
  useEffect(() => {
    if (isFirstLoad.current && selectedDealerCode.length > 0) {
      handleApply();
      console.log("triggered on page load");
      isFirstLoad.current = false;
    }
  }, [selectedDealerCode]);

  useEffect(() => {
    // Reset useRef when route changes
    return () => {
      isFirstLoad.current = true; // Reset ref when navigating away
    };
  }, [location]);

  function handleApply() {
    if (page === "overview") {
      onApply(selectedDealerCode, dealerData, selectedDepartments, dates);
    } 
    else if (page === "assessmentAnalytics" || page === "categoryWiseReport") {
      console.log("line 82", assessmentData, selectedAssessments);
      let selectedAssessmentsData = assessmentData.find(
        (ele) => selectedAssessments === ele.assessment_name
      );
      let assessmentIds = selectedAssessmentsData?.id;
      onApply(
        selectedDealerCode,
        dealerData,
        selectedDepartments,
        dates,
        assessmentIds
      );
    }
    else if(page === "profile"){
      const filteredArr = dealerData.filter((ele) =>
        selectedDealerCode.includes(`${ele.dealer_name} - ${ele.dealer_code}`)
      );
      const selectedDealerCodes = filteredArr.map((ele) => ele.dealer_code);
      onApply(selectedDealerCodes, selectedDepartments, dates)
    }
  }
  useEffect(() => {
    console.log("selectedAssessments", selectedAssessments);
  }, [selectedAssessments]);

  return (
    <div className={styles.selectSection}>
      {isDate && (
        <div className={styles.dateSection}>
          <label htmlFor="">Date range</label>
          <DateInputFeild setDates={setDates} />
        </div>
      )}
      {isRegion && (
        <SelectComponent
          label="Region"
          defaultValue={"All"}
          data={selectedRegions}
          setData={setSelectedRegions}
          listData={regions}
        />
      )}
      {isGroupCode && (
        <SelectComponent
          label="Group code"
          defaultValue={"All"}
          data={selectedGroups}
          setData={setSelectedGroups}
          listData={groups}
        />
      )}
      {isDealerCode && (
        <AutocompleteComponent
          label="Dealer Code"
          defaultValue={"All"}
          data={selectedDealerCode}
          setData={setSelectedDealerCode}
          listData={dealerList}
        />
      )}
      {isDepartment && (
        <SelectComponent
          label="Department"
          defaultValue={"All"}
          data={selectedDepartments}
          setData={setSelectedDepartments}
          listData={departments}
        />
      )}
      {isAssessment && (
        <BasicAutocompleteComponent
          label="Select Assessment"
          defaultValue={assessments[0]}
          data={selectedAssessments}
          setData={setSelectedAssessments}
          listData={assessments}
        />
      )}
      <button onClick={handleApply} className={styles.applyBtn}>
        Apply
      </button>
    </div>
  );
}

SelectSection.propTypes = {
  onApply: PropTypes.func,
  page: PropTypes.string,
  isRegion: PropTypes.bool,
  isGroupCode: PropTypes.bool,
  isDealerCode: PropTypes.bool,
  isDepartment: PropTypes.bool,
  isAssessment: PropTypes.bool,
  isDate: PropTypes.bool,
};

export default SelectSection;
