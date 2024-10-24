import styles from './Profile.module.css'
import { PieChart } from '@mui/x-charts/PieChart';

export default function Profile() {
  return (
    <div className={styles.container}>

      <h3>
      Profile
      </h3>

     

<PieChart
  series={[
    
    {
          arcLabel: (item) => `${item.value}%`,
          arcLabelMinAngle: 1,
          arcLabelRadius: '50%',
          data: [
            { id: 0, value: 10, label: 'series A' },
            { id: 1, value: 15, label: 'series B' },
            { id: 2, value: 20, label: 'series C' },
          ],
       
      innerRadius: 60,
      outerRadius: 90,
      paddingAngle: 0,
      cornerRadius: 0,
      startAngle: -45,
      endAngle: 360,
      cx: 150,
      cy: 150,
   
    }
  ]}
  width={400}
  height={500}
/>
    </div>
  )
}
