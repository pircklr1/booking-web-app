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
import Register from './pages/Signup';
import User from './pages/User';
import Calendar from './pages/Calendar';
import Admin from './pages/Admin';

import Navbar from './components/Navbar';
import withAuth from './components/WithAuth';

class App extends Component {
  render() {
    return (
      <Router>
        <Container>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/home' component={Calendar} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/settings' component={Settings} />
            <Route exact path='/bookings' component={User} />
            <Route exact path='/admin' component={Admin} />
            <Route
              render={() => (
                <h2 className='neljanollanelja'>404 Sivua ei löytynyt</h2>
              )}
            />
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
