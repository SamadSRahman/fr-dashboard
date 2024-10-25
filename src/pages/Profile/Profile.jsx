import Dealercards from "../../components/Dealercards/Dealercards";
import SelectSection from "../../components/SelectSection/SelectSection";
import TableComponent from "../../components/TableComponent/TableComponent";
import useProfile from "../../hooks/useProfile";
import styles from "./Profile.module.css";
import ProfileGraph from "../../components/ProfileGraph/ProfleGraph";
import ReportCard from "../../components/ReportCard/ReportCard";

export default function Profile() {
  const {
    handleGetProfileData,
    overallStats,
    portalWiseStats,
    regionWiseStats,
    roleWiseStats,
  } = useProfile();

  return (
    <div className={styles.container}>
      <h3>Profile</h3>
      <SelectSection
        page={"profile"}
        isRegion
        isGroupCode
        isDealerCode
        isDepartment
        isDate
        onApply={(dealerCodes, departments, dates) =>
          handleGetProfileData(dealerCodes, departments, dates)
        }
      />
      <div className={styles.overviewCard}>
        <Dealercards
          region="Overall assessment"
          // attendeduser={assessmentAnalysisData[0]?.total_attendants}
          // passeduser={assessmentAnalysisData[0]?.passed_users}
          percentage={Math.round(overallStats.profile_update_percentage)}
          index={0}
          isMain={true}
          valueTitle1={"Total users"}
          valueTitle2={"Profile updated"}
          value1={overallStats.total_users}
          value2={overallStats.profile_updated}
        />
      </div>
      <div className={styles.cardSection}>
        <h3>Region wise assessment scores</h3>
        <div className={styles.cards}>
          {regionWiseStats.map(
            (ele, ind) =>
              ind > 0 && (
                <Dealercards
                  key={ind}
                  region={ele.dealer__region}
                  index={ind}
                  value1={ele.total_users}
                  value2={ele.profile_updated}
                  percentage={Math.round(ele.profile_update_percentage)}
                  passeduser={ele.profile_updated}
                  valueTitle1={"Total users"}
                  valueTitle2={"Profile updated"}
                />
              )
          )}
        </div>
      </div>
      <div className={styles.tableSection}>
        <h3>Role wise profile overview</h3>
     <div className={styles.bottomDivision}>
     <div className={styles.tableWrapper}>
          <TableComponent
            tableData={roleWiseStats.splice(0, 10)}
            columns={[
              { key: "role" },
              { key: "total_users" },
              { key: "profile_updated" },
              { key: "profile_update_percentage" },
            ]}
            headerData={[
              "Role",
              "Total users",
              "Profile updated",
              "Profile update rate",
            ]}
            currentPage={1}
            totalPages={10}
          />
        </div>
        <div className={styles.reportSection}>
          <div className={styles.reportWrapper}>

            <ReportCard/>
          </div>
          <div className={styles.chartWrapper}>
            <h3>Department wise profile update</h3>
            <ProfileGraph chartData={portalWiseStats} />
          </div>
        </div>

     </div>
      </div>
    </div>
  );
}
