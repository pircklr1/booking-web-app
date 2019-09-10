// Admin panel
import React, { useState, useEffect } from 'react';
import {Container, Header, Icon, Grid, Tab, Responsive} from 'semantic-ui-react';
import Rooms from "../components/admin/Rooms";
import AdminInviteUser from "../components/admin/AdminInviteUser";
import AdminAllUsers from "../components/admin/AdminAllUsers";
import Bookings from "../components/admin/Bookings";

function Admin() {

  const panes = [
    { menuItem: 'Käyttäjät', render: () => <Tab.Pane><AdminInviteUser/><AdminAllUsers/></Tab.Pane> },
    { menuItem: 'Huoneet', render: () => <Tab.Pane><Rooms/></Tab.Pane> },
    { menuItem: 'Varaukset', render: () => <Tab.Pane><Bookings/></Tab.Pane> },
  ];

  return (
      <div>
        <Responsive minWidth={768} style={{backgroundColor: 'white',
          paddingTop: '20px', paddingBottom: '20px', paddingLeft: '20px',
          paddingRight: '20px'}}>
          <Header as='h2' block>
            <Icon name='settings' />
            <Header.Content>
              Admin-paneeli
            </Header.Content>
          </Header>
          <Container style={{overflow:'auto'}}>
          <Tab panes={panes} />
          </Container>
        </Responsive>
        <Responsive {...Responsive.onlyMobile} style={{backgroundColor: 'white',
          paddingTop: '20px', paddingBottom: '20px', marginLeft: '0px', marginRight: '0px'}}>
          <Header as='h2' block>
            <Icon name='settings' />
            <Header.Content>
              Admin-paneeli
            </Header.Content>
          </Header>
          <Container style={{overflow:'auto'}}>
            <Tab panes={panes} />
          </Container>
        </Responsive>
      </div>
  );
}

export default Admin;
