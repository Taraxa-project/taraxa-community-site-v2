import React, { useState } from 'react';
import './bounties.scss';
import { menu } from '../../global/globalVars';
import { Sidebar, Text, Footer, RewardCard } from 'taraxa-ui';
import TaraxaIcon from '../../assets/icons/taraxaIcon';
import PinnedIcon from '../../assets/icons/pinned';
import Header from '../../components/Header/Header';
import SubmissionIcon from '../../assets/icons/submission';
import ExpirationIcon from '../../assets/icons/expiration';
import BountiesIcon from './../../assets/icons/bounties';

function Bounties() {

  return (
    <>
      <Header />
      <div className="home">
        <Sidebar disablePadding={true} dense={true} items={menu} className="bounties-sidebar" />
        <div className="bounties-content">
          <Text label="Taraxa ecosystem bounties" variant="h4" color="primary" className="bounties-title"/>
          <Text label="Earn rewards and help grow the Taraxa's ecosystem" variant="body2" color="textSecondary" className="bounties-subtitle"/>
          <div className="cardContainer">
            <div className="icon-title-container">
              <PinnedIcon /> <Text label="Pinned" variant="body1" color="primary" className="icon-title"/>
            </div>
          </div>
          <div className="cardContainer">
            <RewardCard title="Incentivized testnet" description="Earn rewards for participating in running testnet nodes" onClick={() => console.log('reward')} onClickText="Learn more" reward="100,000 TARA/month" submissions={23} expiration="Never expires" SubmissionIcon={SubmissionIcon} ExpirationIcon={ExpirationIcon} />
          </div>

          <div className="cardContainer">
            <div className="icon-title-container">
              <BountiesIcon /> <Text label="Active Bounties" variant="body1" color="primary" className="icon-title"/>
            </div>
          </div>
          <div className="cardContainer">
            <RewardCard title="Bug bounty" description="Earn rewards for participating in running testnet nodes" onClick={() => console.log('reward')} onClickText="Learn more" reward="100,000 TARA/month" submissions={23} expiration="Never expires" SubmissionIcon={SubmissionIcon} ExpirationIcon={ExpirationIcon} />
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

export default Bounties;
