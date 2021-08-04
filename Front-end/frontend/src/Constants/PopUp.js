import React, { useEffect, useState } from "react";
import './PopUp.css'
import $ from "jquery"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck,faTimes, faExclamationCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

function PopUp (props){

    const type =props.type
    const success = <FontAwesomeIcon icon={faCheck} color="White"/>
    const error = <FontAwesomeIcon icon={faTimes} color="White"/>
    const warning = <FontAwesomeIcon icon={faExclamationCircle} color="White"/>
    const info = <FontAwesomeIcon icon={faInfoCircle} color="White"/>
    const [currentIcon , setCurrentIcon] = useState(null)

    useEffect( () => {
        if (type == "success"){
            setCurrentIcon(success)
        }
        else if (type == "error"){
            setCurrentIcon(error)
        }
        else if (type == "warning"){
            setCurrentIcon(warning)
        }
        else if (type == "info"){
            setCurrentIcon(info)
        }
    
        // function show (){
            var myInterval = setTimeout(() => {
                $('.popUp').addClass(`popUpShow ${type}`); 
                clearTimeout(myInterval);
                Hide();
            }, 200);    
        // }

    },[])

    function Hide (){
        var endInterval = setTimeout(() => {
            $('.popUp').removeClass(`popUpShow ${type}`);
            clearTimeout(endInterval);
            setCurrentIcon(null)
            // props.onEnd();
        }, props.interval);
    }



    return(
        <>
        {/* <button onClick={show}>click</button> */}
        <span  className ="popUp">
        <span className="popUp_icon">{currentIcon}</span>
        <h1 className="popUp_title">{props.title}</h1>
        <p className="popUp_info">{props.message} </p>

        </span>
        </>
    )
}

export default PopUp