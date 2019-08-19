import React, { useContext, useState } from 'react';
import { Menu, Segment, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function NavBar() {
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const Navbar = (
    <Menu pointing secondary>
      <Menu.Item
        as={Link}
        to='/home'
        name='Home'
        active={activeItem === 'Calendar'}
      />
      <Menu.Item
        as={Link}
        to='/login'
        name='Login'
        active={activeItem === 'Login'}
      />
      <Menu.Item
        as={Link}
        to='/meetings'
        name='Upcoming meetings'
        active={activeItem === 'Upcoming meetings'}
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
          to='/'
          name='Logout'
          active={activeItem === 'Logout'}
        />
      </Menu.Menu>
    </Menu>
  );

  return NavBar;
}

export default NavBar;
