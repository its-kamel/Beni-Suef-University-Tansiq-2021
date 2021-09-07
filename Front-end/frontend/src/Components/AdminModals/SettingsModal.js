import React, {useState} from "react"
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './SettingsModal.css'
import { useHistory } from 'react-router-dom';
import PopUp from "../../Constants/PopUp";

function SettingsModal(props){
    const history = useHistory();
    
    return(
        <>
        <div className="modal__backdrop" >
            <div className="modal__container__settings">
                <span className="close" onClick={props.onClose}>&times;</span>
                <h1 className="modal__title">الإعدادات</h1>
                {/* settings div */}                
                <div className='admin-settings-layout'>
                    <span className="define_btn">اضغط هنا ل  : </span>
                    <button type="submit" className="button-layout" onClick={() => history.push('/deadline')}> تحديد فترة تسجيل الرغبات </button>
                </div><hr className="separator2"/>
        
                <div className='admin-settings-layout'>
                    <span className="define_btn">اضغط هنا ل  : </span>
                    <button type="submit" className="button-layout" onClick={props.onTansiq}>تنسيق الطلاب</button>
                </div><hr className="separator2"/>

                <div className='admin-settings-layout'>
                    <span className="define_btn">اضغط هنا ل  : </span>
                    <button type="submit" className="button-layout" onClick={() => history.push('/addNewAdmin')}> اضافة مشرف جديد </button>
                </div>
            </div>
            {props.isSucces && <PopUp type="success" title="نجحت العملية" message="تم حفظ التغيرات" onEnd={props.handlePopUp} interval={10000}/>}
            {props.isInfo && <PopUp type="info" title=" برجاء الانتظار" message=" جاري تنفيذ التغيرات " onEnd={props.handlePopUp} interval={240000}/>}
            {props.isError &&  <PopUp type="error" title="لم تنجح العملية" message=" برجاء الانتظار، ثم المحاولة لاحقا" onEnd={props.handlePopUp} interval={5000}/>}


        </div>
        </>
    )
}

export default SettingsModal;