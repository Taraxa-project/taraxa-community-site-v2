import React, { useState } from 'react';
import './staking.scss';
import { menu } from '../../global/globalVars';
import { Sidebar, BaseCard, Text, Footer, DataCard, InputField, Chip } from 'taraxa-ui';
import TaraxaIcon from '../../assets/icons/taraxaIcon';
import StakingIcon from '../../assets/icons/staking';
import BountiesIcon from '../../assets/icons/bounties';
import RedeemIcon from '../../assets/icons/redeem';
import NodeIcon from '../../assets/icons/node';
import ExplorerIcon from '../../assets/icons/explorer';
import DeployIcon from '../../assets/icons/deploy';
import Header from '../../components/Header';

function Staking() {
  const [availableToStake, setAvailableToStake] = useState(0);
  const [totalToStake, setTotalToStake] = useState(0);
  const [twentyfive, setTwentyfive] = useState(false);
  const [fifty, setFifty] = useState(false);
  const [seventyfive, setSeventyfive] = useState(false);
  const [hundred, setHundred] = useState(false);
  const [untwentyfive, setunTwentyfive] = useState(false);
  const [unfifty, setunFifty] = useState(false);
  const [unseventyfive, setunSeventyfive] = useState(false);
  const [unhundred, setunHundred] = useState(false);
  const availableTrigger = (event: any) => {
    setAvailableToStake(event.target.value);
  }
  const totalTrigger = (event: any) => {
    setTotalToStake(event.target.value);
  }
  const resetChips = () => {
    setTwentyfive(false); setFifty(false); setSeventyfive(false); setHundred(false);
  }
  const twentyfiveTrigger = () => {
    resetChips();
    setTwentyfive(!twentyfive);
  }
  const fiftyTrigger = () => {
    resetChips();
    setFifty(!fifty);
  }
  const seventyfiveTrigger = () => {
    resetChips();
    setSeventyfive(!seventyfive);
  }
  const hundredTrigger = () => {
    resetChips();
    setHundred(!hundred);
  }
  const resetunChips = () => {
    setunTwentyfive(false); setunFifty(false); setunSeventyfive(false); setunHundred(false);
  }
  const untwentyfiveTrigger = () => {
    resetunChips();
    setunTwentyfive(!untwentyfive);
  }
  const unfiftyTrigger = () => {
    resetunChips();
    setunFifty(!unfifty);
  }
  const unseventyfiveTrigger = () => {
    resetunChips();
    setunSeventyfive(!unseventyfive);
  }
  const unhundredTrigger = () => {
    resetunChips();
    setunHundred(!unhundred);
  }
  const availableInput = <InputField type="number" min={1} max={100000} className="whiteInput" label="" color="secondary" placeholder="Enter amount..." value={availableToStake} variant="outlined" fullWidth onChange={availableTrigger} margin="normal" />
  const totalInput = <InputField type="number" min={1} max={100000} className="whiteInput" label="" color="secondary" placeholder="Enter amount..." value={totalToStake} variant="outlined" fullWidth onChange={totalTrigger} margin="normal" />

  const stakingchips = <>
    <Chip label="25%" onClick={() => twentyfiveTrigger()} variant="default" clickable color={twentyfive ? "secondary" : "primary"} className={twentyfive ? "chipSelected" : "chip"}/>
    <Chip label="50%" onClick={fiftyTrigger} className={fifty ? "chipSelected" : "chip"}  variant="default" clickable/>
    <Chip label="75%" onClick={seventyfiveTrigger} variant="default" clickable className={seventyfive ? "chipSelected" : "chip"}/>
    <Chip label="100%" onClick={hundredTrigger} variant="default" clickable className={hundred ? "chipSelected" : "chip"}/>
  </>
  const unstakingchips = <>
  <Chip label="25%" onClick={untwentyfiveTrigger} variant="default" clickable className={untwentyfive ? "chipSelected" : "chip"}/>
  <Chip label="50%" onClick={unfiftyTrigger} variant="default" clickable className={unfifty ? "chipSelected" : "chip"}/>
  <Chip label="75%" onClick={unseventyfiveTrigger}  variant="default" clickable className={unseventyfive ? "chipSelected" : "chip"}/>
  <Chip label="100%" onClick={unhundredTrigger} variant="default" clickable className={unhundred ? "chipSelected" : "chip"}/>
</>
  return (
    <>
      <Header />
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
            <BaseCard title="0" description="TARA Staked" />
            <BaseCard title="0" description="TARA Earned" />
            <BaseCard title="0" description="Anualized yield" />
          </div>
          <div className="cardContainer">
            <DataCard title="N/A" description="Available to Stake" label="TARA" onClick={() => console.log('tara')} onClickText="Stake" input={availableInput} dataOptions={stakingchips}  />
            <DataCard title="N/A" description="Staked total" label="TARA" onClick={() => console.log('tara')} onClickText="Un-stake" input={totalInput}  dataOptions={unstakingchips} />
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
