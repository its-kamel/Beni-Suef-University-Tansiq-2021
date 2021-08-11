import React from 'react';
import { Link } from 'react-router-dom';
import { InputAdornment } from '@material-ui/core/InputAdornment';
import { FaUserAlt } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';

import LoginValidate from './LoginValidate';
import UseLoginform from './UseLoginform';
import PopUp from "../../Constants/PopUp";

// import Navbar from "../Navbar/Navbar";
import './Login.css';
/**
 * FormLogin
 * @returns Login Form
 */
 function Login  () {
  const {
    handleChange, user, handleSubmit, error,isError,handlePopUp,
  } = UseLoginform(LoginValidate);

  return (
    <div className="formContent" >

      <form onSubmit={handleSubmit} className="loginForm">
        
        <i className="loginIcon" />

        <h className="loginformTitle"> تسجبل الدخول </h>

        <div className="loginInputs">

          <input
            type="text"
            name="email"
            className="loginInput"
            placeholder="البريد الإلكتروني"
            value={user.email}
            onChange={handleChange}
          />
          {error.email && <p>{error.email}</p>}

        </div>


        <div className="loginInputs">

          <input
            type="password"
            name="password"
            className="loginInput"
            placeholder="كلمة المرور"
            value={user.password}
            onChange={handleChange}
          />
          {error.password && <p>{error.password}</p>}

        </div>

        <button
          className="signinButton"
          type="submit"
        >
          تسجيل الدخول
        </button>

        {/* <span className="formSignUp">
          <Link to="/forgotPassword">نسيت كلمة المرور</Link>

          <hr className="line" />
          ليس لدي حساب
          <Link to="/signup"> انشاء حساب جديد </Link>
        </span> */}

      </form>
      {isError && <PopUp type="error" title="خطأ في تسجيل الدخول" message="البريد الإلكتروني او كلمة المرور غير صحيحه" onEnd={handlePopUp} interval={7000}/>};

    </div>

  );
};
export default Login;
