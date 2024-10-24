import PropTypes from 'prop-types'
import styles from "./Dealercard.module.css"
import newsIcon from '../../assets/news.svg';
import { colors } from '../../utils/data';

const Dealercards = ({ region, attendeduser, passeduser, index}) => {

  return (
    <div className={styles.container}>
      
    <div className={styles.cardheader}>
        <div style={index!==undefined?{backgroundColor: colors[index]}:{}} className={styles.iconWrapper}>
        <img src={newsIcon} alt="newsIcon" />
        </div>

        <h3>{region}</h3>

    </div>

    <div className={styles.carddata}>
    
      <div className={styles.minicard}>
      <p> Average score</p>
      <h4> {attendeduser}%</h4>
      </div>

      <div className={styles.minicard}>
      <p> Pass rate</p>
      <h4> {passeduser}%</h4>
      </div>

    </div>
    </div>
  )
}

Dealercards.propTypes = {
    region: PropTypes.string.isRequired,
    attendeduser: PropTypes.number.isRequired,
    passeduser: PropTypes.number.isRequired,
    percentage: PropTypes.number.isRequired,
    index : PropTypes.number
}

export default Dealercards;


