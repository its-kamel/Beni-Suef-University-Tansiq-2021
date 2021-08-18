import React, { useEffect, useState, useRef } from "react"
import Navbar from "../Navbar/Navbar";
import './User.css'
import Button from '../../Constants/Button'
import TansiqModal from "./TansiqModal";
import ResultModal from "./ResultModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { putUserChoices } from "../../Services/userServices";
import { getDeadlineDates,putTanseeqStatus } from '../../Services/adminServices';
import PopUp from "../../Constants/PopUp";
import CountDown from "./CountDown"
import {getUser} from "../../Services/userServices"

function User() {
    const tansiqIcon = <FontAwesomeIcon icon={faChartBar} color="#f5ba13"/>
    const resultIcon = <FontAwesomeIcon icon={faGraduationCap} color="#f5ba13"/>
    const [isTansiqOpen, setIsTansiqOpen] = useState(false);
    const [isResultOpen, setIsResultOpen] = useState(false);   
    const [isSucces , setIsSuccess] = useState(false);
    const [isError , setIsError] = useState(false);
    const [isInfo , setIsInfo] = useState(false);
    const [isLogged , setIsLogged] = useState(false);
    const [name , setName] = useState("")
 
    function toggleTansiqModal(){
        setIsTansiqOpen(!isTansiqOpen);
    }

    function toggleErrorTansiq(){
        setIsTansiqOpen(!isTansiqOpen);
        handlePopUp();
        setIsError(true);
    }

    function toggleResultModal(){
        setIsResultOpen(!isResultOpen)
    }

    function toggleErrorResult(){
        setIsResultOpen(!isResultOpen)
        handlePopUp();
        setIsError(true);
    }

    function confirmChange(order){
        handlePopUp ()
        setIsTansiqOpen(false)
        setIsInfo(true);
        const orderToString = order.toString();
        // console.log(orderToString);
        // put request
        (async () => {
            const response = await putUserChoices(orderToString);
            // console.log(response)
            handlePopUp ()
            // console.log(isInfo)
            if (response.status == 200){
                handlePopUp ();
                setIsSuccess(true);
            }
            else{
                handlePopUp ();
                setIsError(true);
            }
          })(); 
    }

    function handlePopUp (){
        setIsSuccess(false);
        setIsError(false);
        setIsInfo(false);
        setIsLogged(false)
    }

    //Timer Section//////////////////////////////////////
    const[startTimerDays,setStartTimerDays]=useState('00')
    const[startTimerHours,setStartTimerHours]=useState('00')
    const[startTimerMinutes,setStartTimerMinutes]=useState('00')
    const[startTimerSeconds,setStartTimerSeconds]=useState('00')
    
    const[endTimerDays,setEndTimerDays]=useState('00')
    const[endTimerHours,setEndTimerHours]=useState('00')
    const[endTimerMinutes,setEndTimerMinutes]=useState('00')
    const[endTimerSeconds,setEndTimerSeconds]=useState('00')

    const [changeTime,toggleChangeTime]=useState(false);
    const [startDategetter,setStartDategetter]= useState(null)
    const [endDategetter,setEndDategetter]= useState(null)
    const [isStartTimer,setIsStartTimer]= useState(false)
    const [isEndTimer,setIsEndTimer]= useState(false)

    let StartInterval=useRef(0);    
    let EndInterval=useRef(0);    
    
    useEffect(()=>{
        (async () => {
            const response = await getDeadlineDates();
            const start= new Date(response.data.start_date)
            const end= new Date(response.data.end_date)

            setStartDategetter(start.toLocaleDateString())
            setEndDategetter(end.toLocaleDateString())      
           toggleChangeTime(!changeTime);
          })();

          (async () => {
            const response = await getUser();
            if (response.status == 200){
                setName(response.data.User.name);
                setIsLogged(true);
            } else{
                handlePopUp()
                setIsError(true);
            }
          })();

    },[])

    //start Date Timer

    useEffect(()=>{
        startTimer();
        return()=>{
            clearInterval(StartInterval.current);
        };  
    },[changeTime])

    

    let key=1;
    const startTimer=()=>{
        setIsEndTimer(false);
        setIsStartTimer(true);
        console.log(StartInterval);
        const startCountdownDate= new Date(startDategetter).getTime();
        StartInterval.current=setInterval(()=>{
            const now=new Date().getTime();
            const distance=startCountdownDate-now;


            const startDays=Math.floor(distance/(1000*60*60*24));
            const startHours=Math.floor((distance % (1000*60*60*24) / (1000*60*60)));
            const startMinutes=Math.floor((distance % (1000*60*60) / (1000*60)));
            const startSeconds=Math.floor((distance % (1000*60) / (1000)));

            if(distance<0 && key==1 )
            {
                
                (async () => {
                    const response = await putTanseeqStatus(true);
                    console.log(response);
                })();
                clearInterval(StartInterval.current)
                key=0;
                setIsStartTimer(false);
        
                

            }
            else if(distance<0 && key==0){
                clearInterval(StartInterval.current)
                setIsStartTimer(false);
            }
            else{
                setStartTimerDays(startDays)
                setStartTimerHours(startHours)
                setStartTimerMinutes(startMinutes)
                setStartTimerSeconds(startSeconds)
            }
            
        } , 1000)

    }
    //endDate timer

    useEffect(()=>{
        endTimer();
        return()=>{
            clearInterval(EndInterval.current);
        };  
    },[changeTime])

    let key_2=1;
    const endTimer=()=>{
        // setIsStartTimer(false);
        setIsEndTimer(true);
        console.log(EndInterval);
        const endCountdownDate= new Date(endDategetter).getTime();
        EndInterval.current=setInterval(()=>{
            const now=new Date().getTime();
            const distance=endCountdownDate-now;


            const endDays=Math.floor(distance/(1000*60*60*24));
            const endHours=Math.floor((distance % (1000*60*60*24) / (1000*60*60)));
            const endMinutes=Math.floor((distance % (1000*60*60) / (1000*60)));
            const endSeconds=Math.floor((distance % (1000*60) / (1000)));

            if(distance<0 && key_2==1 )
            {
                
                (async () => {
                    const response = await putTanseeqStatus(false);
                    console.log(response);
                })();
                clearInterval(EndInterval.current)
                key_2=0;
                setIsEndTimer(false);
                

            }
            else if(distance<0 && key_2==0){
                clearInterval(EndInterval.current)
                setIsEndTimer(false);
            }
            else{
                setEndTimerDays(endDays)
                setEndTimerHours(endHours)
                setEndTimerMinutes(endMinutes)
                setEndTimerSeconds(endSeconds)
            }
            
        } , 1000)

    }


    //Timer Section//////////////////////////////////////

    return( 
        <>
            <Navbar isLogged= {true} />
            <div className="user-body">
                <div className="layout-grid">
                    <Button
                        icon = {tansiqIcon}
                        text = " النتيجة"
                        onOpen = {toggleResultModal}
                    />
                    <Button
                        icon = {resultIcon}
                        text = "تسجيل الرغبات"
                        onOpen = {toggleTansiqModal}
                    />
                </div>

                {isStartTimer?(
                <CountDown message=" المتبقي من الزمن حتي فتح التنسيق" days={startTimerDays} hours={startTimerHours} minutes={startTimerMinutes} seconds={startTimerSeconds} />
                ):("")}

                {isEndTimer && !isStartTimer?(
                <CountDown message="المتبقي من الزمن حتي غلق التنسيق" days={endTimerDays} hours={endTimerHours} minutes={endTimerMinutes} seconds={endTimerSeconds} /> 
                ):("")} 
                
            </div>
            
            {isSucces && <PopUp type="success" title="نجحت العملية" message="تم حفظ التغيرات" onEnd={handlePopUp} interval={10000}/>}
            {isInfo && <PopUp type="info" title=" برجاء الانتظار" message=" جاري تنفيذ التغيرات " onEnd={handlePopUp} interval={4000}/>}
            {isLogged &&  <PopUp type="info" title="مرحبا بك!" message={name} onEnd={handlePopUp} interval={5000}/>}
            {isError &&  <PopUp type="error" title="لم تنجح العملية" message=" برجاء الانتظار، ثم المحاولة لاحقا" onEnd={handlePopUp} interval={5000}/>}
            {isTansiqOpen && <TansiqModal onConfirm={confirmChange} onClose={toggleTansiqModal} onError={toggleErrorTansiq}/>}
            {isResultOpen && <ResultModal onClose={toggleResultModal} onError={toggleErrorResult}/>}
        </>
    );
}

export default User;