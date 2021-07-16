import {BrowserRouter as Router, Switch , Route} from "react-router-dom";
import logo from './logo.svg';
import Login from './Components/Login/Login'
import Signup from './Components/SingUP/Signup'
import CompleteSignup from './Components/SingUP/CompleteSignup'
import Forgotpassword from './Components/Login/ForgotPassword/Forgotpassword'
import Setnewpassword from './Components/Login/Setnewpassword/SetnewPassword'
import ChangeComplete from './Components/Login/Setnewpassword/ChangeComplete'
import User from './Components/User/User'
import Admin from "./Components/Admin/Admin";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header"></header>
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/signup" exact component={Signup}/>
          <Route path="/CompleteSignup" exact component={CompleteSignup}/>
          <Route path="/ForgotPassword" exact component={Forgotpassword}/>
          <Route path="/Setnewpassword" exact component={Setnewpassword}/>
          <Route path="/ChangeComplete" exact component={ChangeComplete}/>
          <Route path="/user" component={User}/>
          <Route path="/admin" component={Admin}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
