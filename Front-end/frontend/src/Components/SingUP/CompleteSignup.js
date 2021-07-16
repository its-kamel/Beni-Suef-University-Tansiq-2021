import { Link } from 'react-router-dom';
import UseCompleteSignup from './UseCompleteSignup';
import './CompleteSignup.css';
/**
 * CompleteSignup
 * @returns CompleteSignup Form
 */
function CompleteSignup() {
  const {
    handleSubmit,
  } = UseCompleteSignup();

  return (
    <div className="formcheckinboxContent">
      <form onSubmit={handleSubmit} className="checkinboxForm">

        <i className="messageIcon" />
        <h> تحقق من بريدك الوارد </h>
        <span className="pragrapgh">
        لقد أرسلنا لك رابط التحقق
          {' '}
          <br />
          للتحقق من صحة بريدك الإلكتروني
          <br />
          .لإتمام عملية انشاء الحساب
        </span>

      </form>

    </div>

  );
}
export default CompleteSignup;
