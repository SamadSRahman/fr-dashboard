import styles from "./ReportCard.module.css";
import reportImg from "../../assets/reportImg.png";
import downloadIcon from "../../assets/download.svg";
export default function ReportCard() {
  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
      <div className={styles.imgWrapper}>
        <img src={reportImg} alt="" />
      </div>
      <div className={styles.contentWrapper}>
        <h3>Report is ready</h3>
        <p>As per the filters chosen</p>
      </div>
      </div>
      <div className={styles.btnWrapper}>
        <button>
          Download Report
          <img src={downloadIcon} alt="" />
        </button>
      </div>
    </div>
  );
}
