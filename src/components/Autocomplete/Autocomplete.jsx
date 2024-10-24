import { useState, useRef, useEffect } from "react";
import styles from "./Autocomplete.module.css";
import arrowDown from "../../assets/arrow_drop_down.svg";
import PropTypes from "prop-types";

export default function AutocompleteComponent({
  listData,
  defaultValue,
  // data,
  label,
  onClose,
  // onSelect,
  setData,
}) {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [filterText, setFilterText] = useState(""); // For autocomplete input
  const [filteredData, setFilteredData] = useState(listData); // Filtered list
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  // Function to handle individual menu item clicks
  function handleMenuItemClick(ele) {
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
  }

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
    setFilteredData(
      listData.filter((item) =>
        item.toLowerCase().includes(filterText.toLowerCase())
      )
    );
  }, [filterText, listData]);

  useEffect(() => {
    // Set initial values
    setData(listData);
    setSelectedValues(listData);
  }, [listData]);

  const toggleExpand = () => {
    setIsDropDownVisible(!isDropDownVisible);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <label className={styles.labelText}>{label ? label : "label"}</label>

      <div className={styles.selectBox} onClick={toggleExpand}>
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

      {isDropDownVisible && (
        <div
          className={styles.dropDownContainer}
          ref={contentRef}
          style={
            isDropDownVisible
              ? {
                  maxHeight: `${
                    contentRef.current?.scrollHeight > window.innerHeight * 0.5
                      ? "50vh"
                      : `${contentRef?.current?.scrollHeight}px`
                  }`,
                  overflowY:
                    contentRef.current?.scrollHeight > window.innerHeight * 0.5
                      ? "auto"
                      : "visible",
                }
              : { maxHeight: "0px", padding: "0px" }
          }
        >
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className={styles.autoCompleteInput}
            placeholder="Type to search..."
          />

          <div className={styles.menu}>
            {/* Default "All" checkbox */}
          {filteredData.length>0 && (
              <label className={styles.menuItem}>
              <input
                type="checkbox"
                checked={selectedValues.length === listData.length}
                onChange={() => handleMenuItemClick(defaultValue)}
              />
              {defaultValue}
            </label>
          )}

            {/* Filtered list of items */}
            {filteredData.length > 0 ? (
              filteredData.map((ele) => (
                <label
                  key={ele}
                  className={styles.menuItem}
                  style={
                    selectedValues.includes(ele)
                      ? { color: "black", backgroundColor: "#F7F7F7" }
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

AutocompleteComponent.propTypes = {
  listData: PropTypes.array.isRequired,
  defaultValue: PropTypes.any.isRequired,
  data: PropTypes.any,
  label: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  setData: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
};
