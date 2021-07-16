import React from 'react';
import './SetnewPassword.css';
import UseSetnewPassword from './UseSetnewPassword';
import SetnewpasswordValidate from './SetnewpasswordValidate';
/**
 * Setnewpassword
 * @returns set new password form
 */
function Setnewpassword() {
  const {
    handleChange, usernewpassword, handleSubmit, passworderror,
  } = UseSetnewPassword(SetnewpasswordValidate);

  return (
    <div className="confirmformContent">
      <form onSubmit={handleSubmit} className="newpasswordForm">

        <i className="lockIcon" />
        <h className="setpasswordFormTitle"> قم بتعيين كلمة المرور الجديدة الخاصة بك </h>

        <div className="newpasswordInputs">

          <input
            type="password"
            name="password"
            className="passwordInput"
            placeholder="كلمة المرور"
            value={usernewpassword.password}
            onChange={handleChange}
          />
          {passworderror.password && <p>{passworderror.password}</p>}
          <span style={{
            fontSize: '0.75rem', color: 'white'
          }}
          >
            :الرجاء استخدام على الأقل
            <br />

            &#9675;----- &nbsp;&nbsp;&nbsp;&nbsp; &#9675; ----
          </span>
        </div>

        <button
          className="confirmButton"
          type="submit"
        >
          تأكيد
        </button>

      </form>

    </div>

  );
}

export default Setnewpassword;
