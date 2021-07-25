/**
 * Validate
 * @param {[string]} newadmin [inputs of user]
 * @returns {[errors]}  [error message when user input is invalid]
 */
 function Validate(props) {
    const errors = {};

    if (!props.national_id) {
      errors.national_id = 'مطلوب';
    } else if (props.national_id.length < 14) {
      errors.national_id = 'الرقم القومي غير صحيح';
    }
  
    if (!props.email) {
      errors.email = 'مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(props.email)) {
      errors.email = 'بريد إلكتروني خاطئ';
    }
    return errors;
  }
  
  module.exports = Validate;
  