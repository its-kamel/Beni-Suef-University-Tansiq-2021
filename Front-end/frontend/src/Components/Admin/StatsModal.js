import React, { useEffect, useState } from "react"
import './StatsModal.css'

function StatsModal(props){

    useEffect( () =>{

        // get request

    },[])

    return(
        <div className="modal__backdrop" >
            <div className="modal__container__Stats">
                <span className="close" onClick={props.onClose}>&times;</span>
                <h1 className="modal__title">الإحصاءات</h1>
            </div>
        </div>
    );
}

export default StatsModal;