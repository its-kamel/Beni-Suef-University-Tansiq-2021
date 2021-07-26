/* eslint-disable react/jsx-key */
import React,{useState,useEffect} from "react";
import './Charts.css';
import { getTableData } from "../../Services/adminServices";

function TableChart(){

    const [data,setData] = useState([{name:"ميكانيكا انتاج",uid:1},{name:"ميكانيكا أجهزة",uid:2},{name:"كهرباء تحكم آلي",uid:3},{name:"كهرباء الكترونيات",uid:4},{name:"عمارة",uid:5},{name:"مدني",uid:6},{name:"غزل و نسيج",uid:7}]);
    const [students,setStudents] = useState([]);
    const [students1,setStudents1] = useState([{name:"سمر نبيل",email:"samarnabil22@gmail.com"}]);
    const [students2,setStudents2] = useState([{name:"منة نوار",email:"menna@gmail.com"},{name:" عبد الرحمن سليمان",email:"abdulrahman@gmail.com"}]);


    
    const [isOpen, setOpen] = useState(false);
    const [items, setItem] = useState(data);
    const [selectedItem, setSelectedItem] = useState(null);

    // useEffect( () =>{
    //     // get request
    //     // getTableData().then( response => {
    //     //     setData(response.data);
    //     // })
    // },[data])
    
    const toggleDropdown = () => setOpen(!isOpen);
    
    const handleItemClick = (id) => {
        selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
        toggleDropdown();
        console.log(id)
        // get request, body: id
        // getTableData(id).then( response => {
        //     setData(response.data);
        // })

        if (id==1){
            setStudents(students1)
        }else{
            setStudents(students2)
        }
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
            <table id="drag-table" className="draggable-table">
                <thead>
                    <tr>
                        <th>الاسم</th>
                        <th>البريد الالكتروني</th>
                    </tr>
                </thead>
                <tbody>
                {students.map( student =>(
                    <>
                    <tr>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    </tr>
                    </>
                ))}
                </tbody>
            </table>
        </div>
        </>
    )
    
}

export default TableChart;