import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { Container } from 'semantic-ui-react';

//Pages
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import User from './pages/User';
import Calendar from './pages/Calendar';
import Admin from './pages/Admin';
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

//layout
import Navbar from './components/Navbar';

import Footer from './components/Footer';

import { AuthProvider } from './context/auth';
import AuthRoute from './utils/AuthRoute';

import withAuth from './components/WithAuth';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Router>
          <Container>
            <Navbar />
            <Container>
              <Switch>
                <Route exact path='/' component={Login} />
                <AuthRoute path='/home' exact component={Calendar} />
                <Route path='/login' component={Login} />
                  <Route path='/forgot' component={ForgotPassword}/>
                    <Route path='/reset' component={ResetPassword}/>
                <Route path='/signup' component={Signup} />

                <AuthRoute exact path='/settings' component={Settings} />
                <AuthRoute exact path='/bookings' component={User} />
                <AuthRoute exact path='/admin' component={Admin} />
                <Route
                  render={() => (
                    <h2 className='neljanollanelja'>404 Sivua ei löytynyt</h2>
                  )}
                />
              </Switch>
            </Container>
          </Container>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
