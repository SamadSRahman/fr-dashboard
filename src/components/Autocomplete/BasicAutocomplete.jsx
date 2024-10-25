import { useState, useRef, useEffect } from "react";
import styles from "./Autocomplete.module.css";
import arrowDown from "../../assets/arrow_drop_down.svg";
import PropTypes from "prop-types";

export default function BasicAutocompleteComponent({
  listData,
  defaultValue,
  label,
  onClose,
  setData,
}) {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [filterText, setFilterText] = useState(""); // For autocomplete input
  const [filteredData, setFilteredData] = useState(listData); // Filtered list
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Handle click outside to close dropdown
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
    // Filter the list based on the input text
    const newFilteredList = listData.filter((item) =>
      item.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredData(newFilteredList);
  }, [filterText, listData]);

  const handleMenuItemClick = (ele) => {
    // Set selected value and close the dropdown
    setSelectedValue(ele);
  setData(ele); // Pass the selected value to parent
    setIsDropDownVisible(false); // Close the dropdown after selection
  };

  const toggleExpand = () => {
    setIsDropDownVisible(!isDropDownVisible);
  };

  const handleOnFilterInput = (e) => {
    setFilterText(e.target.value);
  };
  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);
  return (
    <div className={styles.container} ref={containerRef}>
      <label className={styles.labelText}>{label ? label : "label"}</label>

      <div className={styles.selectBox} onClick={toggleExpand}>
        <label>{selectedValue}</label>
        <img
          style={isDropDownVisible ? { transform: "rotate(180deg)" } : {}}
          src={arrowDown}
          alt="dropdown arrow"
        />
      </div>

      {isDropDownVisible && (
        <div
          className={styles.dropDownContainer}
          ref={contentRef}
          style={
            isDropDownVisible
              ? {
                  maxHeight: `${
                    (contentRef.current?.scrollHeight || 0) +
                      listData.length * 25 >
                    window.innerHeight * 0.5
                      ? "50vh"
                      : `${
                          (contentRef.current?.scrollHeight || 0) +
                          listData.length * 30
                        }px`
                  }`,
                  overflowY:
                    contentRef.current?.scrollHeight > window.innerHeight * 0.5
                      ? "auto"
                      : "scroll",
                }
              : { maxHeight: "0px", padding: "0px" }
          }
        >
          <input
            type="text"
            value={filterText}
            onChange={handleOnFilterInput}
            className={styles.autoCompleteInput}
            placeholder="Type to search..."
          />

          <div className={styles.menu}>
            {/* Filtered list of items */}
            {filteredData.length > 0 ? (
              filteredData.map((ele) => (
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
              ))
            ) : (
              <div className={styles.noItems}>No matching items</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

BasicAutocompleteComponent.propTypes = {
  listData: PropTypes.array.isRequired,
  defaultValue: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  setData: PropTypes.func.isRequired,
};
