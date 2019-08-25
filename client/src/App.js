// This is the first component in front that will be executed

import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { Container, Message } from 'semantic-ui-react';

//Pages
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import User from './pages/User';
import Calendar from './pages/Calendar';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

//layout
import NavBar from './components/NavBar';
import Footer from './components/Footer';

import { AuthProvider } from './context/auth';
import AuthRoute from './utils/AuthRoute';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Router>
          <Container>
            <NavBar />
            <Container>
              <Switch>
                <AuthRoute exact path='/' component={Calendar} />
                <AuthRoute exact path='/home' exact component={Calendar} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={Signup} />

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
