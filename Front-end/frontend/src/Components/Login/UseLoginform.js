import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

/**
 * UseLoginform
 * @param {[function]} LoginValidate [function from LoginValidate to check on user inpus]
 * @returns handleChange, user, handleSubmit, error,
 */
const UseLoginform = (LoginValidate) => {
  const history = useHistory();

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
      // console.log(user);
      // const backLoginUser = async () => {
      //   await axios
      //     .post(`url`, { user, })
      //     .then((response) => {
      //       console.log(response);
      //       if (response.status === 200) {
      //         localStorage.setItem('access token', response.data.tokens.access);
      //         history.push('/user');
      //       } // else if (response.status === 401) {
      //       //   // console.log(response.data.detail);
      //       // }
      //     });
      // };

      history.push('/user');

    }
  }, [error]);

  return {
    handleChange, user, handleSubmit, error,
  };
};

export default UseLoginform;
