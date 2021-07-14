import React, {useState} from "react"
import Navbar from '../Navbar/Navbar'
import './Admin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import DataTable from "./DataTable"
import {ReactExcel, readFile, generateObjects} from '@ramonak/react-excel'
import Departments from "./Departments"


function Admin() {
    
    const [isExcelOpen, setIsExcelOpen] = useState(false);
    const [isTanseqOpen,setIsTanseqOpen]=useState(false);
    const [numberOfGroups,setNumberOfGroups]=useState(" ");
    const [inputNumberOfGroups,setInputNumberOfGroups]=useState("");

    const [initialData, setInitialData]=useState(undefined);
    const [currentSheet,setCurrentSheet]=useState({});
    const handleUpload =(event) =>{
        const file=event.target.files[0];
        readFile(file)
        .then((readedData)=>setInitialData(readedData))
        .catch((error)=>console.error(error));
    };
    const save = ()=>{
        // const result=generateObjects(currentSheet);
        // console.log(result);

    };
    function toggleTanseqMode(){
        setIsTanseqOpen(!isTanseqOpen);
    };


    function toggleExcelMode(){
        setIsExcelOpen(!isExcelOpen);
    };
    const handleInputNumberOfGroups=(event)=>{
        setInputNumberOfGroups(event.target.value);
        console.log(event.target.value);
    }
    const handleSubmitNumberOfGroups=(event)=>{
        event.preventDefault();
        setNumberOfGroups(inputNumberOfGroups);
        setInputNumberOfGroups(" ");

    };
    return( 
        <>
        <Navbar
            isLogged= {true}
        />
        <div className='layout-grid'>
            <div>
                <label>
                رفع بيانات الطلاب</label>
                <input  className='button-layout' type='file' accept='.xlsx' onChange={handleUpload}/>

               <button  type="button" onClick= {toggleExcelMode}> معاينة البيانات</button>
               {/* <button onClick={save}>Save </button> */}
            </div>
            <div >
                <br/>
                <label>
                   <input type='checkbox' onChange={toggleTanseqMode}/>
                   فتح اختيار الرغبات
               </label>

            </div>
            


        </div>
        
        {isExcelOpen && <DataTable initialData={initialData} setInitialData={setInitialData} currentSheet={currentSheet} setCurrentSheet={setCurrentSheet} toggleExcelMode={toggleExcelMode} save={save} />}
        <div>
            <br/>
            <h1 dir='rtl'>بيانات الأقسام</h1>
            <Departments/>
            <br/>
            <div dir='rtl'>
            <h1>أدخل عدد المجموعات</h1>
            <form>
                <input value={inputNumberOfGroups} type="text" onChange={handleInputNumberOfGroups}/>
                <button type="submit" onClick={handleSubmitNumberOfGroups} >
                    حفظ
                </button>
            </form>
            <h3>عدد المجموعات المحددة حاليا: {numberOfGroups}</h3>
            </div>
        </div>
    </>
    );
}

export default Admin;