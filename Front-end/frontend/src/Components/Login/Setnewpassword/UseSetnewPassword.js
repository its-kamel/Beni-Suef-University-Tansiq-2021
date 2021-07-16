import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import AccountServices from '../../AccountServices';

/**
 * UseSetnewPassword
 * @param {[function]} SetnewpasswordValidate [function from SetnewpasswordVa. check on user inpus]
 * @returns handleChange, usernewpassword, handleSubmit, passworderror,
 */
const UseSetnewPassword = (SetnewpasswordValidate) => {
  const history = useHistory();
  const [usernewpassword, setusernewpassword] = useState({
    password: '',
  });

  const [passworderror, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  /**
   * handleChange
   * @param {*} e
   */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setusernewpassword({
      ...usernewpassword,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(SetnewpasswordValidate(usernewpassword));
    setIsSubmitting(true);
  };

  // useEffect(() => {
  //   if (Object.keys(passworderror).length === 0 && isSubmitting) {
  //     console.log(usernewpassword);
  //     const gochangeComplete = AccountServices.addNewPassword(usernewpassword);
  //     if (gochangeComplete) { history.push('/change-complete/forgot-password'); }
  //   }
  // }, [passworderror]);

  return {
    handleChange, usernewpassword, handleSubmit, passworderror,
  };
};

export default UseSetnewPassword;
