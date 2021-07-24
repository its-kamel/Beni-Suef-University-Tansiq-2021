/* eslint-disable camelcase */
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

/**
 * Useform
 * @param {[function]} SignUpValidate [function from Validate to check on new user inpus]
 * @returns handleChange, newuser, handleSubmit, errors,
 */
const useform = (SignUpValidate) => {
  const history = useHistory();

  const [newuser, setNewuser] = useState({
    email: '',
    password: '',
    name: '',
    national_id: '',
  });

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * handleChange
   * @param {*} e
   */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewuser({
      ...newuser,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(SignUpValidate(newuser));

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

      history.push('/CompleteSignup');

    }
  }, [errors]);

  return {
    handleChange, newuser, handleSubmit, errors,
  };
};

export default useform;
