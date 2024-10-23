import PropTypes from 'prop-types'
import styles from './BasicCard.module.css';
import newsIcon from '../../assets/news.svg';
import { colors } from '../../utils/data';


export default function BasicCard({text, value, index}) {
  return (
    <div className={styles.container}>
   <div style={index!==undefined?{backgroundColor: colors[index]}:{}} className={styles.iconWrapper}>
   <img src={newsIcon} alt="newsIcon" />
   </div>
        <div className={styles.textSection}>
            <span>{text}</span>
            <h4>{value}</h4>

        </div>
        </div>
  )
}

BasicCard.propTypes = {
    text: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    index : PropTypes.number
}