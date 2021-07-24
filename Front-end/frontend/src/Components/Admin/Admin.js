import React, {useEffect, useState} from "react"
import Navbar from '../Navbar/Navbar'
import './Admin.css'
import './Departments.css'
import DataTable from "./DataTable"
import {ReactExcel, readFile, generateObjects} from '@ramonak/react-excel'
import Button from "../../Constants/Button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faCogs, faChartLine, faTable } from '@fortawesome/free-solid-svg-icons'
import UploadModal from "../AdminModals/UploadModal"
import StatsModal from "../AdminModals/StatsModal"
import SettingsModal from "../AdminModals/SettingsModal"
import InfoModal from "../AdminModals/InfoModal"

function Admin() {
    const upload = <FontAwesomeIcon icon={faUpload} color="#f5ba13"/>
    const settings = <FontAwesomeIcon icon={faCogs} color="#f5ba13"/>
    const chart = <FontAwesomeIcon icon={faChartLine} color="#f5ba13"/>
    const info = <FontAwesomeIcon icon={faTable} color="#f5ba13"/>

    const [isExcelOpen, setIsExcelOpen] = useState(false);
    const [isTanseqOpen,setIsTanseqOpen]=useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);

    const [numberOfGroups,setNumberOfGroups]=useState(" ");
    const [inputNumberOfGroups,setInputNumberOfGroups]=useState("");
    // Modals conts
    const [isUpload,setIsUpload] = useState(false)
    const [isSettings,setIsSettings] = useState(false)
    const [isStatsOpen, setIsStatsOpen] = useState(false)
    const [isInfoOpen, setIsInfoOpen] = useState(false)

    const [studentsfile, setStudentsFile]=useState(undefined)
    const [initialData, setInitialData]=useState(undefined);
    const [currentSheet,setCurrentSheet]=useState({});

    const todaysDate= new Date();
    useEffect( () =>{
        
        if (todaysDate == startDate){
            // put request -> isEnabled = true
        }

        if (todaysDate == endDate){
            // put request -> isEnabled = false
        }

    },[todaysDate.getDay()])

    const handleUpload =(event) =>{
        const file=event.target.files[0];
        setStudentsFile(event.target.files[0])
        console.log(file)
        readFile(file)  
        .then((readedData)=>setInitialData(readedData))
        .catch((error)=>console.error(error));
        console.log(studentsfile)
    };
    const save = ()=>{
        //send students data to backend studentsFile
        console.log(initialData)
        // const result=generateObjects(currentSheet);
        // console.log(result);

    };
    const handleSaveDates=()=>{
        const start= new Date(startDate);
        const end= new Date(endDate);
        const todaysDate= new Date();
          setIsTanseqOpen(todaysDate>=start && todaysDate<=end);
        // console.log(start.getMonth()+1)
        // console.log(start.getDate())
        // console.log(start.getFullYear())
        // console.log(todaysDate.getDate());
        // console.log(todaysDate.getMonth()+1);
        // console.log(todaysDate.getFullYear())
        console.log(isTanseqOpen)
    }
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
    const handleTanseeqButton=(event)=>{
        event.preventDefault();
    }

    // modals functions
    function toggleUploadModal(){
        setIsUpload(!isUpload);
    }
    function toggleStatsModal(){
        setIsStatsOpen(!isStatsOpen);
    }
    function toggleSettingsModal(){
        setIsSettings(!isSettings);
    }
    function toggleInfoModal(){
        setIsInfoOpen(!isInfoOpen);
    }

    return( 
        <>
        <Navbar
            isLogged= {true}
        />
        <div className="layout-grid">
            <Button
                icon = {chart}
                text = "الإحصاءات"
                onOpen = {toggleStatsModal}
            />
            <Button
                icon = {upload}
                text = "رفع بيانات الطلاب"
                onOpen = {toggleUploadModal}
            />
            <Button
                icon = {settings}
                text = " الإعدادات"
                onOpen = {toggleSettingsModal}
            />
            <Button
                icon = {info}
                text = " بيانات الأقسام"
                onOpen = {toggleInfoModal}
            />


        </div>

        {/* <div>
            <label>
            رفع بيانات الطلاب</label>
            <input  className='button-layout' type='file' accept='.xlsx' onChange={handleUpload}/>

            <button  type="button" onClick= {toggleExcelMode}> معاينة البيانات</button>
            <button onClick={save}>Save </button>
        </div>
        <div >
            <br/>
            <label>
                <input type='checkbox' onChange={toggleTanseqMode}/>
                فتح اختيار الرغبات
            </label>

        </div> */}
        
        {/* <div>
            <br/>
            <h1 dir='rtl'>بيانات الأقسام</h1>
            <Departments/>
            <br/>
            <div dir='rtl'>
            <h1>أدخل عدد المجموعات</h1>
            <form className="groups-form-layout">
                <input value={inputNumberOfGroups} type="text" onChange={handleInputNumberOfGroups}/>
                <button className="button-layout" type="submit" onClick={handleSubmitNumberOfGroups} >
                    حفظ
                </button>
            </form>
            <h3>عدد المجموعات المحددة حاليا: {numberOfGroups}</h3>
            </div>
        </div>
        <div className='admin-layout'>
            <button type="submit" className="button-layout" onClick={ handleTanseeqButton}>تنسيق الطلاب</button>
        </div> */}

        {/* {isExcelOpen && <DataTable initialData={initialData} setInitialData={setInitialData} currentSheet={currentSheet} setCurrentSheet={setCurrentSheet} toggleExcelMode={toggleExcelMode} save={save} />} */}
        {isUpload && <UploadModal onClose={toggleUploadModal} onUpload={handleUpload} onToggle={toggleExcelMode} onSave={save} initialData={initialData} setCurrentSheet={setCurrentSheet}/>}
        {isStatsOpen && <StatsModal onClose={toggleStatsModal}/>}
        {isSettings && <SettingsModal onClose={toggleSettingsModal} onSave={handleSaveDates} onTansiq={handleTanseeqButton} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} focusedInput={focusedInput} setFocusedInput={setFocusedInput}/>}
        {isInfoOpen && <InfoModal onClose={toggleInfoModal} number={numberOfGroups} input={inputNumberOfGroups} onHandle={handleInputNumberOfGroups} onSubmit={handleSubmitNumberOfGroups} />}

    </>
    );
}

export default Admin;