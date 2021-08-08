import React, { useEffect, useState } from "react"
import './ResultModal.css'
import { getResults } from "../../Services/userServices"

function ResultModal(props){

    const [message,setMessage] =useState("")

    useEffect( () =>{

        // get request
        (async () => {
            const response = await getResults();
            if (response.status == 200){
                setMessage(response.data.result);
            } else{
                props.onError();
            }
          })();

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