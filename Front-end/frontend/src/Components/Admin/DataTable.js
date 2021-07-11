import React from "react"
import './DataTable.css'

function DataTable(props){
    return(
        <div className="modal__backdrop" >
            <div className="modal__container__Result">
                <h1 className="modal__title">نتيجة التنسيق</h1>
                <p id="para">
                النتيجة
                </p>
                <button type="button" onClick={ () =>{
                    props.onClose();}}>
                    غلق
                </button>
            </div>
        </div>
    );
}

export default DataTable;