import React from 'react';
import useform from './UseAddAdminform';
import addValidate from './addValidate.js';
import './AddAdmin.css';

/**
 * FormaddNewAdmin
 * @returns Add New Admin Form
 */
const addNewAdmin = () => {
  const {
    handleChange, newuser, handleSubmit, errors,
  } = useform(addValidate);

  return (
    <div>

      <form onSubmit={handleSubmit} >

        <div>

          <input
            type="text"
            name="email"
            className="addInput"
            placeholder="البريد الإلكتروني"
            value={newuser.email}
            onChange={handleChange}
            novalid
          />
          {errors.email && <p>{errors.email}</p>}

        </div>

        <div>

          <input
            type="number"
            name="national_id"
            className="addInput"
            placeholder="الرقم القومي"
            value={newuser.national_id}
            onChange={handleChange}
          />
          {errors.national_id && <p>{errors.national_id}</p>}

        </div>

        <button
          type="submit"
        >
          إضافة
        </button>


      </form>

    </div>
  );
};

export default addNewAdmin;
