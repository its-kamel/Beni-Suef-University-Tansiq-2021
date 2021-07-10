import {BrowserRouter as Router, Switch , Route} from "react-router-dom";
import logo from './logo.svg';
import Login from './Components/Login/Login'
import User from './Components/User/User'
import Admin from "./Components/Admin/Admin";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header"></header>
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/user" component={User}/>
          <Route path="/admin" component={Admin}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
