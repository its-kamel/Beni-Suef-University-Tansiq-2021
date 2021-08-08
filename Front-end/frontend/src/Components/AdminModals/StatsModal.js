import React, { useEffect, useState } from "react"
import './StatsModal.css'
import Chart from "react-google-charts";
import DistributionChart from "../Charts/DistributionChart";
import ChoicesChart from "../Charts/ChoicesChart";
import TableChart from "../Charts/TableChart";
import PopUp from "../../Constants/PopUp";

function StatsModal(props){

    const [isInfo , setIsInfo] = useState(true);

    function handlePopUp (){
        setIsSuccess(false);
        setIsError(false);
        setIsInfo(false);
        setIsLogged(false)
    }

    return(
        <div className="modal__backdrop" >
            <div className="modal__container__Stats">
                <span className="close-charts" onClick={props.onClose}>&times;</span>
                <h1 className="modal__title">الإحصاءات</h1>
                {/* charts test */}
                <div className="charts">

                    {/* pie chart */}
                    <DistributionChart onError={props.onError}/><hr className="separator"/>

                    {/* stacked bar chart */}
                    <ChoicesChart onError={props.onError}/><hr className="separator2"/>

                    {/* table chart */}
                    <TableChart onError={props.onError}/>
                    
                    {/* <div style={{ display: 'flex', maxWidth: 1500 }}></div> */}
                </div>
            </div>
            {isInfo && <PopUp type="info" title=" برجاء الانتظار" message=" جاري حساب الإحصاءات  " onEnd={handlePopUp} interval={8000}/>}
        </div>
    );
}

export default StatsModal;