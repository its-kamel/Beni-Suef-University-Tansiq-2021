import React from 'react';
import { useHistory } from 'react-router-dom';
import './ChangeComplete.css';

/**
 * ChangeComplete
 * @returns ChangeComplete Form
 */
function ChangeComplete() {
  const history = useHistory();
  return (
    <div className="formcompleteContent">
      <form className="changecompleteForm">

        <i className="trueIcon" />
        <h className="forgotpasswordFormTitle"> تم تحديث كلمة المرور الخاصة بك </h>
        <span className="pragrapgh">
        الآن استخدم كلمة مرورك الجديدة للوصول إلى حسابك
        </span>

        <button
          className="lastButton"
          type="submit"
          onClick={() => history.push('/')}
        >
          الانتقال لتسجيل الدخول
        </button>
      </form>

    </div>

  );
}
export default ChangeComplete;
