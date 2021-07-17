import React from "react"
import './UploadModal.css'
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
                    onSheetUpdate={(currentSheet)=>props.setCurrentSheet(currentSheet)}
                    activeSheetClassName='modal-excel-sheet'
                    reactExcelClassName='modal-excel-sheet'
                    
                    />
                </div>
            </div>
        </div>
        </>
    )
}

export default UploadModal;