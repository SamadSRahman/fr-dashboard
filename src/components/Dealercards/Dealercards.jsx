import PropTypes from "prop-types";
import styles from "./Dealercard.module.css";
import newsIcon from "../../assets/news.svg";
import { colors } from "../../utils/data";

const Dealercards = ({
  region,
  value1,
  value2,
  index,
  percentage,
  isMain,
  valueTitle1, valueTitle2
}) => {
  return (
    <div className={styles.container}
    
    style={isMain?{flexWrap:'nowrap', gap:'1rem'}:{}}>
      <div className={styles.cardheader}>
        <div
          style={index !== undefined && !isMain? { backgroundColor: colors[index] } : {backgroundColor:'#00C7F2'}}
          className={styles.iconWrapper}
        >
          <img src={newsIcon} alt="newsIcon" />
        </div>

        <h3>{region}</h3>
      </div>

      <div className={styles.carddata}>
        <div className={styles.minicard}>
          <p> {valueTitle1}</p>
          <h4> {value1}</h4>
        </div>

        <div className={styles.minicard}>
          <p> {valueTitle2}</p>
          <h4> {value2}</h4>
        </div>
        <div
          className={styles.percentageCard}
          style={{
            backgroundColor:
              percentage > 70
                ? "#5AFD4B"
                : percentage < 70 && percentage > 40
                ? "#FDCD4B"
                : "#FA6F6F",
          }}
        >
          {percentage}%
        </div>
      </div>
    </div>
  );
};

Dealercards.propTypes = {
  region: PropTypes.string.isRequired,
  value1: PropTypes.number.isRequired,
  value2: PropTypes.number.isRequired,
  percentage: PropTypes.number.isRequired,
  index: PropTypes.number,
  isMain: PropTypes.bool,
  valueTitle2 : PropTypes.string,
  valueTitle1 : PropTypes.string,
};

export default Dealercards;
