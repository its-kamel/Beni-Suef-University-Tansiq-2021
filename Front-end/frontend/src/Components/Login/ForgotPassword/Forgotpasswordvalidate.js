/**
 * LoginValidate
 * @param {[string]} values [inputs of user]
 * @returns {[emailerror]}  [emailerror message when user input is invalid]
 */
function Forgotpasswordvalidate(props) {
  const emailerror = {};

  if (!props.email) {
    emailerror.email = 'مطلوب';
  } else if (!/\S+@\S+\.\S+/.test(props.email)) {
    emailerror.email = 'بريد إلكتروني خاطئ';
  }

  return emailerror;
}
module.exports = Forgotpasswordvalidate;
