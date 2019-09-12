// This page shows the current user's settings. Here, the user can also modify his or her name, email and password.
import React from 'react';
import SettingsForm from '../components/settings/SettingsForm';
import PasswordSettings from '../components/settings/PasswordSettings';
import {Container, Header, Icon, Tab, Responsive} from 'semantic-ui-react';

function Settings() {
  return (
    <div>
        <Responsive minWidth={768} style={{backgroundColor: 'white',
            paddingTop: '20px', paddingBottom: '20px', paddingLeft: '20px',
            paddingRight: '20px'}}>
            <Header as='h2' block>
                <Icon name='cog' />
                <Header.Content>
                    Asetukset
                </Header.Content>
            </Header>
            <Container style={{overflow:'auto'}}>
                <SettingsForm/>
                <PasswordSettings/>
            </Container>
        </Responsive>
        <Responsive {...Responsive.onlyMobile} style={{backgroundColor: 'white',
            paddingTop: '20px', paddingBottom: '20px', marginLeft: '0px', marginRight: '0px'}}>
            <Header as='h2' block>
                <Icon name='settings' />
                <Header.Content>
                    Asetukset
                </Header.Content>
            </Header>
            <Container style={{overflow:'auto'}}>
                <SettingsForm/>
                <PasswordSettings/>
            </Container>
        </Responsive>
    </div>
  );
}
export default Settings;
