/**
 * SetnewpasswordValidate
 * @param {*} values
 * @returns passworderror
 */
function SetnewpasswordValidate(props) {
  const passworderror = {};
  if (!props.password) {
    passworderror.password = 'مطلوب';
  } else if (props.password.length < 12) {
    passworderror.password = 'الرجاء استخدام ما لا يقل عن --- حرفًا';
  }

  return passworderror;
}

// export default SetnewpasswordValidate;
module.exports = SetnewpasswordValidate;
