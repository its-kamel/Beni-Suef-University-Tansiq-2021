import React from "react";
import "./Departments.css"

const RowsToEdit = ({
  department,
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td className="table-data">
      {department.departmentName}
      </td>
      <td className="table-data">
        <input className="form-layout"
          type="number"
          required="required"
          placeholder="أدخل السعة"
          name="departmentCapacity"
          value={editFormData.departmentCapacity}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td className="table-data">
        <button className="button-layout" type="submit">حفظ</button>
        <button className="button-layout" type="button" onClick={handleCancelClick}>
          الغاء
        </button>
      </td>
    </tr>
  );
};

export default RowsToEdit;