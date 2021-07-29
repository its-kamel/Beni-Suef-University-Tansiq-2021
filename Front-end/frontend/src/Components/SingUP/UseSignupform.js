/* eslint-disable camelcase */
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SignUp from '../../Services/accountServices'

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
    national_id: '',
    name: '',
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

      console.log(newuser);

      SignUp(newuser).then( response => {history.push('/CompleteSignup');})
    }
  }, [errors]);

  return {
    handleChange, newuser, handleSubmit, errors,
  };
};

export default useform;
