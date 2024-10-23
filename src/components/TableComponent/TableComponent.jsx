import PropTypes from "prop-types";
import styles from "./TableComponent.module.css";
import arrowLeft from '../../assets/arrowLeft.svg'
import arrowRight from '../../assets/arrowRight.svg'

const TableComponent = ({ headerData, tableData, currentPage, onPageChange, totalPages }) => {
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
            key={row.name}
          >
            <td scope="row" align="center">
              {row.name}
            </td>
            <td align="center">{row.date}</td>
            <td align="center">{row.participants}</td>
            <td align="center">{row.rate}</td>
            <td align="center">{row.time}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
      <tr >
          <td colSpan={headerData.length} className={styles.paginationRow}>
          <div className={styles.paginationContainer}>
          <div className={styles.tableDataIndicator}>
            {tableData.length}/{totalPages}
            </div>
            <div className={styles.pageIndicator}>
               <button onClick={()=>onPageChange(currentPage+1)}> <img src={arrowLeft} alt="" /></button>
               <div className={styles.pageSection}>
               <span>{currentPage}</span>
               of {totalPages}
               </div>
               <button onClick={()=>onPageChange(currentPage+1)}> <img src={arrowRight} alt="" /></button>
            </div>
          </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default TableComponent;

TableComponent.propTypes = {
  headerData: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func
};
