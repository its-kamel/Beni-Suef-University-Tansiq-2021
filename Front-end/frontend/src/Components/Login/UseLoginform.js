import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../Services/accountServices'
import PopUp from "../../Constants/PopUp";



/**
 * UseLoginform
 * @param {[function]} LoginValidate [function from LoginValidate to check on user inpus]
 * @returns handleChange, user, handleSubmit, error,
 */
const UseLoginform = (LoginValidate) => {
  const history = useHistory();
  const [isError , setIsError] = useState(false);


  const [user, setuser] = useState({

    email: '',
    password: '',

  });

  const [error, setError] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  /**
   * handleChange
   * @param {*} e
   */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuser({
      ...user,
      [name]: value,
    });
  };
  /**
   * handleSubmit
   * @param {*} e
   */

  const handleSubmit = (e) => {
    setError(LoginValidate(user));
    e.preventDefault();
    setIsSubmitting(true);
  };
  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmitting) {
      
      console.log(user);

      login(user).then( response => {
        if (response.status === 200 && response.data.is_admin === false) {

          history.push('/user'); 
      
        }else if (response.status === 200 && response.data.is_admin === true) {

          history.push('/admin');

        }else if (response.status === 403) {

          setIsError(true);
          return ()=> 
            {isError && <PopUp type="error" title="خطأ في تسجيل الدخول" message="البريد الإلكتروني او كلمة المرور غير صحيحه" interval={7000}/>};
        }

      })

    }
  }, [error]);

  return {
    handleChange, user, handleSubmit, error,

  };
};

export default UseLoginform;
