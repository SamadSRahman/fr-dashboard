import PropTypes from "prop-types";
import styles from "./TableComponent.module.css";
import arrowLeft from '../../assets/arrowLeft.svg'
import arrowRight from '../../assets/arrowRight.svg'

const TableComponent = ({ 
  headerData, 
  tableData, 
  columns, // New prop to define column configuration
  currentPage, 
  onPageChange, 
  totalPages 
}) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {headerData.map((header, index) => (
            <th key={index} className={styles.tableHeader}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr
            className={rowIndex % 2 === 0 ? styles.evenRow : styles.oddRow}
            key={rowIndex}
          >
            {columns.map((column) => (
              <td  key={column.key} align="center" >
                {column.render ? column.render(row[column.key], row) : row[column.key] }{column.key.includes('rate')||column.key.includes('percent')?"%":""}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={headerData.length} className={styles.paginationRow}>
            <div className={styles.paginationContainer}>
              <div className={styles.tableDataIndicator}>
                {tableData.length}/{totalPages}
              </div>
              <div className={styles.pageIndicator}>
                <button onClick={() => onPageChange(currentPage - 1)}>
                  <img src={arrowLeft} alt="" />
                </button>
                <div className={styles.pageSection}>
                  <span>{currentPage}</span>
                  of {totalPages}
                </div>
                <button onClick={() => onPageChange(currentPage + 1)}>
                  <img src={arrowRight} alt="" />
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

TableComponent.propTypes = {
  headerData: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    render: PropTypes.func
  })).isRequired,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func
};

export default TableComponent;