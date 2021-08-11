import React from 'react';
import './App.css';
import { Button, Title, Card, Sidebar, Footer } from "taraxa-ui";
import MenuDashboard from './icons/menu-dashboard';
import MenuEarn from './icons/menu-earn';
import MenuTestnet from './icons/menu-testnet';
import MenuSupport from './icons/menu-support';
import Staking from './icons/staking';


const menu = [
  { name: 'dashboard', label: 'Dashboard', Icon: MenuDashboard, location: "/dashboard"},
  {
    name: 'earn',
    label: 'Earn',
    Icon: MenuEarn,
    items: [
      { name: 'staking', label: 'Staking' },
      { name: 'bounties', label: 'Bounties' },
      { name: 'redeem', label: 'Redeem' },
    ],
  },
  {
    name: 'testnet',
    label: 'Testnet',
    Icon: MenuTestnet,
    items: [
      { name: 'runnode', label: 'Run a Node' },
      { name: 'explorer', label: 'Taraxa Explorer' },
      { name: 'deploy', label: 'Deploy DApps' },
      { name: 'wallet', label: 'Wallet' }
    ],
  },
  { name: 'support', label: 'Support', Icon: MenuSupport }
];

function App() {
  return (
    <div className="App">
      {<Sidebar disablePadding={true} dense={true} items={menu} />}
      <header className="App-header">     
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {<Title label="Test" variant="h4" color="textPrimary"/>}
        {<Button label="Test" variant="contained"/>}
        {<Card title="Staking" description="Earn rewards while helping to secure Taraxa's network" onClickText="Get Started" onClick={() => console.log("here")} Icon={Staking}/>}
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
