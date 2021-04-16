import logo from '../../../assets/img/logo/logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import './App.css';
import Dashboard from '../dashboard';
import Login from '../login';
import Register from '../register';
import { Provider } from 'react-redux'
import { store } from '../../../config/redux'

function App() {
  return (
    <Provider store={store}>
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/" exact>
            <Dashboard />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
