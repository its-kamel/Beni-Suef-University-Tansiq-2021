/* eslint-disable react/jsx-key */
import React,{useState,useEffect} from "react";
import './Charts.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { getTableData } from "../../Services/adminServices";
import $ from "jquery"

function TableChart(){

    const [data,setData] = useState([{name:"غزل و نسيج",uid:1},{name:"ميكانيكا انتاج",uid:2},{name:"ميكانيكا أجهزة",uid:3},{name:"كهرباء تحكم آلي",uid:4},{name:"كهرباء الكترونيات",uid:5},{name:"عمارة",uid:6},{name:"مدني",uid:7}]);
    const [students,setStudents] = useState([]);
    const [students1,setStudents1] = useState([{name:"سمر نبيل",email:"samarnabil22@gmail.com"}]);
    const [students2,setStudents2] = useState([{name:"منة نوار",email:"menna@gmail.com"},{name:" عبد الرحمن سليمان",email:"abdulrahman@gmail.com"}]);
    
    const [fileName,setFileName] = useState("")
    const [buttonName,setButtonName] = useState("تنزيل جدول البيانات")
    const [isOpen, setOpen] = useState(false);
    const [items, setItem] = useState(data);
    const [selectedItem, setSelectedItem] = useState(null);
    
    const toggleDropdown = () => setOpen(!isOpen);
    
    const handleItemClick = (id) => {
        selectedItem == id ? setSelectedItem(id) : setSelectedItem(id);
        toggleDropdown();
        var newName = (data.filter(object => object.uid == id))[0].name;
        setFileName(newName);
        setButtonName("تنزيل جدول بيانات قسم "+newName);

        // get request
        (async () => {
            const response = await getTableData(id);
            setStudents(response.data);
          })();
    }
    
    return (
        <>
        <h1 className="modal__title">بيانات الطلاب الذين التحقوا بقسم:</h1>
        <div className='dropdown'>
            <div className='dropdown-header' onClick={toggleDropdown}>
            {selectedItem ? items.find(item => item.uid == selectedItem).name : "اختار القسم"}
            <i className={`fa fa-chevron-right icon ${isOpen && "open"}`}></i>
            </div>
            <div className={`dropdown-body ${isOpen && 'open'}`}>
            {items.map(item => (
                <div className="dropdown-item" onClick={e => handleItemClick(e.target.id)} id={item.uid}>
                <span className={`dropdown-item-dot ${item.uid == selectedItem && 'selected'}`}>• </span>
                {item.name}
                </div>
            ))}
            </div>
        </div>
        {/* table */}
        <div className="responsive-table-stats">
            <table id="table-to-xls" className="draggable-table">
                <thead>
                    <tr>
                        <th>الاسم</th>
                        <th>البريد الالكتروني</th>
                    </tr>
                </thead>
                <tbody >
                {students.map( student =>(
                    <>
                    <tr id="new_cursor">
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    </tr>
                    </>
                ))}
                </tbody>
            </table>
            {/* export */}
            <ReactHTMLTableToExcel
                    id="excel-button"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename={fileName}
                    sheet="tablexls"
                    buttonText={buttonName}/>
        </div>
        </>
    )
    
}

export default TableChart;