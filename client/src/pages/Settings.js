// This page shows the current user's settings. Here, the user can also modify his or her name, email and password.
import React from 'react';
import SettingsForm from '../components/settings/SettingsForm';
import PasswordSettings from '../components/settings/PasswordSettings';

function Settings() {
  return (
      <div style={{
        backgroundColor: 'white',
        paddingTop: '5px', paddingBottom: '20px', paddingLeft: '20px',
        paddingRight: '20px'
      }}>
      <div className="Settings">
        <h1>Asetukset</h1>
        <SettingsForm/>
        <PasswordSettings/>
      </div>
      </div>
  );
}
export default Settings;
