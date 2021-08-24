import React from "react"
import './UploadModal.css'
import PopUp from "../../Constants/PopUp";
import { ReactExcel} from "@ramonak/react-excel";

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
                    <button onClick={props.onSave}>Save </button>
                </div>
                <div >
                    <ReactExcel
                    initialData={props.initialData}
                    reactExcelClassName='modal-excel-sheet'
                    
                    />
                </div>
            </div>
            {props.isSucces && <PopUp type="success" title="نجحت العملية" message="تم حفظ التغيرات" onEnd={props.handlePopUp} interval={7000}/>}
            {props.isInfo && <PopUp type="info" title=" برجاء الانتظار" message=" جاري تنفيذ التغيرات " onEnd={props.handlePopUp} interval={4000}/>}
            {props.isError &&  <PopUp type="error" title="لم تنجح العملية" message=" برجاء الانتظار، ثم المحاولة لاحقا" onEnd={props.handlePopUp} interval={5000}/>}

        </div>
        </>
    )
}

export default UploadModal;