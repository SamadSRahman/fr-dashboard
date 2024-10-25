import Dealercards from "../../components/Dealercards/Dealercards";
import SelectSection from "../../components/SelectSection/SelectSection";
import useAssessmentAnalysis from "../../hooks/useAssessmentAnalysis";
import styles from "./AssessmentAnalytics.module.css";
export default function AssessmentAnalytics() {
  const { handleGetAssessmentAnalysis, assessmentAnalysisData } =
    useAssessmentAnalysis();

  function handleApply(
    selectedDealerCode,
    dealerData,
    selectedDepartments,
    dates,
    assessmentIds
  ) {
    console.log("assesnIds", assessmentIds);
    const filteredArr = dealerData.filter((ele) =>
      selectedDealerCode.includes(`${ele.dealer_name} - ${ele.dealer_code}`)
    );
    const selectedDealerCodes = filteredArr.map((ele) => ele.dealer_code);
    handleGetAssessmentAnalysis(
      selectedDealerCodes,
      selectedDepartments,
      assessmentIds,
      dates
    );
  }

  return (
    <div className={styles.container}>
      <h3>Assessment analytics</h3>
      <SelectSection
      isDate isRegion isGroupCode isDealerCode isDepartment isAssessment
        page={"assessmentAnalytics"}
        onApply={(
          selectedDealersCode,
          dealerData,
          selectedDepartments,
          dates,
          assessmentIds
        ) =>
          handleApply(
            selectedDealersCode,
            dealerData,
            selectedDepartments,
            dates,
            assessmentIds
          )
        }
      />
    <div className={styles.overviewCard}>
    <Dealercards
        region="Overall assessment"
        value1={assessmentAnalysisData[0]?.total_attendants}
        value2={assessmentAnalysisData[0]?.passed_users}
        percentage={Math.round(assessmentAnalysisData[0]?.pass_rate)}
        index={0}
        isMain={true}
        valueTitle1={"Attended users"}
        valueTitle2={"Passed users"}
      />
    </div>
      <div className={styles.cardSection}>
        <h3>Region wise assessment scores</h3>
        <div className={styles.cards}>
          {assessmentAnalysisData.map(
            (ele, ind) =>
              ind > 0 && (
                <Dealercards
                  key={ind}
                  region={ele.region}
                  index={ind}
                  value1={ele.total_attendants}
                  value2={Math.round(ele.passed_users)}
                  valueTitle1={"Attended users"}
                  valueTitle2={"Passed users"}
                  percentage={ele.pass_rate}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
}
