import React from "react";
import "./Button.css"

function Button(props){


    return(
        <>
            <button className="tansiq_btn" onClick={props.onOpen}>
                    <span id="icon_btn"> {props.icon} </span>
                    <br/> {props.text}</button>

        </>
    );
}

export default Button;