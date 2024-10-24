import { DateRangePicker } from "rsuite";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import format from "date-fns/format";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types'

const DateInputFeild = ({setDates}) => {
  const [value, setValue] = useState([new Date(), new Date()]);
  useEffect(()=>{setDates(value)},[value])
  return (
    <div>
      <DateRangePicker
        format="MMM dd, yyyy"
        renderValue={([start, end]) => {
          return (
            format(start, "MMM dd, yyyy") + " - " + format(end, "MMM dd, yyyy")
          );
        }}
        value={value}
        onChange={setValue}
        character=" – "
        caretAs={CalendarMonthOutlinedIcon}
        appearance="MMM dd, yyyy"
        placeholder="Select the dates"
        defaultValue={[new Date(), new Date()]}
        defaultCalendarValue={[new Date(), new Date()]}
        style={{
        }}
      />
    </div>
  );
};

DateInputFeild.propTypes = {
  setDates: PropTypes.func
}
export default DateInputFeild;
