import React ,{useState,useEffect}from 'react';
import Navbar from "../Navbar/Navbar";
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './Deadline.css'
import "../../Services/adminServices"
import { useHistory } from 'react-router-dom';
import { getDeadlineDates, putDeadlineDates, putTanseeqStatus } from '../../Services/adminServices';
import { DateRangeSharp } from '@material-ui/icons';
import { data } from 'jquery';

function deadline(props)  {
    const history=useHistory();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
    const [startDategetter,setStartDategetter]= useState(null)
    const [endDategetter,setEndDategetter]= useState(null)
    const todaysDate= new Date();
    useEffect(()=>{
        (async () => {
            const response = await getDeadlineDates();
            const start= new Date(response.data.start_date)
            const end= new Date(response.data.end_date)
            // setEndDate(end);
            
            // setStartDate(start);
            setStartDategetter(start.toLocaleDateString())
            setEndDategetter(end.toLocaleDateString())
            // console.log(start)
            // console.log(end)           
          })();

    })

    useEffect( () =>{
        const start=new Date(startDategetter)
        const end= new Date(endDategetter)
        // get dates -> string
        // console.log(todaysDate)
        console.log(start)
        console.log(end)
        console.log(todaysDate >= start &&todaysDate <= end)
        if (todaysDate.getFullYear() >= start.getFullYear()&&todaysDate.getMonth() >= start.getMonth()&&todaysDate.getDate() >= start.getDate() &&
        todaysDate.getFullYear() <= end.getFullYear()&&todaysDate.getMonth() <= end.getMonth()&&todaysDate.getDate() <= end.getDate()){
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
        
        
    },)

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
        // console.log(start.toISOString());
        // console.log(todaysDate.toISOString());
        console.log(startDate);
        // put dates
        // console.log(start.toUTCString());
        // console.log(end.toUTCString());
        // putDeadlineDates({start_date:start.toUTCString(),
        //     end_date:end.toUTCString()
        // })
        // .then(Response=>{console.log(Response);});
        
        
        (async () => {
            const response = await putDeadlineDates({start_date:start.toISOString(),end_date:end.toISOString()});
            console.log(response);
        })();
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
        <div>
            Start date: {startDategetter} <br/>
            end date: {endDategetter}
        </div>
        <div className='admin-layout'>
            <button className="button-layout" onClick={handleSaveDates}>حفظ</button>
            <button className="button-layout" onClick={() => history.push('/admin')}>عودة</button>

        </div>
        </div>
  
  
  
        
  
      </div>
    );
  };
  
  export default deadline;
  