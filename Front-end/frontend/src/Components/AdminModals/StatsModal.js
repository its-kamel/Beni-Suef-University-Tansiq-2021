import React, { useEffect, useState } from "react"
import './StatsModal.css'
import Chart from "react-google-charts";
import DistributionChart from "../Charts/DistributionChart";
import ChoicesChart from "../Charts/ChoicesChart";
import TableChart from "../Charts/TableChart";

function StatsModal(props){

    return(
        <div className="modal__backdrop" >
            <div className="modal__container__Stats">
                <span className="close-charts" onClick={props.onClose}>&times;</span>
                <h1 className="modal__title">الإحصاءات</h1>
                {/* charts test */}
                <div className="charts">

                    {/* pie chart */}
                    <DistributionChart /><hr className="separator"/>

                    {/* stacked bar chart */}
                    <ChoicesChart /><hr className="separator2"/>

                    {/* table chart */}
                    <TableChart />
                    
                    {/* <div style={{ display: 'flex', maxWidth: 1500 }}></div> */}
                </div>
            </div>
        </div>
    );
}

export default StatsModal;