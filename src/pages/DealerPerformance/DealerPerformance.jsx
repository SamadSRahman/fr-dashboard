import ReportCard from '../../components/ReportCard/ReportCard';
import SelectSection from '../../components/SelectSection/SelectSection';
import TableComponent from '../../components/TableComponent/TableComponent';
import useDealerPerformance from '../../hooks/useDealerPerformance';
import styles from './DealerPerformance.module.css';


export default function DealerPerformance() {

  const { handleGetDealerPerformance, topdealer, bottomdealer } = useDealerPerformance()

  console.log("topdealer: bottomdealer ",topdealer, bottomdealer );


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
    handleGetDealerPerformance(
      selectedDealerCodes,
      selectedDepartments,
      assessmentIds,
      dates
    );
  }
  
  return (
    <div className={styles.container}>
      <h3>Dealer Performance</h3>
      <SelectSection
      page={"dealerPerformance"}
      isRegion
      isGroupCode
      isDealerCode
      isDepartment
      isAssessment
      isDate
    
      onApply={( selectedDealersCode,
        dealerData,
        selectedDepartments,
        dates,
        assessmentIds)=>handleApply( selectedDealersCode,
          dealerData,
          selectedDepartments,
          dates,
          assessmentIds)
      }
    />

    <ReportCard />

   <div className={styles.tablecontainer}>

   <div className={styles.topdealertable}>
   
   <h3>Top 5 dealer perfomance</h3>

   {topdealer  &&    
    <TableComponent
    tableData={topdealer}
    columns={[
      { key: 'dealer_code' },
      { key: 'total_attempts' },
      { key: 'passed_attempts' },
      { key: 'pass_rate' }
    ]}
    headerData={[
      "Dealers",
      "Total attempts",
      "Passed attempts",
      "Pass rate in %",
    ]}
  
    /> } 

   </div>



  <div className={styles.bottomdealertable}>
   
   <h3>Bottom 5 dealer performance </h3>

{  bottomdealer &&
  <TableComponent
  tableData={bottomdealer}
  columns={[
    { key: 'dealer_code' },
    { key: 'total_attempts' },
    { key: 'passed_attempts' },
    { key: 'pass_rate' }
  ]}
  headerData={[
    "Dealers",
    "Total attempts",
    "Passed attempts",
    "Pass rate in %",
  ]}
  
  /> 
}

</div>

  </div>  

    </div>
  );
}
