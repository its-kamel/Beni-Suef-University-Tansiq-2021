import React from "react";
import './CountDown.css'

function CountDown (props){

    return(
        <div className="coming-soon-info ">
        <p>{props.message}</p>
        <div className="countdown">
            <div className="countdown-days">
                <div className="number">{props.days}</div>
                <span className>الايام</span>
            </div>
            <div className="countdown-hours">
                <div className="number">{props.hours}</div>
                <span className>الساعات</span>
            </div>     
            <div className="countdown-minutes">
                <div className="number">{props.minutes}</div>
                <span className>الدقائق</span>
            </div>
            <div className="countdown-seconds">
                <div className="number">{props.seconds}</div>
                <span className>الثواني</span>
            </div>
        </div>
        </div>
    )
}

export default CountDown;