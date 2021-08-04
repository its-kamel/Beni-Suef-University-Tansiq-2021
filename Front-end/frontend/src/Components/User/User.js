import React, { useEffect, useState } from "react"
import Navbar from "../Navbar/Navbar";
import './User.css'
import Button from '../../Constants/Button'
import TansiqModal from "./TansiqModal";
import ResultModal from "./ResultModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { putUserChoices } from "../../Services/userServices";
import PopUp from "../../Constants/PopUp";

function User() {
    const tansiqIcon = <FontAwesomeIcon icon={faChartBar} color="#f5ba13"/>
    const resultIcon = <FontAwesomeIcon icon={faGraduationCap} color="#f5ba13"/>
    const [isTansiqOpen, setIsTansiqOpen] = useState(false);
    const [isResultOpen, setIsResultOpen] = useState(false);   
    const [isSucces , setIsSuccess] = useState(false);
    const [isError , setIsError] = useState(false);
    const [isInfo , setIsInfo] = useState(false)
 
    function toggleTansiqModal(){
        setIsTansiqOpen(!isTansiqOpen)
    }

    function toggleResultModal(){
        setIsResultOpen(!isResultOpen)
    }

    function confirmChange(order){
        setIsTansiqOpen(false)
        setIsInfo(true);
        const orderToString = order.toString()
        console.log(orderToString);
        // put request
        (async () => {
            const response = await putUserChoices(orderToString);
            console.log(response)
            if (response.status == 200){
                handlePopUp ()
                console.log(response.status)
                setIsSuccess(true);
            }
          })(); 
          console.log(isSucces)
    }

    function handlePopUp (){
        setIsSuccess(false);
        setIsError(false);
        setIsInfo(false);
    }

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
            </div>
            {isSucces && <PopUp type="success" title="نجحت العملية" message="تم حفظ التغيرات" onEnd={handlePopUp} interval={7000}/>}
            {isInfo && <PopUp type="info" title=" برجاء الانتظار" message=" جاري تنفيذ التغيرات " onEnd={handlePopUp} interval={4000}/>}
            {isTansiqOpen && <TansiqModal onConfirm={confirmChange} onClose={toggleTansiqModal}/>}
            {isResultOpen && <ResultModal onClose={toggleResultModal}/>}
        </>
    );
}

export default User;