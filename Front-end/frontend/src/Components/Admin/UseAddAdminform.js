/* eslint-disable camelcase */
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { addAdmin } from '../../Services/accountServices'


/**
 * Useform
 * @param {[function]} addValidate [function from Validate to check on new user inpus]
 * @returns handleChange, newadmin, handleSubmit, errors,
 */
const useform = (addValidate) => {
  const history = useHistory();
  const [isError , setIsError] = useState(false);
  const [isSucces , setIsSuccess] = useState(false);



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

  function handlePopUp (){
    setIsSuccess(false);
    setIsError(false);
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {

      console.log(newadmin);

      addAdmin(newadmin).then (Response => {
        if (Response.status == 201) {

          handlePopUp ();

          setIsSuccess(true);

        }else {
          handlePopUp ();


          setIsError(true);

        }
      });
    }
  }, [errors]);

  return (
  {handleChange, newadmin, handleSubmit, errors,isError,isSucces,handlePopUp,}
  );
};

export default useform;
