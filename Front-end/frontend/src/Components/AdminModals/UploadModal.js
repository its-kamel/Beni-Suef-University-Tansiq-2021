import React from "react"
import './UploadModal.css'

function UploadModal(props){

    return(
        <>
        <div className="modal__backdrop" >
            <div className="modal__container__upload">
                <span className="close" onClick={props.onClose}>&times;</span>
                <h1 className="modal__title"> رفع بيانات الطلاب</h1>
                {/* upload div */}
                <div className='admin-layout'>
                    <input  className='button-layout' type='file' accept='.xlsx' onChange={props.onUpload}/>
                    <button  type="button" onClick= {props.onToggle}> معاينة البيانات</button>
                    <button onClick={props.onSave}>Save </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default UploadModal;