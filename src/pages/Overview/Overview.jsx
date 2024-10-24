import BasicCard from "../../components/BasicCard/BasicCard";
import TableComponent from "../../components/TableComponent/TableComponent";
import styles from "./Overview.module.css";
import SelectSection from "../../components/SelectSection/SelectSection";

import useOverview from "../../hooks/useOverview";

export default function Overview() {
  const {handleGetOverviewData, assessmentSummary, statistics} = useOverview()

  function handleApply(selectedDealerCode, dealerData,selectedDepartments, dates){
    const filteredArr = dealerData.filter((ele) =>
      selectedDealerCode.includes(`${ele.dealer_name} - ${ele.dealer_code}`)
    );
    const selectedDealerCodes = filteredArr.map((ele) => ele.dealer_code);
    console.log(selectedDealerCodes);
    handleGetOverviewData(selectedDealerCodes, selectedDepartments, dates)
  }
  return (
    <div className={styles.container}>
      <h3>Overview</h3>
      <SelectSection page={'overview'} onApply={(selectedDealersCode, dealerData,selectedDepartments, dates )=>handleApply(selectedDealersCode, dealerData, selectedDepartments, dates)} />
      <div className={styles.cardSection}>
        <h3>Summary</h3>
        <div className={styles.cards}>
          <BasicCard 
          text="Total Number of Assessments Conducted"
          value={statistics.total_assessments}
          index={0}
          />
          <BasicCard 
          text="Current active assessments"
          value={statistics.active_assessments}
          index={1}
          />
          <BasicCard 
          text="Average score rate across all assessments"
          value={statistics.average_score}
          index={2}
          />
          <BasicCard 
          text="Overall pass rate"
          value={statistics.pass_rate}
          index={3}
          />
          <BasicCard 
          text="Average Attempts per Assessment"
          value={statistics.average_attempts}
          index={0}
          />
        </div>
      </div>
      <div className={styles.tableSection}>
        <h3>Recent Assessments Summary</h3>
        <TableComponent
          tableData={assessmentSummary}
          columns={[
            { key: 'assessment_name' },
            { key: 'date' },
            { key: 'total_participants' },
            { key: 'pass_rate' },
            { key: 'average_attempt' }
          ]}
          headerData={[
            "Assessment name",
            "Date",
            "Participants",
            "Pass rate",
            "Average attempt",
          ]}
          currentPage={1}
          totalPages={10}
        />
      </div>
    </div>
  );
}