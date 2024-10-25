import styles from './UserDetails.module.css';
import backIcon from '../../assets/back_arrow.svg';
import { calculateColor } from '../../utils/services';
import ReportCard from '../../components/ReportCard/ReportCard';
import TableComponent from '../../components/TableComponent/TableComponent';

export default function UserDetails() {
  return (
    <div className={styles.container}>
      <h3>
        <img src={backIcon} alt="" className={styles.backIcon} /> Lakshya Id - 1234
      </h3>
      <div className={styles.detailsSection}>
        <div className={styles.detailItem}>
          <label>User name</label>
          <span>Praveen</span>
        </div>
        <div className={styles.detailItem}>
          <label>Assessment name</label>
          <span>Assessment 1</span>
        </div>
        <div className={styles.detailItem}>
          <label>Date</label>
          <span>01/01/2023</span>
        </div>
        <div className={styles.detailItem}>
          <label>Obtained marks</label>
          <span>80</span>
        </div>
        <div className={styles.detailItem}>
          <label>Time spent</label>
          <span>45 mins</span>
        </div>
        <div className={styles.detailItem}>
          <label>Pass rate</label>
          <span style={{backgroundColor:calculateColor(75)}}>75%</span>
        </div>
        <div className={styles.detailItem}>
          <label>Start time</label>
          <span>10:32 AM</span>
        </div>
        <div className={styles.detailItem}>
          <label>End time</label>
          <span>11:40 AM</span>
        </div>
      </div>

      <div className={styles.reportCardWrapper}>
        <ReportCard />
      </div>
      <div className={styles.tableSection}>
      <div className={styles.tableWrapper}>
            <h3>Right answered questions</h3>
            <TableComponent
              headerData={[ "Question", "Marks"]}
              tableData={[{question:'How well do you understand the features, specifications,', marks:"04"}]}
              columns={[
                { key: "question" },
                { key: "marks" },
              ]}
            />
          </div>
      <div className={styles.tableWrapper}>
            <h3>Wrong answered questions</h3>
            <TableComponent
              headerData={[ "Question", "Marks"]}
              tableData={[{question:'How well do you understand the features, specifications,', marks:"04"}]}
              columns={[
                { key: "question" },
                { key: "marks" },
              ]}
            />
          </div>

      </div>
    </div>
  );
}
