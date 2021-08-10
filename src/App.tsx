import React from 'react';
import './App.css';
import { Button, Title, Card, Sidebar, Footer } from "taraxa-ui";

function App() {
  return (
    <div className="App">
      {<Sidebar disablePadding={true} dense={true} items={[
        { name: 'home', label: 'Home' },
        {
          name: 'billing',
          label: 'Billing',
          items: [
            { name: 'statements', label: 'Statements' },
            { name: 'reports', label: 'Reports' },
          ],
        },
        {
          name: 'settings',
          label: 'Settings',
          items: [{ name: 'profile', label: 'Profile' }],
        },
      ]} />}
      <header className="App-header">     
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {<Title label="Test" variant="h4" color="textPrimary"/>}
        {<Button label="Test" variant="contained"/>}
        {<Card label="Test" value="4.5k"/>}
      </header>
      {<Footer showLabels={false} description="Taraxa is a public ledger platform purpose-built for audit logging of informal transactions."
      links={[
        { label: 'Privacy Policy'},
        { label: 'Terms of Use'}
      ]}
      items={[
      { label: 'Send', value: 'send', icon: 'send' },
      { label: 'Discord', value: 'discord', icon: 'discord' },
      { label: 'Twitter', value: 'twitter', icon: 'twitter' },
      ]}/>}
    </div>
  );
}

export default App;
