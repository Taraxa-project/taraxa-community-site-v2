import React, { useState } from 'react';
import './bounties.scss';
import { menu } from '../../global/globalVars';
import { Sidebar, Text, RewardCard, Switch, VerticalRewardCard, Table } from 'taraxa-ui';
import TaraxaIcon from '../../assets/icons/taraxaIcon';
import PinnedIcon from '../../assets/icons/pinned';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SubmissionIcon from '../../assets/icons/submission';
import ExpirationIcon from '../../assets/icons/expiration';
import UserIcon from './../../assets/icons/user';

function Bounties() {
  const [inactive, setInactive] = useState(false);
  const onChangeInactive = () => {
    setInactive(!inactive);
  }

  const columns = [
    { path: "username",   name: "username" },
    { path: "wallet", name: "wallet" },
    { path: "date",  name: "date" },
  ];

  const rows = [
    {Icon: UserIcon, data: [{username: 'username43', wallet: '0x2612b77E5ee1b5feeDdD5eC08731749bC2217F54', date: new Date()}]}, 
    {Icon: UserIcon, data: [{username: 'username43', wallet: '0x2612b77E5ee1b5feeDdD5eC08731749bC2217F54', date: new Date()}]}, 
    {Icon: UserIcon, data: [{username: 'username43', wallet: '0x2612b77E5ee1b5feeDdD5eC08731749bC2217F54', date: new Date()}]}, 
    {Icon: UserIcon, data: [{username: 'username43', wallet: '0x2612b77E5ee1b5feeDdD5eC08731749bC2217F54', date: new Date()}]}, 
    {Icon: UserIcon, data: [{username: 'username43', wallet: '0x2612b77E5ee1b5feeDdD5eC08731749bC2217F54', date: new Date()}]}, 
    {Icon: UserIcon, data: [{username: 'username43', wallet: '0x2612b77E5ee1b5feeDdD5eC08731749bC2217F54', date: new Date()}]}];

  const list = <Table columns={columns} rows={rows}/>

  return (
    <>
      <Header />
      <div className="home">
        <Sidebar disablePadding={true} dense={true} items={menu} className="bounties-sidebar" />
        <div className="bounties-content">
          <Text label="Taraxa ecosystem bounties" variant="h4" color="primary" className="bounties-title"/>
          <Text label="Earn rewards and help grow the Taraxa's ecosystem" variant="body2" color="textSecondary" className="bounties-subtitle"/>

          <div className="icon-title-container">
            <PinnedIcon /> <Text label="Pinned" variant="body1" color="primary" className="icon-title"/>
          </div>
          <div className="cardContainer">
            <RewardCard title="Incentivized testnet" description="Earn rewards for participating in running testnet nodes" onClick={() => console.log('reward')} onClickText="Learn more" reward="100,000 TARA/month" submissions={23} expiration="Never expires" SubmissionIcon={SubmissionIcon} ExpirationIcon={ExpirationIcon} dataList={list} />
          </div>

          <div className="icon-title-container">
            <span className="dot"/> <Text label="Active Bounties" variant="body1" color="primary" className="icon-title"/>
          </div>
          <Switch id="bountiesSwitch" name="Show inactive" value={inactive} label="Show inactive" onChange={() => onChangeInactive()} />
          <div className="cardContainer">
            <VerticalRewardCard title="Bug bounty" description="Earn rewards for participating in running testnet nodes" onClick={() => console.log('reward')} onClickText="Learn more" reward="100,000 TARA/month" submissions={23} expiration="Never expires" SubmissionIcon={SubmissionIcon} ExpirationIcon={ExpirationIcon} />
            <VerticalRewardCard title="Bug bounty" description="Earn rewards for participating in running testnet nodes" onClick={() => console.log('reward')} onClickText="Learn more" reward="100,000 TARA/month" submissions={23} expiration="Never expires" SubmissionIcon={SubmissionIcon} ExpirationIcon={ExpirationIcon} />
            <VerticalRewardCard title="Bug bounty" description="Earn rewards for participating in running testnet nodes" onClick={() => console.log('reward')} onClickText="Learn more" reward="100,000 TARA/month" submissions={23} expiration="Never expires" SubmissionIcon={SubmissionIcon} ExpirationIcon={ExpirationIcon} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Bounties;
