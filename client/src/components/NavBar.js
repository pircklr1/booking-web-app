import React, { useContext, useState } from 'react';
import {
  Menu,
  Responsive,
  Icon,
  Dropdown,
  Sidebar,
  Button,
  Image
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';

function NavBar() {
  const { currentUser, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);
  const [visible, setVisible] = useState(false);

  let username = 'Käyttäjä';
  if (currentUser !== null) {
    if (typeof currentUser !== 'undefined') {
      username = currentUser.username;
    }
  }

  // Handles clicking tasks in desktop-mode.
  const handleItemClick = (e, { name }) => setActiveItem(name);

  const handleHomeItemClick = (e, { name }) => setActiveItem('');

  //Handles changes of sidebar visibility in mobile phone-mode.
  const handleToggle = () => {
    setVisible(!visible);
  };

  const navBar = currentUser ? (
    <div>
      <Responsive minWidth={768}>
        <Menu
          pointing
          secondary
          size='large'
          color='blue'
          style={{ backgroundColor: 'white' }}
        >
          <Menu.Item
            style={{ padding: 0 }}
            as={Link}
            to='/home'
            onClick={handleHomeItemClick}
          >
            <Image
              size='small'
              src='/logo3.png'
              style={{ height: 'auto', widht: '100%' }}
            />
          </Menu.Item>
          <Menu.Item
            as={Link}
            to='/bookings'
            name='bookings'
            iconposition='left'
            active={activeItem === 'bookings'}
            onClick={handleItemClick}
          >
            <Icon name='calendar alternate outline' />
            Omat varaukset
          </Menu.Item>
          {currentUser.isadmin &&
          <Menu.Item
              as={Link}
              to='/admin'
              name='admin'
              iconposition='left'
              active={activeItem === 'admin'}
              onClick={handleItemClick}
          >
            <Icon name='key'/>
            Admin
          </Menu.Item>
          }
          <Menu.Menu position='right'>
            <Dropdown
              trigger={
                <span>
                  <Icon name='user' />
                  {username}
                </span>
              }
              fluid
              className='icon link item'
            >
              <Dropdown.Menu>
                <Menu.Item
                  as={Link}
                  to='/settings'
                  name='Asetukset'
                  icon='setting'
                  iconposition='left'
                  active={activeItem === 'Asetukset'}
                  onClick={handleItemClick}
                ></Menu.Item>

                <Menu.Item
                  as={Link}
                  to='/login'
                  name='Kirjaudu ulos'
                  icon='lock'
                  iconposition='left'
                  active={activeItem === 'Kirjaudu ulos'}
                  onClick={logout}
                ></Menu.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
      </Responsive>
      <Responsive {...Responsive.onlyMobile}>
        <Menu
          pointing
          secondary
          size='small'
          color='blue'
          style={{ backgroundColor: 'white' }}
        >
          <Menu.Item
            as={Link}
            to='/home'
            name='Logo'
            active={activeItem === 'Logo'}
            onClick={handleHomeItemClick}
            style={{ padding: 0 }}
          >
            <Image
              size='small'
              src='/logo3.png'
              style={{ height: 'auto', widht: '100%' }}
            />
          </Menu.Item>
          <Menu.Menu position='right'>
            <Button icon onClick={handleToggle} color='blue'>
              <Icon name='sidebar' />
            </Button>
          </Menu.Menu>
          <Sidebar
            style={{ background: '#1678C2' }}
            animation={'scale down'}
            direction='right'
            vertical='true'
            inverted='true'
            onHide={handleToggle}
            // width={"thin"}
            visible={visible}
          >
            <Menu.Item
              style={{ color: 'white' }}
              as={Link}
              to='/home'
              onClick={handleToggle}
            >
              <Icon name='home' />
              Etusivu
            </Menu.Item>
            <Menu.Item
              style={{ color: 'white' }}
              as={Link}
              to='/bookings'
              onClick={handleToggle}
            >
              <Icon name='user' />
              Omat varaukset
            </Menu.Item>
            <Menu.Item
              style={{ color: 'white' }}
              as={Link}
              to='/settings'
              onClick={handleToggle}
            >
              <Icon name='settings' />
              Asetukset
            </Menu.Item>
            {currentUser.isadmin &&
            <Menu.Item
                style={{color: 'white'}}
                as={Link}
                to='/admin'
                onClick={handleToggle}
            >
              <Icon name='adn'/>
              Admin
            </Menu.Item>
            }
            <Menu.Item
              style={{ color: 'white' }}
              as={Link}
              to='/login'
              onClick={logout}
            >
              <Icon name='log out' />
              Kirjaudu ulos
            </Menu.Item>
          </Sidebar>
        </Menu>
      </Responsive>
    </div>
  ) : (
    <div>
      <Responsive minWidth={768}>
        <Menu
          pointing
          secondary
          size='large'
          color='blue'
          style={{ backgroundColor: 'white' }}
        >
          <Menu.Item
            style={{ padding: 0 }}
            as={Link}
            to='/home'
            onClick={handleHomeItemClick}
          >
            <Image
              size='small'
              src='/logo3.png'
              style={{ height: 'auto', widht: '100%' }}
            />
          </Menu.Item>
          <Menu.Item
            position='right'
            as={Link}
            to='/login'
            name='login'
            iconposition='left'
            active={activeItem === 'login'}
            onClick={handleItemClick}
          >
            <Icon name='key' />
            Kirjaudu
          </Menu.Item>
          {/*<Menu.Item*/}
          {/*  as={Link}*/}
          {/*  to='/signup'*/}
          {/*  name='signup'*/}
          {/*  iconposition='left'*/}
          {/*  active={activeItem === 'signup'}*/}
          {/*  onClick={handleItemClick}*/}
          {/*>*/}
          {/*  <Icon name='signup' />*/}
          {/*  Rekisteröidy*/}
          {/*</Menu.Item>*/}
        </Menu>
      </Responsive>
      <Responsive {...Responsive.onlyMobile}>
        <Menu
          pointing
          secondary
          size='large'
          color='blue'
          style={{ backgroundColor: 'white' }}
        >
          <Menu.Item
            as={Link}
            to='/home'
            name='Logo'
            active={activeItem === 'Logo'}
            onClick={handleHomeItemClick}
            style={{ padding: 0 }}
          >
            <Image
              size='small'
              src='/logo3.png'
              style={{ height: 'auto', widht: '100%' }}
            />
          </Menu.Item>
          <Menu.Menu position='right'>
            <Button icon onClick={handleToggle} color='blue'>
              <Icon name='sidebar' />
            </Button>
          </Menu.Menu>
          <Sidebar
            style={{ background: '#1678C2' }}
            animation={'scale down'}
            direction='right'
            vertical
            inverted
            onHide={handleToggle}
            // width={"thin"}
            visible={visible}
          >
            <Menu.Item
              style={{ color: 'white' }}
              as={Link}
              to='/login'
              onClick={handleToggle}
            >
              <Icon name='key' />
              Kirjaudu sisään
            </Menu.Item>
            {/*<Menu.Item*/}
            {/*  style={{ color: 'white' }}*/}
            {/*  as={Link}*/}
            {/*  to='/signup'*/}
            {/*  onClick={handleToggle}*/}
            {/*>*/}
            {/*  <Icon name='signup' />*/}
            {/*  Rekisteröidy*/}
            {/*</Menu.Item>*/}
          </Sidebar>
        </Menu>
      </Responsive>
    </div>
  );

  return navBar;
}

export default NavBar;
