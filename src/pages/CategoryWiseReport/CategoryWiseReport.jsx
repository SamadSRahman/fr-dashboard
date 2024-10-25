import CategoryBarGraph from "../../components/CategoryBarGraph/CategoryBarGraph";
import SelectSection from "../../components/SelectSection/SelectSection";
import TableComponent from "../../components/TableComponent/TableComponent";
import useCategoryWiseReport from "../../hooks/useCategoryWiseReport";
import styles from "./CategoryWiseReport.module.css";

export default function CategoryWiseReport() {
  const {
    handleGetCategoryWiseReport,
    allCategories,
    bottomCategrories,
    topCategories,
  } = useCategoryWiseReport();
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
    handleGetCategoryWiseReport(
      selectedDealerCodes,
      selectedDepartments,
      assessmentIds,
      dates
    );
  }

  return (
    <div className={styles.container}>
      <h3>Category wise report</h3>
      <SelectSection
        page={"categoryWiseReport"}
        isRegion
        isGroupCode
        isDealerCode
        isDepartment
        isDate
        isAssessment
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

      <div className={styles.graphSection}>
        <h3>Category wise performance rate</h3>
        <CategoryBarGraph data={allCategories} />
      </div>
      <div className={styles.tableSection}>
        <div className={styles.tableWrapper}>
        <h3>Top 5 categories based on high score</h3>
          <TableComponent
            headerData={["Category", "Score rate"]}
            tableData={topCategories}
            columns={[{ key: "tag_name" }, { key: "success_rate" }]}
          />
        </div>
        <div className={styles.tableWrapper}>
          <h3>Bottom 5 categories based on high score</h3>
          <TableComponent
            headerData={["Category", "Score rate"]}
            tableData={bottomCategrories}
            columns={[{ key: "tag_name" }, { key: "success_rate" }]}
          />
        </div>
      </div>
    </div>
  );
}
