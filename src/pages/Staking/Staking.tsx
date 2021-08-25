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
import Header from '../../components/Header/Header';

function Staking() {
  const [availableToStake, setAvailableToStake] = useState(0);
  const [totalToStake, setTotalToStake] = useState(0);
  const [stake, setStake] = useState('');
  const [unstake, setUnstake] = useState('');
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
            <DataCard title="N/A" description="Available to Stake" label="TARA" onClickButton={() => console.log('tara')} onClickText="Stake" input={availableInput} dataOptions={stakingchips}  />
            <DataCard title="N/A" description="Staked total" label="TARA" onClickButton={() => console.log('tara')} onClickText="Un-stake" input={totalInput}  dataOptions={unstakingchips} />
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
