import { DateRangePicker, } from 'rsuite';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import format from 'date-fns/format';
import { useState } from 'react';



const DateInputFeild = () => {
    const [value, setValue] = useState([
        new Date(),
        new Date()
      ]);



  return (
    <div>

    <DateRangePicker 
            format="MMM dd, yyyy" 
            renderValue={([start, end]) => {
                return format(start, 'MMM dd, yyyy') + ' - ' + format(end, 'MMM dd, yyyy');
            }}

            value={value}
            onChange={setValue}

            character=" – "  
            caretAs={CalendarMonthOutlinedIcon}  
            appearance="MMM dd, yyyy" 
            placeholder="Select the dates"
            defaultValue={[new Date(), new Date()]}
            defaultCalendarValue={[new Date(), new Date()]}

         />
    
    </div>
  ) 
}

export default DateInputFeild