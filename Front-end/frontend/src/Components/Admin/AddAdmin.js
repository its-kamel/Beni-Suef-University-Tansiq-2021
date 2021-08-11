import React from 'react';
import useform from './UseAddAdminform';
import addValidate from './addValidate.js';
import Navbar from "../Navbar/Navbar";
import './AddAdmin.css';
import PopUp from "../../Constants/PopUp";

/**
 * FormaddNewAdmin
 * @returns Add New Admin Form
 */
const addNewAdmin = () => {
  const {
    handleChange, newadmin, handleSubmit, errors,isError,isSucces,handlePopUp,
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
            value={newadmin.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}

        </div>

        <div className = "loginInputs">

          <input
            type="number"
            name="national_id"
            className="loginInput"
            placeholder="الرقم القومي"
            value={newadmin.national_id}
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
    
      {isSucces && <PopUp type="success" title="نجحت العملية" message="تمت الاضافة " onEnd={handlePopUp} interval={4000}/>}
      {isError &&  <PopUp type="error" title="لم تنجح العملية" message=" هذا المشرف موجود بالفعل" onEnd={handlePopUp} interval={4000}/>}
    </div>
  );
};

export default addNewAdmin;
