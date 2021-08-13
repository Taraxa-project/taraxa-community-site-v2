import React from 'react';
import './staking.scss';
import { menu } from '../../global/globalVars';
import { Sidebar, Card, Text, Header, Footer } from 'taraxa-ui';
import TaraxaIcon from '../../assets/icons/taraxaIcon';
import StakingIcon from '../../assets/icons/staking';
import BountiesIcon from '../../assets/icons/bounties';
import RedeemIcon from '../../assets/icons/redeem';
import NodeIcon from '../../assets/icons/node';
import ExplorerIcon from '../../assets/icons/explorer';
import DeployIcon from '../../assets/icons/deploy';

function Staking() {
  return (
    <>
      <Header color="primary" position="static" Icon={TaraxaIcon} elevation={0} />
      <div className="home">
        <Sidebar disablePadding={true} dense={true} items={menu} className="staking-sidebar" />
        <div className="staking-content">
          <Text label="Staking: Phase 1 - Simulated staking" variant="h4" color="primary" className="staking-title"/>
          <Text label="Earn rewards and help test &amp; secure the Taraxa’s network " variant="body2" color="textSecondary" className="staking-subtitle"/>
          <div className="staking-red-stripe">
            <Text label="Notice:" variant="body1" color="primary" className="staking-title"/>
            <Text label="You are not connected to Metamask wallet" variant="body2" color="primary" className="staking-subtitle"/>
          </div>
          <div className="cardContainer">
            
          </div>
        </div>
      </div>
      <Footer title="TARAXA" Icon={TaraxaIcon} showLabels={false} description="Taraxa is a public ledger platform purpose-built for audit logging of informal transactions."
        links={[
          { label: 'Privacy Policy'},
          { label: 'Terms of Use'}
        ]}
        items={[
        { label: 'Send', value: 'send', icon: 'send' },
        { label: 'Discord', value: 'discord', icon: 'discord' },
        { label: 'Twitter', value: 'twitter', icon: 'twitter' },
        ]}/>
    </>
  )
}

export default Staking;
