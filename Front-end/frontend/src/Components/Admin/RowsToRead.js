import React from "react";
import "./Departments.css"
const RowsToRead = ({ department, handleEditClick, handleDeleteClick }) => {
  return (
    <tr >
      <td className="table-data">{department.departmentName}</td>
      <td className="table-data">{department.departmentCapacity}</td>
      <td className="table-data">
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