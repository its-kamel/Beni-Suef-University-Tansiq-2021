import React from "react";
import "./Departments.css"
const RowsToRead = ({ department, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{department.departmentName}</td>
      <td>{department.departmentCapacity}</td>
      <td>
        <button
            className="button-layout"
          type="button"
          onClick={(event) => handleEditClick(event, department)}
        >
          تعديل
        </button>
        <button className="button-layout" type="button" onClick={() => handleDeleteClick(department.id)}>
          حذف
        </button>
      </td>
    </tr>
  );
};

export default RowsToRead;