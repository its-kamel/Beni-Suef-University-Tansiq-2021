import React, {useState} from "react"
import Navbar from '../Navbar/Navbar'
import './Admin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import DataTable from "./DataTable"
function Admin() {
    
    const [isResultOpen, setIsResultOpen] = useState(false)

    function toggleResultModal(){
        setIsResultOpen(!isResultOpen)
    }
    return( 
        <>
        <Navbar
            isLogged= {true}
        />
        <div className='admin-body'>
            <div className='layout-grid'>
                <input type='file'  />
                <label>رفع بيانات الطلاب</label>

               <button  type="button" onClick= {toggleResultModal}> معاينة البيانات</button>
               
            </div>

        </div>
        {isResultOpen && <DataTable onClose={toggleResultModal}/>}
    </>
    );
}

export default Admin;