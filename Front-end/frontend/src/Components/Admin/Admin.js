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
import "../../Services/adminServices"
import {postStudentsInfo, putNumberOfGroups,getNumberOfGroups, putSortStatus} from "../../Services/adminServices"
import PopUp from "../../Constants/PopUp";

function Admin() {
    const upload = <FontAwesomeIcon icon={faUpload} color="#f5ba13"/>
    const settings = <FontAwesomeIcon icon={faCogs} color="#f5ba13"/>
    const chart = <FontAwesomeIcon icon={faChartLine} color="#f5ba13"/>
    const info = <FontAwesomeIcon icon={faTable} color="#f5ba13"/>

    const [isExcelOpen, setIsExcelOpen] = useState(false);
    const [isTanseqOpen,setIsTanseqOpen]=useState(false);

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


    const [isSucces , setIsSuccess] = useState(false);
    const [isError , setIsError] = useState(false);
    const [isInfo , setIsInfo] = useState(false)
    

    useEffect( () =>{

        
        // put number of groups
        // getNumberOfGroups()
        // .then(Response=>{console.log(Response);});
        
        (async () => {
            const response = await getNumberOfGroups();
            setNumberOfGroups(response.data.groups_count);
          })();

    },[inputNumberOfGroups])


    const handleUpload =(event) =>{
        const file=event.target.files[0];
        setStudentsFile(event.target.files[0]);
        // console.log(file)
        readFile(file)  
        .then((readedData)=>setInitialData(readedData))
        .catch((error)=>console.error(error));
        
                
    };
    const save = ()=>{
        setIsInfo(true);
        //send students data to backend studentsFile
        // console.log(initialData)
        // const result=generateObjects(currentSheet);
        // console.log(result);

        // put students data
        // postStudentsInfo(studentsfile)
        // .then(Response=>{console.log(Response);});
        console.log(studentsfile);
        if(studentsfile)
        {
            var data = new FormData();
            data.append('excel_file', studentsfile)
            console.log(data);
            handlePopUp ()
            setIsInfo(true);
    
            (async () => {
                const response = await postStudentsInfo(data);
                console.log(response);
                if (response.status == 200){
                    handlePopUp ()
                    console.log(response.status)
                    setIsSuccess(true);
                }
              })();

        }
        


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

    function handlePopUp (){
        setIsSuccess(false);
        setIsError(false);
        setIsInfo(false);
    }

    function handleSubmitNumberOfGroups(event){
        event.preventDefault();
        handlePopUp ()
        // setNumberOfGroups(inputNumberOfGroups);
        setInputNumberOfGroups(" ");
        setIsInfo(true);
        if(inputNumberOfGroups)
        {
            //put number of groups
            (async () => {
                const response = await putNumberOfGroups({ groups_count: inputNumberOfGroups});
                console.log(response);
                if (response.status == 200){
                    handlePopUp ()
                    console.log(response.status)
                    setIsSuccess(true);
                }
              })();

        }


    };
    const handleTanseeqButton=(event)=>{
        event.preventDefault();
        handlePopUp ()
        setIsInfo(true);
        (async () => {
            const response = await putSortStatus(true);
            console.log(response);
            if (response.status == 202){
                handlePopUp ()
                console.log(response.status)
                setIsSuccess(true);
            }
          })();


    }

    // modals functions
    function toggleUploadModal(){
        setIsUpload(!isUpload);
        handlePopUp();
    }
    function toggleStatsModal(){
        setIsStatsOpen(!isStatsOpen);
    }
    function toggleSettingsModal(){
        setIsSettings(!isSettings);
        handlePopUp();
    }
    function toggleInfoModal(){
        setIsInfoOpen(!isInfoOpen);
        handlePopUp();
    }
    // handle modals error
    function handleModalsError(){
        setIsSettings(false);
        setIsStatsOpen(false);
        setIsInfoOpen(false);
        handlePopUp()
        setIsError(true);
        console.log('hi')
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
        {/* {isSucces && <PopUp type="success" title="نجحت العملية" message="تم حفظ التغيرات" onEnd={handlePopUp} interval={7000}/>}
        {isInfo && <PopUp type="info" title=" برجاء الانتظار" message=" جاري تنفيذ التغيرات " onEnd={handlePopUp} interval={4000}/>} */}

        {isUpload && <UploadModal onClose={toggleUploadModal} onUpload={handleUpload} onToggle={toggleExcelMode} onSave={save} initialData={initialData} setCurrentSheet={setCurrentSheet}/>}
        {isStatsOpen && <StatsModal onClose={toggleStatsModal} onError={handleModalsError}/>}
        {isSettings && <SettingsModal setIsInfo={setIsInfo} setIsSuccess={setIsSuccess} isSucces={isSucces} isInfo={isInfo} handlePopUp={handlePopUp} onClose={toggleSettingsModal}  onTansiq={handleTanseeqButton} />}
        {isInfoOpen && <InfoModal setIsInfo={setIsInfo} setIsSuccess={setIsSuccess} isSucces={isSucces} isInfo={isInfo} handlePopUp={handlePopUp} onClose={toggleInfoModal} number={numberOfGroups} input={inputNumberOfGroups} onHandle={handleInputNumberOfGroups} onSubmit={handleSubmitNumberOfGroups} />}
        {isError &&  <PopUp type="error" title="لم تنجح العملية" message=" برجاء الانتظار، ثم المحاولة لاحقا" onEnd={handlePopUp} interval={5000}/>}

    </>
    );
}

export default Admin;