import BasicCard from "../../components/BasicCard/BasicCard";
import TableComponent from "../../components/TableComponent/TableComponent";
import { overviewPageCards, overviewTableRows } from "../../utils/data";
import styles from "./Overview.module.css";

export default function Overview() {
  return (
    <div className={styles.container}>
      <h3>Overview</h3>
      <div className={styles.selectSection}></div>
      <div className={styles.cardSection}>
        <h3>Overview</h3>
        <div className={styles.cards}>
          {overviewPageCards.map((card, ind) => (
            <BasicCard
              key={ind}
              text={card.text}
              value={card.value}
              index={ind}
            />
          ))}
        </div>
      </div>
      <div className={styles.tableSection}>
        <h3>Recent Assessments Summary</h3>
        <TableComponent
          tableData={overviewTableRows}
          headerData={[
            "Assessment name",
            "Date",
            "Participants",
            "Pass rate",
            "Average time spent on the assessment",
          ]}
          currentPage={1}
          totalPages={10}
        />
      </div>
    </div>
  );
}
