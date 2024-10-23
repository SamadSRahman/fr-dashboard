import BasicCard from "../../components/BasicCard/BasicCard";
import TableComponent from "../../components/TableComponent/TableComponent";

import { overviewPageCards, overviewTableRows } from "../../utils/data";
import styles from "./Overview.module.css";
import SelectComponent from "../../components/SelectComponent/Select";
import { useEffect } from "react";
import useRegions from "../../hooks/useRegions";
import useDealers from "../../hooks/useDealers";

export default function Overview() {
  const { handleGetRegions, regions } = useRegions();
  const {handleGetDealers} = useDealers()
  useEffect(() => {
    handleGetRegions();
    handleGetDealers();
  }, []);
  return (
    <div className={styles.container}>
      <h3>Overview</h3>
      <div className={styles.selectSection}>
        <SelectComponent
          label="Region"
          defaultValue={"All"}
          data={[1, 2, 3, 4, 5]}
          setData={() => console.log("setData")}
          listData={regions}
        />
        <SelectComponent
          label="Group code"
          defaultValue={"All"}
          data={[1, 2, 3, 4, 5]}
          setData={() => console.log("setData")}
          listData={[1, 2, 3, 4, 5]}
        />
        <SelectComponent
          label="Dealer Code"
          defaultValue={"All"}
          data={[1, 2, 3, 4, 5]}
          setData={() => console.log("setData")}
          listData={[1, 2, 3, 4, 5]}
        />
        <SelectComponent
          label="Department"
          defaultValue={"Sales"}
          data={[1, 2, 3, 4, 5]}
          setData={() => console.log("setData")}
          listData={[1, 2, 3, 4, 5]}
        />
        <SelectComponent
          label="Assessment"
          defaultValue={"Sales knowledge"}
          data={[1, 2, 3, 4, 5]}
          setData={() => console.log("setData")}
          listData={[1, 2, 3, 4, 5]}
        />
      </div>
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
