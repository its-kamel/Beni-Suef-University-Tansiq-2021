import React, { useState, Fragment, useEffect } from "react";
import { nanoid } from "nanoid";
import "./Departments.css";
import data from "./Departments-data.json";
import RowsToEdit from "./RowsToEdit";
import RowsToRead from "./RowsToRead";
import { getDepartmentsInfo, putNewDepartmentInfo } from "../../Services/adminServices";

const DepartmentsTable = () => {
  const [Departments, setDepartments] = useState(data);

  const [editFormData, setEditFormData] = useState({
    departmentName: "",
    departmentCapacity: "",
  });


  const [editDepartmentId, setEditDepartmentId] = useState(null);
  
  useEffect( () =>{

    // get Departments Info
    // getDepartmentsInfo()
    // .then( response => {
    //     setDepartments(response.data);
    // })
    // (async () => {
    //   const response = await getDepartmentsInfo();
    //   setDepartments(response.data);


    // })();


},[Departments])

  
  const handleSaveCapacity=()=>{
    // console.log(editDepartmentId)
    // console.log(editFormData.departmentCapacity)
    // putNewDepartmentInfo(editFormData.departmentCapacity, editDepartmentId)
    // .then( response => {console.log(response);});


    // (async () => {
    //   const response = await putNewDepartmentInfo(editFormData.departmentCapacity, editDepartmentId);
    //   console.log(response);
    // })();


  }
  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };


  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedDepartment = {
      uid: editDepartmentId,
      departmentName: editFormData.departmentName,
      departmentCapacity: editFormData.departmentCapacity,
    };

    const newDepartments = [...Departments];

    const index = Departments.findIndex((department) => department.uid === editDepartmentId);

    newDepartments[index] = editedDepartment;

    setDepartments(newDepartments);
    setEditDepartmentId(null);
    // console.log(Departments);
  
  };

  const handleEditClick = (event, department) => {
    event.preventDefault();
    setEditDepartmentId(department.uid);

    const formValues = {
      departmentName: department.departmentName,
      departmentCapacity: department.departmentCapacity,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditDepartmentId(null);
  };

  return (
    <>
      <form className="form-layout" onSubmit={handleEditFormSubmit}>
      <div className="responsive-table">
        <table className="draggable-table" id="new_cursor" >
          <thead >
            <tr>
              <th>اسم القسم</th>
              <th>السعة الاستيعابية</th>
              <th>اضغط للتعديل</th>
            </tr>
          </thead>
          <tbody >
            {Departments.map((department) => (
              // eslint-disable-next-line react/jsx-key
              <Fragment >
                {editDepartmentId === department.uid ? (
                  <RowsToEdit
                    department={department}
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                    handleSaveClick={handleSaveCapacity}
                    
                  />
                ) : (
                  <RowsToRead
                    department={department}
                    handleEditClick={handleEditClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
        </div>
      </form>
    </>
  );
};

export default DepartmentsTable;