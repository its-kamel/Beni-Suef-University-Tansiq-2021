import React, { useState, Fragment, useEffect } from "react";
import { nanoid } from "nanoid";
import "./Departments.css";
import data from "./Departments-data.json";
import RowsToEdit from "./RowsToEdit";
import RowsToRead from "./RowsToRead";
import { getDepartmentsInfo, putNewDepartmentInfo } from "../../Services/adminServices";
import PopUp from "../../Constants/PopUp";


const DepartmentsTable = () => {
  const [Departments, setDepartments] = useState(data);

  const [editFormData, setEditFormData] = useState({
    name: "",
    Capacity: "",
  });

 



  const [editDepartmentId, setEditDepartmentId] = useState(null);
  
  useEffect( () =>{

    // get Departments Info
    // getDepartmentsInfo()
    // .then( response => {
    //     setDepartments(response.data);
    // })
    (async () => {
      const response = await getDepartmentsInfo();
      setDepartments(response.data);


    })();


},[Departments])


  const handleSaveCapacity=()=>{
    // console.log(editDepartmentId)
    // console.log(editFormData.Capacity)
    // putNewDepartmentInfo(editFormData.Capacity, editDepartmentId)
    // .then( response => {console.log(response);});


    if(editFormData.Capacity)
    {
      (async () => {
        const response = await putNewDepartmentInfo(editFormData.Capacity, editDepartmentId);
        console.log(response);
        if (response && response.status == 200){
          
          console.log(response.status)
          
      }

      })();

    }


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
      name: editFormData.name,
      Capacity: editFormData.Capacity,
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
      name: department.name,
      Capacity: department.Capacity,
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