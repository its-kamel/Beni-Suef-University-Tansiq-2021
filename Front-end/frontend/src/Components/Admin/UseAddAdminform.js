/* eslint-disable camelcase */
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

/**
 * Useform
 * @param {[function]} addValidate [function from Validate to check on new user inpus]
 * @returns handleChange, newadmin, handleSubmit, errors,
 */
const useform = (addValidate) => {
  const history = useHistory();

  const [newadmin, setNewadmin] = useState({
    email: '',
    national_id : '',
  });

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * handleChange
   * @param {*} e
   */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewadmin({
      ...newadmin,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(addValidate(newadmin));

    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      // const {
      //   email,
      // } = newuser;
      // localStorage.removeItem('ResendemailSignup');
      // localStorage.setItem('ResendemailSignup', email);
      // console.log(localStorage.getItem('ResendemailSignup'));

      // const GotoComplete = AccountServices.addUser(newuser);

      // const goto = AccountServices.backaddUser(newuser);

      // if (goto === false) {
      //   console.log('account with this email already exist');
      // }
      // if (goto || GotoComplete) { history.push('/check-email/sign-up'); }

      history.push('/admin');

    }
  }, [errors]);

  return {
    handleChange, newadmin, handleSubmit, errors,
  };
};

export default useform;
