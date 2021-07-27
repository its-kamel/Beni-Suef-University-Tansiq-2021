import React, {useState} from "react"
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './SettingsModal.css'
import { useHistory } from 'react-router-dom';

function SettingsModal(props){
    const history = useHistory();
    return(
        <>
        <div className="modal__backdrop" >
            <div className="modal__container__settings">
                <span className="close" onClick={props.onClose}>&times;</span>
                <h1 className="modal__title">الإعدادات</h1>
                {/* settings div */}                
                <div className='admin-layout'>
 
                <button type="submit" className="button-layout" onClick={() => history.push('/deadline')}> تحديد فترة تسجيل الرغبات </button>

                </div>

                
                <div className='admin-layout'>

                    <button type="submit" className="button-layout" onClick={props.onTansiq}>تنسيق الطلاب</button>
                </div>

                <div className='admin-layout'>

                <button type="submit" className="button-layout" onClick={() => history.push('/addNewAdmin')}> اضافة مشرف جديد </button>

                </div>

            </div>
        </div>
        </>
    )
}

export default SettingsModal;