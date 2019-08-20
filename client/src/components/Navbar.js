import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  state = { activeItem: 'Login' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            as={Link}
            to='/home'
            name='Home'
            active={activeItem === 'Home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to='/login'
            name='Login'
            active={activeItem === 'Login'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to='/bookings'
            name='Upcoming meetings'
            active={activeItem === 'Upcoming meetings'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to='/settings'
            name='Settings'
            active={activeItem === 'Settings'}
          />
          <Menu.Menu position='right'>
            <Menu.Item
              as={Link}
              to='/login'
              name='Logout'
              active={activeItem === 'Logout'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default Navbar;
