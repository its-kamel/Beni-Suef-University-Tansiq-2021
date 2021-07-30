import React ,{useState,useEffect}from 'react';
import Navbar from "../Navbar/Navbar";
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './Deadline.css'
import "../../Services/adminServices"
import { useHistory } from 'react-router-dom';
import { putDeadlineDates, putTanseeqStatus } from '../../Services/adminServices';

function deadline(props)  {
    const history=useHistory();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
    const todaysDate= new Date();
    useEffect( () =>{

        // get dates -> string
        
        if (todaysDate >= startDate &&todaysDate <= endDate){
            // put request -> isEnabled = true
            // putTanseeqStatus(true)
            //     .then(Response=>{console.log(Response);});
            (async () => {
            const response = await putTanseeqStatus(true);
            console.log(response);
          })();
        }
        else{
            // put request -> isEnabled = false
            // putTanseeqStatus(false)
            //     .then(Response=>{console.log(Response);});
            (async () => {
                const response = await putTanseeqStatus(false);
                console.log(response);
            })();

        }

    },[todaysDate.getDate()])

    const handleSaveDates=()=>{
        const start= new Date(startDate);
        const end= new Date(endDate);
        // const todaysDate= new Date();
        // console.log(start.getMonth()+1)
        // console.log(start.getDate())
        // console.log(start.getFullYear())
        // console.log(todaysDate.getDate());
        // console.log(todaysDate.getMonth()+1);
        // console.log(todaysDate.getFullYear())

        // put dates
        console.log(start.toUTCString());
        console.log(end.toUTCString());
        // putDeadlineDates({start_date:start.toUTCString(),
        //     end_date:end.toUTCString()
        // })
        // .then(Response=>{console.log(Response);});
        
        
        // (async () => {
        //     const response = await putDeadlineDates({start_date:start.toUTCString(),end_date:end.toUTCString()});
        //     console.log(response);
        // })();
        }

    return (
      <div>
          {<Navbar
          isLogged= {false}
          />}
        
        
        <div className='deadlineBody'>
            <h className="deadlineTitle"> برجاء تحديد فترة تسجيل الرغبات </h>

        <DateRangePicker
            startDate={startDate}
            startDateId="s_id"
            endDate={endDate}
            endDateId="e_id"
            onDatesChange={({ startDate, endDate }) => {setStartDate(startDate); setEndDate(endDate); }}
            focusedInput={focusedInput}
            onFocusChange={e => setFocusedInput(e)}
            displayFormat="DD/MM/YYYY"
            />
        <div>Start Date: {startDate && startDate.format('ll')}<br />
        
        End Date: {endDate && endDate.format('ll')}</div>
        <div className='admin-layout'>
            <button className="button-layout" onClick={handleSaveDates}>حفظ</button>
            <button className="button-layout" onClick={() => history.push('/admin')}>عودة</button>

        </div>
        </div>
  
  
  
        
  
      </div>
    );
  };
  
  export default deadline;
  