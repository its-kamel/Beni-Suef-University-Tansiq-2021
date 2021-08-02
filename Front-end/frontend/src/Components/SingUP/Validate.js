/**
 * SignUpValidate
 * @param {[string]} newuser [inputs of user]
 * @returns {[errors]}  [error message when user input is invalid]
 */
function SignUpValidate(props) {
  const errors = {};

  if (!props.name) {
    errors.first_name = 'مطلوب';
  }

  if (!props.national_id) {
    errors.national_id = 'مطلوب';
  } else if (props.national_id.length != 14) {
    errors.national_id = 'الرقم القومي غير صحيح';
  }

  if (!props.email) {
    errors.email = 'مطلوب';
  } else if (!/\S+@\S+\.\S+/.test(props.email)) {
    errors.email = 'بريد إلكتروني خاطئ';
  }

  if (!props.password) {
    errors.password = 'مطلوب';
  } else if (props.password.length < 6) {
    errors.password = 'من فضلك استخدام ما لا يقل عن 6 احرف';
  }else if (props.password.length > 16) {
    errors.password = 'من فضلك استخدام ما لا يزيد عن 16 حرفا';
  }


  return errors;
}

module.exports = SignUpValidate;
