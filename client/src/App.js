// This is the first component in front that will be executed

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Container} from 'semantic-ui-react';
import './App.css'

//Pages
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import User from './pages/User';
import Calendar from './pages/Calendar';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

//layout
import NavBar from './components/NavBar';
import { AuthProvider } from './context/auth';
import AuthRoute from './utils/AuthRoute';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Router>
          <Container className="components">
            <NavBar />
            <Container>
              <Switch>
                <AuthRoute exact path='/' component={Calendar} />
                <AuthRoute exact path='/home' exact component={Calendar} />
                <Route path='/login' component={Login} />
                <Route path='/forgot' component={ForgotPassword} />
                <Route exact path='/reset/:token' component={ResetPassword} />
                <Route path='/signup' component={Signup} />
                <AuthRoute exact path='/settings' component={Settings} />
                <AuthRoute exact path='/bookings' component={User} />
                <AuthRoute exact path='/admin' component={Admin} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Container>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
