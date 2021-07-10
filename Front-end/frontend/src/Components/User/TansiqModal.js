import React from "react"
import './TansiqModal.css'

function TansiqModal(props){
    return(
        <div className="modal__backdrop" >
            <div className="modal__container">
                <h1 className="modal__title">يرجي ترتيب الرغبات حسب الاولوية</h1>
                <p id="para">
                table
                </p>
                <button id="confirm" type="button" onClick={ () =>{
                    props.onConfirm();}}>
                    حفظ التغيرات
                </button>
            </div>
        </div>
    );
}

export default TansiqModal;