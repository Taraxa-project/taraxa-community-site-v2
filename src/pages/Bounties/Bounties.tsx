import React, { useEffect, useRef, useState } from 'react';
import './bounties.scss';
import { menu } from '../../global/globalVars';
import { Text, RewardCard, Switch, VerticalRewardCard, Table } from 'taraxa-ui';
import TaraxaIcon from '../../assets/icons/taraxaIcon';
import PinnedIcon from '../../assets/icons/pinned';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SubmissionIcon from '../../assets/icons/submission';
import ExpirationIcon from '../../assets/icons/expiration';
import UserIcon from './../../assets/icons/user';
import { useMediaQuery } from 'react-responsive';
import Sidebar from '../../components/Sidebar/Sidebar';

function Bounties() {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
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

  const mobileRows = [
    {Icon: UserIcon, data: [{username: 'username43', date: new Date(), wallet: '0x2612b77E5ee1b5feeDdD5eC08731749bC2217F54'}]}, 
    {Icon: UserIcon, data: [{username: 'username43', date: new Date(), wallet: '0x2612b77E5ee1b5feeDdD5eC08731749bC2217F54'}]}, 
    {Icon: UserIcon, data: [{username: 'username43', date: new Date(), wallet: '0x2612b77E5ee1b5feeDdD5eC08731749bC2217F54'}]}, 
    {Icon: UserIcon, data: [{username: 'username43', date: new Date(), wallet: '0x2612b77E5ee1b5feeDdD5eC08731749bC2217F54'}]}, 
    {Icon: UserIcon, data: [{username: 'username43', date: new Date(), wallet: '0x2612b77E5ee1b5feeDdD5eC08731749bC2217F54'}]}, 
    {Icon: UserIcon, data: [{username: 'username43', date: new Date(), wallet: '0x2612b77E5ee1b5feeDdD5eC08731749bC2217F54'}]}];

  const list = <Table columns={columns} rows={isMobile ? mobileRows : rows}/>

  return (
    <>
      <Header />
      <div className={isMobile ? "mobile-bounties" : "bounties"}>
        <Sidebar  />
        <div className="bounties-content">
          <Text label="Taraxa ecosystem bounties" variant="h4" color="primary" className={isMobile ? "mobile-bounties-title" : "bounties-title" }/>
          <Text label="Earn rewards and help grow the Taraxa's ecosystem" variant="body2" color="textSecondary" className={isMobile ? "mobile-bounties-subtitle" : "bounties-subtitle" }/>

          <div className={isMobile ? "mobile-icon-title-container" : "icon-title-container"}>
            <PinnedIcon /> <Text label="Pinned" variant="body1" color="primary" className="icon-title"/>
          </div>
          <div className={isMobile ? "cardContainerMobile" : "cardContainer"}>
            {isMobile ? 
              <VerticalRewardCard title="Incentivized testnet" description="Earn rewards for participating in running testnet nodes" onClick={() => console.log('reward')} onClickText="Learn more" reward="100,000 TARA/month" submissions={23} expiration="Never expires" SubmissionIcon={SubmissionIcon} ExpirationIcon={ExpirationIcon}  />
              :
              <RewardCard title="Incentivized testnet" description="Earn rewards for participating in running testnet nodes" onClick={() => console.log('reward')} onClickText="Learn more" reward="100,000 TARA/month" submissions={23} expiration="Never expires" SubmissionIcon={SubmissionIcon} ExpirationIcon={ExpirationIcon} dataList={list} />
            }
          </div>

          <div className={isMobile ? "mobile-icon-title-container" : "icon-title-container"}>
            <span className="dot"/> <Text label="Active Bounties" variant="body1" color="primary" className="icon-title"/>
          </div>
          <Switch id="bountiesSwitch" name="Show inactive" value={inactive} label="Show inactive" onChange={() => onChangeInactive()} />
          <div className={isMobile ? "cardContainerMobile" : "cardContainer"}>
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
