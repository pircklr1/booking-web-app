import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from 'react-router-dom';
import { Menu, Segment, Container } from 'semantic-ui-react'

class App extends Component{
    state = { activeItem: 'Home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

  return (
    <Router>
        <Container>
      <h1>This app is working</h1>
            <Menu pointing secondary>
                <Menu.Item as={Link} to='/home' name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick} />
                <Menu.Item as={Link} to='/home'
                    name='Login'
                    active={activeItem === 'Login'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item as={Link} to='/meetings'
                    name='Upcoming meetings'
                    active={activeItem === 'Upcoming meetings'}
                    onClick={this.handleItemClick}
                />
                <Menu.Menu position='right'>
                    <Menu.Item as={Link} to='/'
                        name='Logout'
                        active={activeItem === 'Logout'}
                        onClick={this.handleItemClick}
                    />
                </Menu.Menu>
            </Menu>

            <Segment>
                <img src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
            </Segment>
        </Container>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
        </Switch>
    </Router>
  );
}
}

export default App;
