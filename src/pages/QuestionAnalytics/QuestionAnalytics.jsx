import SelectSection from "../../components/SelectSection/SelectSection";
import TableComponent from "../../components/TableComponent/TableComponent";
import useQuestionAnalytics from "../../hooks/useQuestionAnalytics";
import styles from "./QuestionAnalytics.module.css";
import ReportCard from '../../components/ReportCard/ReportCard'
export default function QuestionAnalytics() {
  const { handleGetQuestionAnalytics, topQuestions, bottomQuestions, allQuestions } = useQuestionAnalytics();
  function handleApply(
    selectedDealerCode,
    dealerData,
    selectedDepartments,
    dates,
    assessmentIds
  ) {
    const filteredArr = dealerData.filter((ele) =>
      selectedDealerCode.includes(`${ele.dealer_name} - ${ele.dealer_code}`)
    );
    const selectedDealerCodes = filteredArr.map((ele) => ele.dealer_code);
    handleGetQuestionAnalytics(
      selectedDealerCodes,
      selectedDepartments,
      assessmentIds,
      dates
    );
  }

  return (
    <div className={styles.container}>
      <h3>Question Analytics</h3>
      <SelectSection
        isDate
        isRegion
        isGroupCode
        isDealerCode
        isDepartment
        isAssessment
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
      <div className={styles.dataSection}>
        <div className={styles.leftSection}>
          <div className={styles.tableWrapper}>
            <h3>Top 5 questions based on high score</h3>
            <TableComponent
              headerData={["Question Id", "Question", "Success rate"]}
              tableData={topQuestions}
              columns={[
                { key: "question_id" },
                { key: "question" },
                { key: "success_rate" },
              ]}
            />
          </div>
          <div className={styles.tableWrapper}>
            <h3>Bottom 5 questions based on low score</h3>
            <TableComponent
              headerData={["Question Id", "Question", "Success rate"]}
              tableData={bottomQuestions}
              columns={[
                { key: "question_id" },
                { key: "question" },
                { key: "success_rate" },
              ]}
            />
          </div>
        </div>
        <div className={styles.rightSection}>
              <div className={styles.reportWrapper}>
                <ReportCard />

              </div>
              <div className={styles.tableWrapper}>
            <h3>Question wise score</h3>
            <TableComponent
              headerData={["Question Id", "Question", "Success rate"]}
              tableData={allQuestions.slice(0,10)}
              currentPage={1}
              columns={[
                { key: "question_id" },
                { key: "question" },
                { key: "success_rate" },
              ]}
            />
          </div>
           </div>
      </div>
    </div>
  );
}
