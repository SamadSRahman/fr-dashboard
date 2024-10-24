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

function SelectSection({ onApply, page }) {
  const isFirstLoad = useRef(true);
  const { handleGetRegions, regions } = useRegions();
  const { handleGetDealers, dealerList, dealerData } = useDealers();
  const { handleGetGroups, groups } = useGroup();

  const { assessments, handleGetAssessments } = useAssessments();
  const { departments, handleGetDepartments } = useDepartments();
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedAssessments, setSelectedAssessments] = useState([]);
  const [selectedDealerCode, setSelectedDealerCode] = useState([]);
  const [dates, setDates] = useState([])
  useEffect(() => {
    handleGetRegions();
    handleGetDepartments();
    handleGetAssessments();
  }, []);
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
      isFirstLoad.current = false;
    }
  }, [dealerData]);

  function handleApply() {
    if (page === "overview") {
      onApply(selectedDealerCode, dealerData, selectedDepartments, dates);
    }
  }

  return (
    <div className={styles.selectSection}>
      <div className={styles.dateSection}>
        <label htmlFor="">Date range</label>
        <DateInputFeild setDates={setDates} />
      </div>
      <SelectComponent
        label="Region"
        defaultValue={"All"}
        data={selectedRegions}
        setData={setSelectedRegions}
        listData={regions}
      />
      <SelectComponent
        label="Group code"
        defaultValue={"All"}
        data={selectedGroups}
        setData={setSelectedGroups}
        listData={groups}
      />
      <AutocompleteComponent
        label="Dealer Code"
        defaultValue={"All"}
        data={selectedDealerCode}
        setData={setSelectedDealerCode}
        listData={dealerList}
      />
      <SelectComponent
        label="Department"
        defaultValue={"All"}
        data={selectedDepartments}
        setData={setSelectedDepartments}
        listData={departments}
      />
      <SelectComponent
        label="Assessment"
        defaultValue={"All"}
        data={selectedAssessments}
        setData={setSelectedAssessments}
        listData={assessments}
      />
      <button onClick={handleApply} className={styles.applyBtn}>
        Apply
      </button>
    </div>
  );
}

SelectSection.propTypes = {
  onApply: PropTypes.func,
  page: PropTypes.string,
};

export default SelectSection;
