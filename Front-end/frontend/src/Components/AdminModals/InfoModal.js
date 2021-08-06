import React from "react"
import './InfoModal.css'
import Departments from "../Admin/Departments"
import PopUp from "../../Constants/PopUp";


function InfoModal(props){
    


    return(
        <>
        <div className="modal__backdrop" >
            <div className="modal__container__info">
                <span className="close" onClick={props.onClose}>&times;</span>
                <h1 className="modal__title">بيانات الأقسام</h1>
                {/* table */}
                <Departments/>
                <br/>
                <div dir='rtl'>
                <h1 className="modal__title">أدخل عدد المجموعات</h1>
                <form className="groups-form-layout">
                    <input value={props.input} type="number" onChange={props.onHandle} placeholder="رجاء ادخال رقم"/>
                    <button className="button-layout" type="submit" onClick={props.onSubmit}  >
                        حفظ
                    </button>
                </form>
                <h3 className="modal__groupNo__title">عدد المجموعات المحددة حاليا: {props.number}</h3>
                </div>
            </div>

            {props.isSucces && <PopUp type="success" title="نجحت العملية" message="تم حفظ التغيرات" onEnd={props.handlePopUp} interval={7000}/>}
            {props.isInfo && <PopUp type="info" title=" برجاء الانتظار" message=" جاري تنفيذ التغيرات " onEnd={props.handlePopUp} interval={4000}/>}
        </div>
        </>
    )
}

export default InfoModal;