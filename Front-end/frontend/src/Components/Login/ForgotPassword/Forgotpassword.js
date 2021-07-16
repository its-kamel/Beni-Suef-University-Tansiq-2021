import React from 'react';
import { Link } from 'react-router-dom';
import Forgotpasswordvalidate from './Forgotpasswordvalidate';
import Useforgotpasswordform from './UseforgotpasswordForm';

import './Forgotpassword.css';
/**
 * Forgotpassword
 * @returns Forgotpassword Form
 */
function Forgotpassword() {
  const {
    handleChange, EmailsToReset, handleSubmit, emailerror,
  } = Useforgotpasswordform(Forgotpasswordvalidate);

  return (
    <div className="forgotpasswordContent">
      <form onSubmit={handleSubmit} className="forgotpaswwordForm">
        <i className="lockIcon" />

        <h className="forgotpasswordFormTitle"> تغيير كلمة مرور حسابك </h>

        <span className="pragrapgh">
          الرجاء إدخال عنوان بريدك الإلكتروني أدناه           
          {' '}
          <br />
          وسنرسل لك تعليمات حول كيفية        
          
          <br />
          .إعادة تعيين كلمة المرور الخاصة بك
        </span>

        <div className="forgotpasswordInputs">

          <input
            type="text"
            name="email"
            className="emailInput"
            placeholder="البريد الإلكتروني "
            value={EmailsToReset.email}
            onChange={handleChange}
          />
          {emailerror.email && <p>{emailerror.email}</p>}

        </div>

        <button
          className="sendemailButton"
          type="submit"
        >
          ارسال
        </button>

      </form>

    </div>

  );
}
export default Forgotpassword;
