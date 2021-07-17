import React from "react"
import './SettingsModal.css'

function SettingsModal(props){

    return(
        <>
        <div className="modal__backdrop" >
            <div className="modal__container__settings">
                <span className="close" onClick={props.onClose}>&times;</span>
                <h1 className="modal__title">الإعدادات</h1>
                {/* settings div */}
                <div className='admin-layout'>
                    <label><input type='checkbox' onChange={props.onCheck}/> فتح اختيار الرغبات</label>
                    <button type="submit" className="button-layout" onClick={props.onTansiq}>تنسيق الطلاب</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default SettingsModal;