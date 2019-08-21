import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Room from './components/Room';
import RoomList from './components/RoomList';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Signup';
import User from './pages/User';
import Calendar from './pages/Calendar';
import Navbar from './components/Navbar';

class App extends Component {
  render() {
    return (
      <Router>
        <Container>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/home' exact component={Calendar} />
            <Route path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/settings' component={Settings} />
            <Route exact path='/bookings' component={User} />
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
