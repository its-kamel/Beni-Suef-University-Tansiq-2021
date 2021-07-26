import React from "react";
import "./Departments.css"
const RowsToRead = ({ department, handleEditClick, handleDeleteClick }) => {
  return (
    <tr id="new_cursor">
      <td >{department.departmentName}</td>
      <td >{department.departmentCapacity}</td>
      <td >
        <button
            className="button-layout"
          type="button"
          onClick={(event) => handleEditClick(event, department)}
        >
          تعديل
        </button>
      </td>
    </tr>
  );
};

export default RowsToRead;