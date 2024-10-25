import { axisClasses, BarChart } from '@mui/x-charts'
import PropTypes from 'prop-types'
import styles from './ProfileGraph.module.css'

function ProfileGraph({chartData}) {
    const chartSetting = {
        yAxis: [
          {
            label: 'Complaints',
          },
        ],
        width: 400,
        height: 250,
        sx: {
          [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-15px, 0)',
          },
          marginLeft:"50px"
        },
      };
    
      const calculateColor = (percentage) => {
        if (percentage <= 35) {
          return "#FA6F6F"; // Red for <= 35%
        } else if (percentage <= 75) {
          return "#FDCD4B"; // Yellow for <= 75%
        } else {
          return "#5AFD4B"; // Green for > 75%
        }
      };
    
    
      let colors = chartData.map((stat) => {
        const percentage = (stat.profile_updated / stat.total_users) * 100;
        return calculateColor(percentage);
      });
      colors.unshift("#00C7F2")

  return (
    <div className={styles.container} >
        <div className={styles.header}>
            <h3>Total profiles Vs Up to date profiles</h3>

        </div>
        <div className={styles.legendsSection}>
            <div className={styles.legend}>
                <label >Total profiles</label>
                    <div className={styles.legendIndicator} style={{backgroundColor:'#00C7F2'}}></div>

            </div>
            <div className={styles.legend}>
                <label >Up to date profile</label>
              <div className={styles.indicatorSection}>
              <div className={styles.legendIndicator} style={{backgroundColor:'#FA6F6F'}}></div>
                <label htmlFor="">{`<=35%`}</label>
                <div className={styles.legendIndicator} style={{backgroundColor:'#FDCD4B'}}></div>
                <label htmlFor="">{`<=75%`}</label>
                <div className={styles.legendIndicator} style={{backgroundColor:'#5AFD4B'}}></div>
                <label htmlFor="">{`<=100%`}</label>
              </div>

            </div>
        </div>
        <BarChart
      dataset={chartData}
      xAxis={[{ scaleType: 'band', dataKey: 'portal', categoryGapRatio: 0.8 }]}
      series={[
      
        { dataKey: 'profile_updated', },
        { dataKey: 'total_users', },
      
      ]}
      grid={{ horizontal: true }}
      {...chartSetting}
      colors={colors}
    />
    </div>
  )
}

ProfileGraph.propTypes = {
    chartData: PropTypes.array
}

export default ProfileGraph
