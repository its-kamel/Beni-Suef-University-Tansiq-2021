import React from 'react';
import { Link } from 'react-router-dom';
import useform from './UseSignupform';
import SignUpValidate from './Validate';
import './Signup.css';

/**
 * FormSignup
 * @returns SignUp Form
 */
const Signup = () => {
  const {
    handleChange, newuser, handleSubmit, errors,
  } = useform(SignUpValidate);

  return (
    <div className="formContent">

      <form onSubmit={handleSubmit} className="signupForm">
        <i className="signupIcon" />

        <h className="signupformTitle"> إنشاء حساب جديد </h>

        <div className="signupInputs">

          <input
            type="text"
            name="name"
            className="signupInput"
            placeholder="الاسم رباعي"
            no-autoFocus
            value={newuser.first_name}
            onChange={handleChange}
          />
          {errors.first_name && <p>{errors.first_name}</p>}

        </div>

        <div className="signupInputs">

          <input
            type="text"
            name="email"
            className="signupInput"
            placeholder="البريد الإلكتروني"
            value={newuser.email}
            onChange={handleChange}
            novalid
          />
          {errors.email && <p>{errors.email}</p>}

        </div>

        <div className="signupInputs">

          <input
            type="password"
            name="password"
            className="signupInput"
            placeholder="كلمة المرور"
            value={newuser.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}

        </div>

        <div className="signupInputs">

          <input
            type="number"
            name="national_id"
            className="signupInput"
            placeholder="الرقم القومي"
            value={newuser.national_id}
            onChange={handleChange}
          />
          {errors.national_id && <p>{errors.national_id}</p>}

        </div>

        <button
          className="signupButton"
          type="submit"

        >
          تسجيل
        </button>

        <span className="formLogin">

          <hr className="seperationLine" />
          لدي حساب بالفعل ؟

          <Link to="/login">تسجبل الدخول</Link>
        </span>

      </form>

    </div>
  );
};

export default Signup;
