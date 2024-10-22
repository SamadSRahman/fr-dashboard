import styles from "./Sidebar.module.css";
import icon from "../../assets/logoIcon.svg";
import menu from "../../assets/menu.svg";
import { routes } from "../../utils/data";
import { useState } from "react";

export default function Sidebar() {
  const [currentPage, setCurrentPage] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src={icon} alt="" />
        <h3>
          TOYOTA <span>FR</span>
        </h3>
      </div>
      <div className={styles.menuSection}>
        <div className={styles.menuIcon}>
          <img src={menu} alt="" />
        </div>
        {routes.map((item) => (
          <div
            style={
              currentPage === item.name
                ? { backgroundColor: "var(--accent-color-red)", color: "white" }
                : {}
            }
            onClick={() => setCurrentPage(item.name)}
            className={styles.menuItem}
            key={item.name}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
