import styles from "./Header.module.css";
import helpIcon from '../../assets/bell.svg'
import bellIcon from '../../assets/question.svg'
import adminIcon from '../../assets/account_circle.svg'
import arrowDown from  '../../assets/arrow_drop_down.svg'

export default function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <img src={helpIcon} alt="" />
      </div>
      <div className={styles.iconContainer}>
        <img src={bellIcon} alt="" />
      </div>
        <div className={styles.adminSection}>
        <div className={styles.iconContainer}>
            <img style={{width:'20px'}} src={adminIcon} alt="" />
            
        </div>
        <span>Admin</span>
        <img src={arrowDown} alt="" />
        </div>
    </div>
  );
}
