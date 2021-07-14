import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./Departments.css";
import data from "./Departments-data.json";
import RowsToEdit from "./RowsToEdit";
import RowsToRead from "./RowsToRead";

const DepartmentsTable = () => {
  const [Departments, setDepartments] = useState(data);
  const [addFormData, setAddFormData] = useState({
    departmentName: "",
    departmentCapacity: "",
  });
  const [editFormData, setEditFormData] = useState({
    departmentName: "",
    departmentCapacity: "",
  });

  const [editDepartmentId, setEditDepartmentId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newDepartment = {
      id: nanoid(),
      departmentName: addFormData.departmentName,
      departmentCapacity: addFormData.departmentCapacity,
     
    };

    const newDepartments = [...Departments, newDepartment];
    setDepartments(newDepartments);
    setAddFormData({
      departmentName: "",
      departmentCapacity: "",
      
    })
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

  const handleDeleteClick = (departmentId) => {
    const newDepartments = [...Departments];

    const index = Departments.findIndex((department) => department.id === departmentId);

    newDepartments.splice(index, 1);

    setDepartments(newDepartments);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
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
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                    
                  />
                ) : (
                  <RowsToRead
                    department={department}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>اضافة قسم جديد</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          value={addFormData.departmentName}
          type="text"
          name="departmentName"
          required="required"
          placeholder="أدخل الاسم"
          onChange={handleAddFormChange}
        />
        <input
          value={addFormData.departmentCapacity}
          type="number"
          name="departmentCapacity"
          required="required"
          placeholder="أدخل السعة"
          onChange={handleAddFormChange}
        />
        <button type="submit">اضافة</button>
      </form>
    </div>
  );
};

export default DepartmentsTable;