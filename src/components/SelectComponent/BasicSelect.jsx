import { useState, useRef, useEffect } from "react";
import styles from "./select.module.css";
import arrowDown from "../../assets/arrow_drop_down.svg";
import PropTypes from "prop-types";

export default function BasicSelect({
  listData,
  defaultValue,
  label,
  onClose,
  setData,
}) {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const containerRef = useRef(null);
  const contentRef = useRef(null);

  // Function to handle single item selection
  function handleMenuItemClick(ele) {
    console.log("clicked", ele);
    setSelectedValue(ele);
    setData(ele); // Update the parent component with the selected value
    setIsDropDownVisible(false); // Close the dropdown after selection
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsDropDownVisible(false);
        if (onClose) {
          onClose();
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef, onClose]);

  return (
    <div className={styles.container} ref={containerRef}>
      <label className={styles.labelText}>{label ? label : "label"}</label>
      <div
        className={styles.selectBox}
        onClick={() => setIsDropDownVisible(!isDropDownVisible)}
      >
        <label>{selectedValue || defaultValue}</label>
        <img
          style={isDropDownVisible ? { transform: "rotate(180deg)" } : {}}
          src={arrowDown}
          alt="dropdown arrow"
        />
      </div>

      <div
        className={styles.dropDownContainer}
        ref={contentRef}
        style={
          isDropDownVisible
            ? {
                maxHeight: `${
                  contentRef.current.scrollHeight + listData.length * 25 >
                  window.innerHeight * 0.5
                    ? "50vh"
                    : `${
                        contentRef.current.scrollHeight + listData.length * 30
                      }px`
                }`,
                overflowY:
                  contentRef.current.scrollHeight > window.innerHeight * 0.5
                    ? "auto"
                    : "visible",
              }
            : { maxHeight: "0px", padding: "0px" }
        }
      >
        <div className={styles.menu}>
          {listData?.map((ele) => (
            <label
              key={ele}
              className={styles.menuItem}
              style={
                selectedValue === ele
                  ? {
                      color: "#ED3B4B",
                      backgroundColor: "#FDE8EA",
                      padding: isDropDownVisible ? "10px 15px" : "0px",
                    }
                  : {}
              }
              onClick={() => handleMenuItemClick(ele)}
            >
              {ele}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

BasicSelect.propTypes = {
  listData: PropTypes.array.isRequired,
  defaultValue: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  setData: PropTypes.func.isRequired,
};
