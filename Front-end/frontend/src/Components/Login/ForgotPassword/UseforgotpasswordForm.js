import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import AccountServices from '../../AccountServices';

/**
 * useforgotpasswordform
 * @param {[function]} Validate [function from validate to check on user inpus]
 * @returns handleChange, values, handleSubmit, emailerror,
 */
const useforgotpasswordform = (Validate) => {
  const history = useHistory();
  const [EmailsToReset, setEmailsToReset] = useState({ email: '' });

  const [emailerror, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  /**
   * handleChange
   * @param {*} e
   */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailsToReset({
      ...EmailsToReset,
      [name]: value,
    });
  };
  /**
   * handleSubmit
   * @param {*} e
   */

  const handleSubmit = (e) => {
    setIsSubmitting(true);
    setErrors(Validate(EmailsToReset));

    e.preventDefault();
  };
  // useEffect(() => {
  //   if (Object.keys(emailerror).length === 0 && isSubmitting) {
  //     console.log(EmailsToReset);
  //     console.log(localStorage);
  //     localStorage.removeItem('ResendemailLogin');
  //     localStorage.setItem('ResendemailLogin', EmailsToReset.email);
  //     console.log(localStorage.getItem('ResendemailLogin'));

  //     const GotoCheckInbox = AccountServices.emailToResetPassword(EmailsToReset);
  //     const gotocheckinbox = AccountServices.backemailToResetPassword(EmailsToReset);
  //     if (GotoCheckInbox || gotocheckinbox) { history.push('/check-email/forgot-password'); }
  //   }
  // }, [emailerror]);

  return {
    handleChange, EmailsToReset, handleSubmit, emailerror,
  };
};

export default useforgotpasswordform;
