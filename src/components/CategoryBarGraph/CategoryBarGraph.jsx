import PropTypes from "prop-types";
import { BarChart } from "@mui/x-charts/BarChart";
import styles from './CategoryBarGraph.module.css'

function CategoryBarGraph({ data }) {
  // Prepare labels and values for the chart
  const xLabels = data.map((item) => item.tag_name);
  console.log("xlabels", xLabels);

  const successRateData = data.map(
    (item) => `${Math.round(item.success_rate)}`
  ); // Positive values
  const inverseSuccessRateData = data.map(
    (item) => `${Math.round(item.success_rate - 100)}`
  ); // Negative values

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Category Wise Report</h3>

      </div>
      <BarChart
        // width={500}
        height={250}
        series={[
          {
            data: successRateData,
            label: "Success Rate",
            id: "successRateId",
            stack: "stack1",
            color: "#5AFD4B",
          },
          {
            data: inverseSuccessRateData,
            label: "Remaining Percentage",
            id: "inverseSuccessRateId",
            stack: "stack1",
            color: "#FA6F6F",
          },
        ]}
        yAxis={[
          {
            min: -100,
            max: 100,
            tickInterval: 25,
            ticks: [-100, -75, -50, -25, 0, 25, 50, 75, 100],          },
        ]}
        xAxis={[{ data: xLabels, scaleType: "band", categoryGapRatio: 0.8 }]}
        grid={{ horizontal: successRateData.length>0 }}
        sx={{ fontSize: "10px" }}
        slotProps={{
          legend: { hidden: true }, // Hide the legend
          tooltip: {
            formatter: (params) => `${params.value}%`, // Adding "%" to tooltip values
          },
        }}
        bottomAxis={{
          disableTicks:true,

          tickLabelStyle: {
            angle: 0,
            textAnchor: 'middle',
            fontSize: 10,
          },
        }}
      />
    </div>
  );
}

CategoryBarGraph.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      tag_name: PropTypes.string.isRequired,
      total_attempts: PropTypes.number.isRequired,
      correct_attempts: PropTypes.number.isRequired,
      success_rate: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CategoryBarGraph;
