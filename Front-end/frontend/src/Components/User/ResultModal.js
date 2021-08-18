import React, { useEffect, useState } from "react"
import './ResultModal.css'
import { getResults , getThreshold } from "../../Services/userServices"

function ResultModal(props){

    const [message,setMessage] =useState("");
    const [isOut , setIsOut] = useState(false);
    const [thresholds , setThresholds] = useState([]);

    useEffect( () =>{

        // get request
        (async () => {
            const response = await getResults();
            if (response.status == 200){
                setMessage(response.data.result);
                setIsOut(response.data.is_out);
            } else{
                props.onError();
            }
        })();

        //   if (isOut){
            (async () => {
                const response = await getThreshold();
                if (response.status == 200){
                    setThresholds(response.data);
                } else{
                    props.onError();
                }
              })();
        //   }

    },[])
    return(
        <div className="modal__backdrop" >
            <div className="modal__container__Result">
                <span className="close" onClick={props.onClose}>&times;</span>
                <h1 className="modal__title">نتيجة التنسيق</h1>
                <p id="para">
                {message}
                </p>
                {isOut && <> 
                    <hr className="separator"/>
                    <h1 className="modal__title"> الحد الادني للقبول في قسم: </h1>
                    {thresholds.map( object =>(
                        <>
                        <p id="thresholds">{object.name} : {object.min_threshold}</p>
                        </>
                    ))}
                </>}
                <button type="button" onClick={ () =>{
                    props.onClose();}}>
                    غلق
                </button>
            </div>
        </div>
    );
}

export default ResultModal;