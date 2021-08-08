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

  const [isSucces , setIsSuccess] = useState(false);
  const [isError , setIsError] = useState(false);
  const [isInfo , setIsInfo] = useState(false)


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

function handlePopUp (){
  setIsSuccess(false);
  setIsError(false);
  setIsInfo(false);
}

  const handleSaveCapacity=()=>{
    // console.log(editDepartmentId)
    // console.log(editFormData.Capacity)
    // putNewDepartmentInfo(editFormData.Capacity, editDepartmentId)
    // .then( response => {console.log(response);});
    handlePopUp ()
    setIsInfo(true);


    if(editFormData.Capacity)
    {
      (async () => {
        const response = await putNewDepartmentInfo(editFormData.Capacity, editDepartmentId);
        console.log(response);
        if (response.status == 200){
          handlePopUp ()
          console.log(response.status)
          setIsSuccess(true);
      }
      else{
        handlePopUp ()
        console.log(response.status)
        setIsError(true);
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
      {isSucces && <PopUp type="success" title="نجحت العملية" message="تم حفظ التغيرات" onEnd={handlePopUp} interval={7000}/>}
      {isInfo && <PopUp type="info" title=" برجاء الانتظار" message=" جاري تنفيذ التغيرات " onEnd={handlePopUp} interval={4000}/>}
      {isError &&  <PopUp type="error" title="لم تنجح العملية" message=" برجاء الانتظار، ثم المحاولة لاحقا" onEnd={handlePopUp} interval={5000}/>}

    </>
  );
};

export default DepartmentsTable;