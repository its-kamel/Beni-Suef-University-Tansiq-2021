/**
 * LoginValidate
 * @param {[string]} user [inputs of user]
 * @returns {[error]}  [error message when user input is invalid]
 */
function LoginValidate(props) {
  const error = {};

  if (!props.email) {
    error.email = 'مطلوب';
  } else if (!/\S+@\S+\.\S+/.test(props.email)) {
    error.email = 'بريد إلكتروني خاطئ';
  }

  if (!props.password) {
    error.password = 'مطلوب';
  } else if (props.password.length < 8) {
    error.password = 'كلمة المرور غير صحيحه';
  }

  return error;
}
// export default LoginValidate;
module.exports = LoginValidate;
