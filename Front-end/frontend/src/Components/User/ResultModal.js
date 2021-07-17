import React, { useEffect, useState } from "react"
import './ResultModal.css'
import { getResults } from "../../Services/userServices"

function ResultModal(props){

    const [message,setMessage] =useState("النتيجة")

    useEffect( () =>{

        // get request
        // getResults().then( response => {
        //     setMessage(response.data);
        // })

    },[message])

    return(
        <div className="modal__backdrop" >
            <div className="modal__container__Result">
                <span className="close" onClick={props.onClose}>&times;</span>
                <h1 className="modal__title">نتيجة التنسيق</h1>
                <p id="para">
                {message}
                </p>
                <button type="button" onClick={ () =>{
                    props.onClose();}}>
                    غلق
                </button>
            </div>
        </div>
    );
}

export default ResultModal;