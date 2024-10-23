import { useState, useRef, useEffect } from "react";
import styles from "./select.module.css";
import arrowDown from "../../assets/arrow_drop_down.svg";
import PropTypes from "prop-types";

export default function SelectComponent({
  listData,
  defaultValue,
  data,
  label,
  onClose,
  onSelect,
  setData,
}) {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  function handleMenuItemClick(ele) {
    if (ele === "All organizations") {
      setSelectedValue("All organizations");
      setData("");
    } else {
      setSelectedValue(ele);
      setData(ele);
    }
    setIsDropDownVisible(false);
  }
  // useEffect(()=>{setName(selectedValue)},[selectedValue])
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
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <label className={styles.labelText}>{label ? label : "label"}</label>
      <div
        className={styles.selectBox}
        onClick={() => setIsDropDownVisible(!isDropDownVisible)}
      >
        <label>{selectedValue}</label>
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
            ? { maxHeight: `${contentRef.current.scrollHeight}px` }
            : { maxHeight: "0px", padding: "0px" }
        }
        // style={{ maxHeight: isDropDownVisible ? `${contentRef.current.scrollHeight}px` : '0' }}
      >
        <div className={styles.menu}>
          <label
            style={
              selectedValue === defaultValue
                ? { color: "black", backgroundColor: "#F7F7F7" }
                : {}
            }
            onClick={() => handleMenuItemClick(defaultValue)}
            className={styles.menuItem}
          >
            {defaultValue}
          </label>

          {listData?.map((ele) => (
            <label
              style={
                selectedValue === ele
                  ? { color: "black", backgroundColor: "#F7F7F7" }
                  : {}
              }
              key={ele}
              //   style={selectedValue}
              className={styles.menuItem}
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

SelectComponent.propTypes = {
  listData: PropTypes.array,
  defaultValue: PropTypes.any,
  data: PropTypes.any,
  label: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  setData: PropTypes.func,
  onSelect: PropTypes.func,
};
