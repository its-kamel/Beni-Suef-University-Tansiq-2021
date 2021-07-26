import React from "react"
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
                <div className='admin-settings-layout'>

                    <h3 className='admin-layout'>فترة تسجيل الرغبات:</h3>
                    <DateRangePicker
                        startDate={props.startDate}
                        startDateId="s_id"
                        endDate={props.endDate}
                        endDateId="e_id"
                        onDatesChange={({ startDate, endDate }) => { props.setStartDate(startDate); props.setEndDate(endDate); }}
                        focusedInput={props.focusedInput}
                        onFocusChange={e => props.setFocusedInput(e)}
                        displayFormat="DD/MM/YYYY"
                    />
                    <div>Start Date: {props.startDate && props.startDate.format('ll')}<br />
                    
                    End Date: {props.endDate && props.endDate.format('ll')}</div>




                    
                </div>
                <div className='admin-layout'>
                    <button className="button-layout" onClick={props.onSave}>حفظ</button>

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