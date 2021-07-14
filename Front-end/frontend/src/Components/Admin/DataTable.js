import { ReactExcel, readFile ,generateObjects } from "@ramonak/react-excel";
import React from "react"
import './DataTable.css'

function DataTable({initialData,setInitialData,currentSheet,setCurrentSheet,toggleExcelMode,save}){
    // function save(){
    //     const result=generateObjects(currentSheet);
    //     console.log(result)

    // };
    return(
        <div className="modal__backdrop" >
            <div className="modal__container__Result">
                <h1 className="modal__title">بيانات الطلاب</h1>
                <div>
                    <ReactExcel
                    initialData={initialData}
                    onSheetUpdate={(currentSheet)=>setCurrentSheet(currentSheet)}
                    activeSheetClassName='active-sheet'
                    reactExcelClassName='react-excel'
                    />
                </div>
                <button onClick={save}>حفظ </button>
                <button type="button" onClick={toggleExcelMode}>
                    غلق
                </button>
            </div>
        </div>
    );
}

export default DataTable;