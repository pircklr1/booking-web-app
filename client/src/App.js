import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Signup';
import User from './pages/User';
import NavBar from './components/Navbar';

function App() {
  return (
    <Router>
      <Container>
        <NavBar />
        <Route exact path='/' component={Login} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/settings' component={Settings} />
        <Route exact path='/bookings' component={User} />
      </Container>
    </Router>
  );
}

export default App;
