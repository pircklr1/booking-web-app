import React, { useContext, useState } from 'react';
import {
  Menu,
  Responsive,
  Icon,
  Dropdown,
  Sidebar,
  Segment,
  Button,
  Header
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
function NavBar() {
  const { currentUser, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);
  const [visible, setVisible] = useState('Kirjaudu');
  // Handles clicking tasks in desktop-mode.
  const handleItemClick = (e, { name }) => setActiveItem(name);
  console.log('NAVBAR-component, currentUser from useContext for auth: ');
  console.log(currentUser);
  // Handles changes of sidebar visibility in mobile phone-mode.
  const handleToggle = () => setVisible(!visible);

  /* state = { activeItem: 'Kirjaudu',
  visible: false};

// Handles changes of sidebar visibility in mobile phone-mode.
handleToggle = () => this.setState({ visible: !this.state.visible });

// Handles clicking tasks in desktop-mode.
handleItemClick = (e, { name }) => this.setState({ activeItem: name });

render() {
const { activeItem } = this.state;
const {visible } = this.state;
console.log(visible)
console.log(activeItem) */

  const navBar = currentUser ? (
    <div>
      <Responsive minWidth={768}>
        <Menu pointing secondary size='massive' color='blue'>
          <Menu.Item
            as={Link}
            to='/home'
            name='Etusivu'
            active={activeItem === 'Etusivu'}
            onClick={handleItemClick}
          />
          <Menu.Item
            as={Link}
            to='/bookings'
            name='Omat varaukset'
            icon='calendar alternate outline'
            iconPosition='left'
            active={activeItem === 'Omat varaukset'}
            onClick={handleItemClick}
          />
          <Menu.Item
            as={Link}
            to='/admin'
            name='Admin'
            icon='key'
            iconPosition='left'
            active={activeItem === 'Admin'}
            onClick={handleItemClick}
          />
          <Menu.Menu position='right'>
            <Dropdown
              trigger={
                <span>
                  <Icon name='user' />
                  {currentUser.name}
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
                  iconPosition='left'
                  active={activeItem === 'Asetukset'}
                  onClick={handleItemClick}
                ></Menu.Item>

                <Menu.Item
                  as={Link}
                  to='/login'
                  name='Kirjaudu ulos'
                  icon='lock'
                  iconPosition='left'
                  active={activeItem === 'Kirjaudu ulos'}
                  onClick={logout}
                ></Menu.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
      </Responsive>
      <Responsive {...Responsive.onlyMobile}>
        <Menu pointing secondary size='massive' color='blue'>
          <Menu.Item
            as={Link}
            to='/home'
            name='Logo'
            active={activeItem === 'Logo'}
            onClick={handleItemClick}
          />
          <Menu.Menu position='right'>
            <Button
              size={'large'}
              icon={'sidebar'}
              color={'blue'}
              onClick={handleToggle}
            />
          </Menu.Menu>
          <Sidebar
            style={{ background: '#1678C2' }}
            animation={'scale down'}
            direction='right'
            vertical
            inverted
            onHide={handleToggle}
            // width={"thin"}
            // visible={visible}
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
            <Menu.Item
              style={{ color: 'white' }}
              as={Link}
              to='/admin'
              onClick={handleToggle}
            >
              <Icon name='adn' />
              Admin
            </Menu.Item>
            <Menu.Item
              style={{ color: 'white' }}
              as={Link}
              to='/login'
              onClick={handleToggle}
            >
              <Icon name='log out' />
              Kirjaudu ulos
            </Menu.Item>
          </Sidebar>
        </Menu>
      </Responsive>
    </div>
  ) : (
    <Menu pointing secondary size='massive' color='blue'>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to='/'
      />

      <Menu.Menu position='right'>
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to='/login'
        />
        <Menu.Item
          name='signup'
          active={activeItem === 'signup'}
          onClick={handleItemClick}
          as={Link}
          to='/signup'
        />
      </Menu.Menu>
    </Menu>
  );

  return navBar;
}

export default NavBar;
