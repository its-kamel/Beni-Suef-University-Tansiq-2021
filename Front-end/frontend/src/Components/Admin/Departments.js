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

},[Departments])

useEffect( () =>{

  // put new departments info
  // putNewDepartmentInfo(editFormData.departmentCapacity,editDepartmentId)
  // .then( response => {console.log(response);});

},[editFormData.departmentCapacity])
  
  const handleSaveCapacity=()=>{
    console.log(editDepartmentId)
    console.log(editFormData.departmentCapacity)
    // putNewDepartmentInfo(editFormData.departmentCapacity)
    // .then( response => {console.log(response);});

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
      id: editDepartmentId,
      departmentName: editFormData.departmentName,
      departmentCapacity: editFormData.departmentCapacity,
    };

    const newDepartments = [...Departments];

    const index = Departments.findIndex((department) => department.id === editDepartmentId);

    newDepartments[index] = editedDepartment;

    setDepartments(newDepartments);
    setEditDepartmentId(null);
  
  
  };

  const handleEditClick = (event, department) => {
    event.preventDefault();
    setEditDepartmentId(department.id);

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
    <div className="departments-container">
      <form className="form-layout" onSubmit={handleEditFormSubmit}>
        <table className="table-layout">
          <thead className="table-header">
            <tr>
              <th>اسم القسم</th>
              <th>السعة الاستيعابية</th>
            </tr>
          </thead>
          <tbody>
            {Departments.map((department) => (
              // eslint-disable-next-line react/jsx-key
              <Fragment >
                {editDepartmentId === department.id ? (
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
      </form>
    </div>
  );
};

export default DepartmentsTable;