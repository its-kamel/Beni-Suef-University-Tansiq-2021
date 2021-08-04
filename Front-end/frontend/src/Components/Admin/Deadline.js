import React ,{useRef,useState,useEffect}from 'react';
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
import moment from "moment";

function deadline(props)  {
    const history=useHistory();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
    const [startDategetter,setStartDategetter]= useState(null)
    const [endDategetter,setEndDategetter]= useState(null)
    const [changeTime,toggleChangeTime]=useState(false);
    const [isChanged,toggleIsChanged]=useState(false);
    
    // const[startTimerDays,setStartTimerDays]=useState('00')
    // const[startTimerHours,setStartTimerHours]=useState('00')
    // const[startTimerMinutes,setStartTimerMinutes]=useState('00')
    // const[startTimerSeconds,setStartTimerSeconds]=useState('00')
    
    // const[endTimerDays,setEndTimerDays]=useState('00')
    // const[endTimerHours,setEndTimerHours]=useState('00')
    // const[endTimerMinutes,setEndTimerMinutes]=useState('00')
    // const[endTimerSeconds,setEndTimerSeconds]=useState('00')

    // let StartInterval=useRef(0);    
    // let EndInterval=useRef(0);    

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
           toggleChangeTime(!changeTime);
          })();
          

    },[isChanged])

    // useEffect(()=>{
    //     startTimer();
    //     return()=>{
    //         clearInterval(StartInterval.current);
    //     };  
    // },[changeTime])



    // let key=1;
    // const startTimer=()=>{
    //     console.log(StartInterval);
    //     const startCountdownDate= new Date(startDategetter).getTime();
    //     StartInterval.current=setInterval(()=>{
    //         const now=new Date().getTime();
    //         const distance=startCountdownDate-now;


    //         const startDays=Math.floor(distance/(1000*60*60*24));
    //         const startHours=Math.floor((distance % (1000*60*60*24) / (1000*60*60)));
    //         const startMinutes=Math.floor((distance % (1000*60*60) / (1000*60)));
    //         const startSeconds=Math.floor((distance % (1000*60) / (1000)));

    //         if(distance<0 && key==1 )
    //         {
                
    //             (async () => {
    //                 const response = await putTanseeqStatus(true);
    //                 console.log(response);
    //             })();
    //             clearInterval(StartInterval.current)
    //             key=0;
                

    //         }
    //         else if(distance<0 && key==0){
    //             clearInterval(StartInterval.current)
    //         }
    //         else{
    //             setStartTimerDays(startDays)
    //             setStartTimerHours(startHours)
    //             setStartTimerMinutes(startMinutes)
    //             setStartTimerSeconds(startSeconds)
    //         }
            
    //     } , 1000)

    // }




    // useEffect(()=>{
    //     endTimer();
    //     return()=>{
    //         clearInterval(EndInterval.current);
    //     };  
    // },[changeTime])

    // let key_2=1;
    // const endTimer=()=>{
    //     console.log(EndInterval);
    //     const endCountdownDate= new Date(endDategetter).getTime();
    //     EndInterval.current=setInterval(()=>{
    //         const now=new Date().getTime();
    //         const distance=endCountdownDate-now;


    //         const endDays=Math.floor(distance/(1000*60*60*24));
    //         const endHours=Math.floor((distance % (1000*60*60*24) / (1000*60*60)));
    //         const endMinutes=Math.floor((distance % (1000*60*60) / (1000*60)));
    //         const endSeconds=Math.floor((distance % (1000*60) / (1000)));

    //         if(distance<0 && key_2==1 )
    //         {
                
    //             (async () => {
    //                 const response = await putTanseeqStatus(false);
    //                 console.log(response);
    //             })();
    //             clearInterval(EndInterval.current)
    //             key_2=0;
                

    //         }
    //         else if(distance<0 && key_2==0){
    //             clearInterval(EndInterval.current)
    //         }
    //         else{
    //             setEndTimerDays(endDays)
    //             setEndTimerHours(endHours)
    //             setEndTimerMinutes(endMinutes)
    //             setEndTimerSeconds(endSeconds)
    //         }
            
    //     } , 1000)

    // }
    // useEffect( () =>{
    //     const start=new Date(startDategetter)
    //     const end= new Date(endDategetter)
    //     // get dates -> string
    //     // console.log(todaysDate)
    //     console.log(start)
    //     console.log(end)
    //     console.log(todaysDate >= start &&todaysDate <= end)
    //     if (todaysDate.getFullYear() >= start.getFullYear()&&todaysDate.getMonth() >= start.getMonth()&&todaysDate.getDate() >= start.getDate() &&
    //     todaysDate.getFullYear() <= end.getFullYear()&&todaysDate.getMonth() <= end.getMonth()&&todaysDate.getDate() <= end.getDate()){
    //         // put request -> isEnabled = true
    //         // putTanseeqStatus(true)
    //         //     .then(Response=>{console.log(Response);});
    //         (async () => {
    //         const response = await putTanseeqStatus(true);
    //         console.log(response);
    //       })();
    //     }
    //     else{
    //         // put request -> isEnabled = false
    //         // putTanseeqStatus(false)
    //         //     .then(Response=>{console.log(Response);});
    //         (async () => {
    //             const response = await putTanseeqStatus(false);
    //             console.log(response);
    //         })();

    //     }
        
        
    // },)
    

    const handleSaveDates=()=>{
        if(startDate && endDate)
        {

        
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
            
            
            (async () => {
                const response = await putDeadlineDates({start_date:start.toISOString(),end_date:end.toISOString()});
                console.log(response);
            })();
            key=1;
            toggleIsChanged(!isChanged);
        }

        }
    function isOutsideRange(day) {
        return (moment().diff(day) >1);
        }

    return (
      <div>
          {<Navbar
          isLogged= {false}
          />}
        
        
        <div className='deadlineBody'>
            <h className="deadlineTitle"> برجاء تحديد فترة تسجيل الرغبات  </h>
        <DateRangePicker
            startDate={startDate}
            startDateId="s_id"
            endDate={endDate}
            endDateId="e_id"
            onDatesChange={({ startDate, endDate }) => {setStartDate(startDate); setEndDate(endDate); }}
            focusedInput={focusedInput}
            onFocusChange={e => setFocusedInput(e)}
            displayFormat="DD/MM/YYYY"
            isOutsideRange={isOutsideRange}
            />
        <div > إختر على ان يكون تارخ البدء كحد أدنى غدا  </div>

        <div>
            Start date: {startDategetter} <br/>
            end date: {endDategetter}<br/>
            {/* starts in : {startTimerDays}:{startTimerHours}:{startTimerMinutes}:{startTimerSeconds}<br/>
            Ends in : {endTimerDays}:{endTimerHours}:{endTimerMinutes}:{endTimerSeconds} */}
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
  