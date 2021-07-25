import React from 'react';
import useform from './UseAddAdminform';
import addValidate from './addValidate.js';
import Navbar from "../Navbar/Navbar";
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
        {<Navbar
        isLogged= {false}
        />}

      <form onSubmit={handleSubmit} className="loginForm">
      <h className="addadminformTitle"> من فضلك ادخل بيانات المشرف الذي تود اضافته </h>

        <div className = "loginInputs">
          <input
            type="text"
            name="email"
            className="loginInput"
            placeholder="البريد الإلكتروني"
            value={newuser.email}
            onChange={handleChange}
            novalid
          />
          {errors.email && <p>{errors.email}</p>}

        </div>

        <div className = "loginInputs">

          <input
            type="number"
            name="national_id"
            className="loginInput"
            placeholder="الرقم القومي"
            value={newuser.national_id}
            onChange={handleChange}
          />
          {errors.national_id && <p>{errors.national_id}</p>}

        </div>

        <button
          className="signinButton"
          type="submit"
        >
          إضافة
        </button>


      </form>

    </div>
  );
};

export default addNewAdmin;
