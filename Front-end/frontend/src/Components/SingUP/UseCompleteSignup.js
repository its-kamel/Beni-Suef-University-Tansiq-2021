import { useState, useEffect } from 'react';
// import AccountServices from '../AccountServices';

/**
 * UseCompleteSignup
 * @param
 * @returns handleSubmit,
 */
const UseCompleteSignup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * handleSubmit
   * @param {*} e
   */

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  };
  // useEffect(() => {
  //   if (isSubmitting) {
  //     const ResendemailSignup = localStorage.getItem('ResendemailSignup');
  //     console.log(localStorage);
  //     AccountServices.CompleteSignup(ResendemailSignup);
  //     AccountServices.backCompleteSignup(ResendemailSignup);
  //   }
  // }, [isSubmitting]);
  return {
    handleSubmit,
  };
};

export default UseCompleteSignup;
