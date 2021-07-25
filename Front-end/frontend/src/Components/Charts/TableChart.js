/* eslint-disable react/jsx-key */
import React,{useState,useEffect} from "react";
import './Charts.css';
import { getTableData } from "../../Services/adminServices";

function TableChart(){

    const [data,setData] = useState([{name:"ميكانيكا انتاج",id:1},{name:"ميكانيكا أجهزة",id:2},{name:"كهرباء تحكم آلي",id:3},{name:"كهرباء الكترونيات",id:4},{name:"عمارة",id:5},{name:"مدني",id:6},{name:"غزل و نسيج",id:7}]);
    const [students,setStudents] = useState([]);
    
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
            setStudents([{name:'mech intag',id:1}])
        }else{
            setStudents([{name:'ay haga',id:111}])
        }
    }
    
    return (
        <>
        <h1 className="modal__title">بيانات الطلاب الذين التحقوا بقسم:</h1>
        <div className='dropdown'>
            <div className='dropdown-header' onClick={toggleDropdown}>
            {selectedItem ? items.find(item => item.id == selectedItem).name : "اختار القسم"}
            <i className={`fa fa-chevron-right icon ${isOpen && "open"}`}></i>
            </div>
            <div className={`dropdown-body ${isOpen && 'open'}`}>
            {items.map(item => (
                <div className="dropdown-item" onClick={e => handleItemClick(e.target.id)} id={item.id}>
                <span className={`dropdown-item-dot ${item.id == selectedItem && 'selected'}`}>• </span>
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
                    <td>{student.id}</td>
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