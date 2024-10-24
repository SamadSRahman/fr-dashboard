import styles from './DealerPerformance.module.css';
import DateInputFeild from "../../components/DateInput/DateInputFeild";
import Dealercards from '../../components/Dealercards/Dealercards';
import Grid from '@mui/material/Grid';
import newsIcon from '../../assets/news.svg';

export default function DealerPerformance() {
  const cardData = [
    {
      region: "East",
      attendeduser: "323",
      passeduser: "245",
    },
    {
      region: "West",
      attendeduser: "223",
      passeduser: "134",
    },
    {
      region: "North",
      attendeduser: "543",
      passeduser: "523",
    },
    {
      region: "East",
      attendeduser: "323",
      passeduser: "245",
    },
    {
      region: "West",
      attendeduser: "223",
      passeduser: "134",
    },

    // Add more cards if needed
  ];

  return (
    <div className={styles.container}>
      <h3>Dealer Performance</h3>
      <div className="datasectionsection">
        <DateInputFeild />
      </div>


      <div className={styles.performacecontainer}>
      
      <div className={styles.cardheader}>
          <div style={{backgroundColor:'#C3BC00'}} className={styles.iconWrapper}>
          <img src={newsIcon} alt="newsIcon" />
          </div>
  
          <h3>Overall dealer performance</h3>
  
      </div>
  
      <div className={styles.carddata}>
      
        <div className={styles.minicard}>
        <p>Attended users</p>
        <h4>4450</h4>
        </div>
  
        <div className={styles.minicard}>
        <p>Passed users</p>
        <h4>3456</h4>
        </div>

      </div>

      <div className={styles.percentcard}>
      <button className={styles.percentageflag}>89%</button>
      </div>

      </div>


      {/* Grid container for cards */}
      <Grid container spacing={3} >
        {/* Map over cardData */}
        {cardData.map((card, ind) => (
          <Grid item xs={6} sm={4} md={2.3} key={ind}>
            <Dealercards
              region={card.region}
              attendeduser={card.attendeduser}
              passeduser={card.passeduser}
              index={ind}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
