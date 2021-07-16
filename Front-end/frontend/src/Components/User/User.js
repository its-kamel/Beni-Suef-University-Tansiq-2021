import React, { useState } from "react"
import Navbar from "../Navbar/Navbar";
import './User.css'
import Button from '../../Constants/Button'
import TansiqModal from "./TansiqModal";
import ResultModal from "./ResultModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { putUserChoices } from "../../Services/userServices";
import StatsModal from "../Admin/StatsModal";

function User() {
    const tansiqIcon = <FontAwesomeIcon icon={faChartBar} color="#f5ba13"/>
    const resultIcon = <FontAwesomeIcon icon={faGraduationCap} color="#f5ba13"/>
    const [isTansiqOpen, setIsTansiqOpen] = useState(false)
    const [isResultOpen, setIsResultOpen] = useState(false)
    const [isStatsOpen, setIsStatsOpen] = useState(false)

    function openTansiqModal(){
        setIsTansiqOpen(true)
    }

    function toggleResultModal(){
        setIsResultOpen(!isResultOpen)
    }

    function confirmChange(order){
        setIsTansiqOpen(false)
        console.log(order);
        //put request
        // putUserChoices(order).then( response => {
        //     console.log(response);
        // });
    }

    // test stats
    function toggleStatsModal(){
        setIsStatsOpen(!isStatsOpen);
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
                        onOpen = {openTansiqModal}
                    />

                    {/* test stats */}
                    <Button
                        icon = {resultIcon}
                        text = "تسجيل الرغبات"
                        onOpen = {toggleStatsModal}
                    />

                </div>
            </div>
            {isTansiqOpen && <TansiqModal onConfirm={confirmChange}/>}
            {isResultOpen && <ResultModal onClose={toggleResultModal}/>}
            {isStatsOpen && <StatsModal onClose={toggleStatsModal}/>}
        </>
    );
}

export default User;