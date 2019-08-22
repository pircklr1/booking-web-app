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
            name='Koti'
            active={activeItem === 'Koti'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to='/login'
            name='Kirjaudu sisään'
            active={activeItem === 'Kirjaudu sisään'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to='/bookings'
            name='Omat varaukset'
            active={activeItem === 'Omat varaukset'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to='/settings'
            name='Asetukset'
            active={activeItem === 'Asetukset'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to='/admin'
            name='Admin'
            active={activeItem === 'Admin'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item
              as={Link}
              to='/login'
              name='Kirjaudu ulos'
              active={activeItem === 'Kirjaudu ulos'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default Navbar;
