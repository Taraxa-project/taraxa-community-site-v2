import React, { useState } from 'react';
import './staking.scss';
import { menu } from '../../global/globalVars';
import {  BaseCard, Text, DataCard, InputField, Chip } from '@taraxa_project/taraxa-ui';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import InfoIcon from '../../assets/icons/info';
import { useMediaQuery } from 'react-responsive';
import Sidebar from '../../components/Sidebar/Sidebar';

function Staking() {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const [availableToStake, setAvailableToStake] = useState(0);
  const [totalToStake, setTotalToStake] = useState(0);
  const [stake, setStake] = useState('');
  const [unstake, setUnstake] = useState('');
  const [walletConnected, setWallet] = useState(false);

  const availableTrigger = (event: any) => {
    setAvailableToStake(event.target.value);
  }
  const totalTrigger = (event: any) => {
    setTotalToStake(event.target.value);
  }
  const stakingTrigger = (stake: string) => {
    setStake(stake);
  }
  const unstakingTrigger = (stake: string) => {
    setUnstake(stake);
  }
  const availableInput = <InputField type="number" min={1} max={100000} className="whiteInput" label="" color="secondary" placeholder="Enter amount..." value={availableToStake} variant="outlined" fullWidth onChange={availableTrigger} margin="normal" />
  const totalInput = <InputField type="number" min={1} max={100000} className="whiteInput" label="" color="secondary" placeholder="Enter amount..." value={totalToStake} variant="outlined" fullWidth onChange={totalTrigger} margin="normal" />

  const stakingchips = <>
    <Chip label="25%" onClick={() => stakingTrigger('25%')} variant="default" clickable className={ stake === '25%' ? "chipSelected" : "chip"}/>
    <Chip label="50%" onClick={() => stakingTrigger('50%')} className={stake === '50%' ? "chipSelected" : "chip"}  variant="default" clickable/>
    <Chip label="75%" onClick={() => stakingTrigger('75%')} variant="default" clickable className={stake === '75%' ? "chipSelected" : "chip"}/>
    <Chip label="100%" onClick={() => stakingTrigger('100%')} variant="default" clickable className={stake === '100%' ? "chipSelected" : "chip"}/>
  </>
  const unstakingchips = <>
  <Chip label="25%" onClick={() => unstakingTrigger('25%')} variant="default" clickable className={unstake === '25%' ? "chipSelected" : "chip"}/>
  <Chip label="50%" onClick={() => unstakingTrigger('50%')} variant="default" clickable className={unstake === '50%' ? "chipSelected" : "chip"}/>
  <Chip label="75%" onClick={() => unstakingTrigger('75%')}  variant="default" clickable className={unstake === '75%' ? "chipSelected" : "chip"}/>
  <Chip label="100%" onClick={() => unstakingTrigger('100%')} variant="default" clickable className={unstake === '100%' ? "chipSelected" : "chip"}/>
</>
  return (
    <>
      <Header />
      <div className={isMobile ? "stakingRootMobile" : "stakingRoot"}>
        <Sidebar />
        <div className="staking">
          <div className="staking-content">
            <Text label="Staking: Phase 1 - Pre-staking" variant="h4" color="primary" className="staking-title"/>
            <InfoIcon/>
            <Text label="Earn rewards and help test &amp; secure the Taraxa’s network " variant="body2" color="textSecondary" className="staking-subtitle"/>
            {!walletConnected && 
              <div className={isMobile ? "staking-red-stripe-mobile": "staking-red-stripe"}>
                <Text label="Notice:" variant="body1" color="primary" className="staking-title"/>
                <Text label="You are not connected to Metamask wallet" variant="body2" color="primary" className="staking-subtitle"/>
              </div>  
            }
            <div className={isMobile ? "cardContainerMobile" : "cardContainer"}>
              <BaseCard title="0" description="Total TARA earned" />
              <BaseCard title="0" description="Total TARA staked" />
              <BaseCard title="0" description="Anualized yield" />
            </div>
            <div className={isMobile ? "cardContainerMobile" : "cardContainer"}>
              <DataCard title="N/A" description="Available to Stake" label="TARA" onClickButton={() => console.log('tara')} onClickText="Stake" input={availableInput} dataOptions={stakingchips}  />
              <DataCard title="N/A" description="Staked total" label="TARA" onClickButton={() => console.log('tara')} onClickText="Un-stake" input={totalInput}  dataOptions={unstakingchips} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Staking;
