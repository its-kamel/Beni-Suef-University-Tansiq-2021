import './StartPage.css';
import { useHistory } from 'react-router-dom';
/**
 * StartPage
 * @param {*} props
 * @returns Start Page
 */
// eslint-disable-next-line no-unused-vars
function StartPage(props) {
  const history = useHistory();
  return (

    <div className="formContent">

      <p className="pContainer">
        نظام تسجيل الرغبات
        {' '}
        <br />
        {' '}
        لطلاب كلية التكنولوجيا والتعليم 
        <br/>
        جامعة بني سويف
      </p>

      <button type="button" className="signupButton" onClick={() => history.push('/signup')}> إنشاء حساب جديد </button>

    </div>

  );
}

export default StartPage;
