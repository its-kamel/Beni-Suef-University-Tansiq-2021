import React from "react";

const RowsToEdit = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="أدخل الاسم"
          name="departmentName"
          value={editFormData.departmentName}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="number"
          required="required"
          placeholder="أدخل السعة"
          name="departmentCapacity"
          value={editFormData.departmentCapacity}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button type="submit">حفظ</button>
        <button type="button" onClick={handleCancelClick}>
          الغاء
        </button>
      </td>
    </tr>
  );
};

export default RowsToEdit;