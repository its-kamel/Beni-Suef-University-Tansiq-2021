import React from 'react';
import { Link } from 'react-router-dom';
import { InputAdornment } from '@material-ui/core/InputAdornment';
import { FaUserAlt } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';

import LoginValidate from './LoginValidate';
import UseLoginform from './UseLoginform';
// import Navbar from "../Navbar/Navbar";
import './Login.css';
/**
 * FormLogin
 * @returns Login Form
 */
 function Login  () {
  const {
    handleChange, user, handleSubmit, error,
  } = UseLoginform(LoginValidate);

  return (
    <div className="formContent" >

      <i className="fucltyLogo" />
      {/* <Navbar
        isLogged= {false}
        /> */}

      <form onSubmit={handleSubmit} className="loginForm">
        
        <i className="loginIcon" />

        <h className="loginformTitle"> تسجبل الدخول </h>

        <div className="loginInputs">

          <input
            type="text"
            name="email"
            className="loginInput"
            placeholder="البريد الإلكتروني"
            value={user.emailaddress}
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

        <span className="formSignUp">
          <Link to="/forgotPassword">نسيت كلمة المرور</Link>

          <hr className="line" />
          ليس لدي حساب
          <Link to="/signup"> انشاء حساب جديد </Link>
        </span>

      </form>

    </div>

  );
};
export default Login;
