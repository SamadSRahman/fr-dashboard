import styles from "./SideBar.module.css";
import icon from "../../assets/logoIcon.svg";
import menu from "../../assets/menu.svg";
import { routes } from "../../utils/data";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [currentPage, setCurrentPage] = useState("");
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(()=>{
    setCurrentPage(location.pathname)    
  },[location])
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
              currentPage === item.route
                ? { backgroundColor: "var(--accent-color-red)", color: "white", fontWeight:'bold', opacity:'0.8' }
                : {}
            }
            onClick={() => navigate(item.route)}
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
