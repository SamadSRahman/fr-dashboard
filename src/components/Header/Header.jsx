import styles from "./Header.module.css";
import adminIcon from "../../assets/account_circle.svg";
import arrowDown from "../../assets/arrow_drop_down.svg";
import logoutIcom from "../../assets/logout.svg";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const containerRef = useRef();
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsDropDownVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div
        className={styles.adminSection}
        onClick={() => setIsDropDownVisible((pv) => !pv)}
      >
        <div className={styles.iconContainer}>
          <img style={{ width: "20px" }} src={adminIcon} alt="" />
        </div>
        <span className={styles.nameSpan}>
          {localStorage.getItem("firstName")}
        </span>
        <img src={arrowDown} alt="" />
      </div>

      <div
        style={isDropDownVisible ? {} : { height: "0px", padding: "0px" }}
        className={styles.dropDownContainer}
      >
        <button className={styles.logoutBtn} onClick={handleLogout}>
          {" "}
          <img src={logoutIcom} alt="" /> Logout{" "}
        </button>
      </div>
    </div>
  );
}
