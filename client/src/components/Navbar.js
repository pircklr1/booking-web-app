import React, { Component } from 'react';
import { Menu, Responsive, Icon, Dropdown, Sidebar, Segment, Button, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  state = { activeItem: 'Kirjaudu',
            visible: false};

  handlePusher = () => {
    const { visible } = this.state.visible;

    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const {visible } = this.state;
    console.log(visible)
    console.log(activeItem)

    return (
      <div>
        <Responsive minWidth={768}>
        <Menu pointing secondary>
          <Menu.Item
            as={Link}
            to='/home'
            name='Etusivu'
            active={activeItem === 'Etusivu'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to='/login'
            name='Kirjaudu'
            active={activeItem === 'Kirjaudu'}
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
        </Responsive>
        <Responsive {...Responsive.onlyMobile}>
          <Menu pointing secondary>
            <Menu.Item
                as={Link}
                to='/home'
                name='Logo'
                active={activeItem === 'Logo'}
                onClick={this.handleItemClick}>
            </Menu.Item>
            <Menu.Menu position='right'>
                <Button size={"large"} icon={'sidebar'} color={"blue"} onClick={this.handleToggle}>
                </Button>
            </Menu.Menu>
              <Sidebar style={{background: '#1678C2'}}
                  animation={'scale down'}
                  direction='right'
                  vertical
                  inverted
                       onHide={this.handleToggle}
                  // width={"thin"}
              visible={visible}
              >
                <Menu.Item style={{color: 'white'}}
                    as={Link}
                           to='/home'
                           onClick={this.handleToggle}>
                  <Icon name='home' />
                  Etusivu
                </Menu.Item>
                <Menu.Item style={{color: 'white'}}
                    as={Link}
                           to='/bookings'
                           onClick={this.handleToggle}>
                  <Icon name='user' />
                  Omat varaukset
                </Menu.Item>
                <Menu.Item style={{color: 'white'}}
                           as={Link}
                           to='/settings'
                           onClick={this.handleToggle}>
                  <Icon name='settings' />
                  Asetukset
                </Menu.Item>
                <Menu.Item style={{color: 'white'}}
                           as={Link}
                           to='/admin'
                           onClick={this.handleToggle}>
                  <Icon name='adn'/>
                  Admin
                </Menu.Item>
                <Menu.Item style={{color: 'white'}}
                           as={Link}
                           to='/login'
                           onClick={this.handleToggle}>
                  <Icon name='log out' />
                  Kirjaudu ulos
                </Menu.Item>
              </Sidebar>
        </Menu>
        </Responsive>
      </div>
    );
  }
}

export default Navbar;
