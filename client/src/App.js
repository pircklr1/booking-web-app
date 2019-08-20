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
import Login from './pages/Login';
import Calendar from './pages/Calendar';
import Navbar from './components/Navbar';

class App extends Component {
  render() {
    return (
      <Router>
        <Container>
          <h1>This app is working</h1>
          <Navbar />
        </Container>
        <Switch>
          <Route path='/home' exact component={Calendar} />
          <Route path='/login' component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App;
