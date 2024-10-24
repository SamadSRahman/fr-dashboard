import { useState, useRef, useEffect } from "react";
import styles from "./select.module.css";
import arrowDown from "../../assets/arrow_drop_down.svg";
import PropTypes from "prop-types";

export default function SelectComponent({
  listData,
  defaultValue,
  label,
  onClose,
  setData,
}) {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);

  const containerRef = useRef(null);
  const contentRef = useRef(null);

  // Function to handle individual menu item clicks
  function handleMenuItemClick(ele) {
    console.log("clicked");

    if (ele === defaultValue) {
      if (selectedValues.length === listData.length) {
        // Deselect all if all are selected
        setSelectedValues([]);
        setData([]);
      } else {
        // Select all if not all are selected
        setSelectedValues(listData);
        setData(listData);
      }
    } else {
      const isAlreadySelected = selectedValues.includes(ele);
      const updatedSelectedValues = isAlreadySelected
        ? selectedValues.filter((item) => item !== ele) // Deselect
        : [...selectedValues, ele]; // Select
      setSelectedValues(updatedSelectedValues);
      setData(updatedSelectedValues);
    }
    // setIsDropDownVisible(false);
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

  useEffect(() => {
    setData(listData);
    setSelectedValues(listData);
  }, [listData]);

  return (
    <div className={styles.container} ref={containerRef}>
      <label className={styles.labelText}>{label ? label : "label"}</label>
      <div
        className={styles.selectBox}
        onClick={() => setIsDropDownVisible(!isDropDownVisible)}
      >
        <label>
          {selectedValues.length > 0 &&
          selectedValues.length !== listData.length
            ? selectedValues.join(", ")
            : defaultValue}
        </label>
        <img
          style={isDropDownVisible ? { transform: "rotate(180deg)" } : {}}
          src={arrowDown}
          alt=""
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
          <label
            className={styles.menuItem}
            style={
              selectedValues.length === listData.length
                ? {
                    color: "#ED3B4B",
                    backgroundColor: "#FDE8EA",
                    padding: isDropDownVisible ? "10px 15px" : "0px",
                  }
                : {}
            }
          >
            <input
              type="checkbox"
              checked={selectedValues.length === listData.length}
              onChange={() => handleMenuItemClick(defaultValue)}
            />
            {defaultValue}
          </label>
          {listData?.map((ele) => (
            <label
              key={ele}
              className={styles.menuItem}
              style={
                // isDropDownVisible?{padding:'10px 15px', color:selectedValues.includes(ele)?'':}:{}
                selectedValues.includes(ele)
                  ? {
                      color: "#ED3B4B",
                      backgroundColor: "#FDE8EA",
                      padding: isDropDownVisible ? "10px 15px" : "0px",
                    }
                  : {}
              }
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(ele)}
                onChange={() => handleMenuItemClick(ele)}
              />
              {ele}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

SelectComponent.propTypes = {
  listData: PropTypes.array.isRequired,
  defaultValue: PropTypes.any.isRequired,
  data: PropTypes.any,
  label: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  setData: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
};
