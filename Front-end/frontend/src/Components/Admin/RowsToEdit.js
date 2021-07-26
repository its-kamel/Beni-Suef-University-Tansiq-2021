import React from "react";
import "./Departments.css"

const RowsToEdit = ({
  department,
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  handleSaveClick
}) => {
  return (
    <tr >
      <td >
      {department.departmentName}
      </td>
      <td >
        <input 
          type="number"
          required="required"
          placeholder="أدخل السعة"
          name="departmentCapacity"
          value={editFormData.departmentCapacity}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td >
        <button className="button-layout" type="submit" onClick={handleSaveClick}>حفظ</button>
        <button className="button-layout" type="button" onClick={handleCancelClick}>
          الغاء
        </button>
      </td>
    </tr>
  );
};

export default RowsToEdit;