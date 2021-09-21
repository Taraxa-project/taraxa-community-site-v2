import { useEffect, useState } from 'react';
import { useMetaMask } from "metamask-react";
import './staking.scss';
import {  BaseCard, Text, DataCard, InputField, Chip, Tooltip, Modal, Button, TopCard } from '@taraxa_project/taraxa-ui';
import { useBlockchain } from '../../services/useBlockchain';
import useToken from '../../services/useToken';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import InfoIcon from '../../assets/icons/info';
import { useMediaQuery } from 'react-responsive';
import Sidebar from '../../components/Sidebar/Sidebar';
import SuccessIcon from '../../assets/icons/success';
import LockIcon from './../../assets/icons/lock';
import ErrorIcon from './../../assets/icons/error';
import TrophyIcon from '../../assets/icons/trophy';

let modalSuccess = false;
let modalError = false;
let stakedFunds = true;
let topCard = true;

function Staking() {

  const blockchain = useBlockchain();
  const { status, account, connect } = useMetaMask();
  const token = useToken();

  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const [availableToStake, setAvailableToStake] = useState(0);
  const [totalToStake, setTotalToStake] = useState(0);
  const [stake, setStake] = useState('');
  const [unstake, setUnstake] = useState('');
  const [walletConnected, setWallet] = useState(true);

  useEffect(() => {
    const getTokenBalance = async () => {
      const ti = token();
      const balance = await ti.balanceOf(account);
      setAvailableToStake(balance.toString());
    };
    getTokenBalance();
  }, []);

  const modalTrigger = () => {
    modalSuccess = false;
    modalError = false;
  }

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

  const stakingSuccessModal = <div>
    <Text label="SUCCESS" variant="h6" color="primary"  />
    <div className="iconContainer">
      <SuccessIcon />
    </div>
    <Text label="Your 1000 TARA has been successfully transferred to staking contract. View Etherscan" variant="body2" color="primary"  />

    <div className="staking-success-container">
      <Text label="Please keep in mind:" className="title" />
        <div className="lock-container">
          <LockIcon />
          <Text className="lock-container-text" label="Lock-in period: 30 days" color="primary" />
        </div>
        <Text label="After 30 days you will be able to withdraw your TARA (If you don’t withdraw, your funds remain staked and unlocked). View full staking rules" color="textSecondary" />
    </div>
    <Button className="staking-success-button" label="OK" color="secondary" variant="contained" fullWidth onClick={() => modalSuccess = false} />
  </div>

  const stakingErrorModal = <div>
    <Text label="ERROR" variant="h6" color="primary"  />
    <div className="iconContainer">
      <ErrorIcon />
    </div>
    <Text label="Minimum amount to stake is 1000 TARA." variant="body2" color="primary"  />

    
    <Button className="staking-error-button" label="OK" color="secondary" variant="contained" fullWidth onClick={() => modalSuccess = false} />
  </div>

  const topData = <div>
    <div className="top-data-header">
      <Text label="Top stakers" variant="body1" color="primary"/>
      <Text label="See full list" variant="body1" color="primary"/>
    </div>
    <table cellSpacing="8">
      <tr>
        <td>1.</td>
        <td><TrophyIcon /> vitalik</td>
        <td>0xe08c0 ... 29b34</td>
        <td>4,000,000 TARA</td>
      </tr>
      <tr>
        <td>2.</td>
        <td><TrophyIcon /> username2</td>
        <td>0xe08c0 ... 29b34</td>
        <td>800,000 TARA</td>
      </tr>
      <tr>
        <td>3.</td>
        <td><TrophyIcon /> mark_cuban</td>
        <td>0xe08c0 ... 29b34</td>
        <td>750,000 TARA</td>
      </tr>
    </table>
  </div>
  return (
    <>
      <Header />
      <Modal id="signinModal" title="Test" show={modalSuccess ? modalSuccess : modalError} children={modalSuccess ? stakingSuccessModal : stakingErrorModal } parentElementID="root" onRequestClose={modalTrigger}/>
      <div className={isMobile ? "stakingRootMobile" : "stakingRoot"}>
        <Sidebar />
        <div className="staking">
          <div className="staking-content">
            <div className={isMobile ? "mobile-staking-icon-container" : "staking-icon-container"}>
              <Text label="Staking: Phase 1 - Pre-staking" variant="h4" color="primary" className="staking-title"/>
              <Tooltip className="staking-icon-tooltip" title="We’re currently in the first phase of staking roll-out, Pre-staking, which enables TARA lockups on the ETH network. The next phase will be Mirrored Staking, which mirrors staking data from the ETH network over to the Taraxa testnet to enable delegation to consensus nodes. The last phase is mainnet launch, in which all tokens, staking, and delegation is migrated to the Taraxa mainnet." Icon={InfoIcon} />
            </div>
            <Text label="Earn rewards and help test &amp; secure the Taraxa’s network " variant="body2" color="textSecondary" className={isMobile ? "mobile-staking-subtitle": "staking-subtitle"}/>
            {!walletConnected && 
              <div className={isMobile ? "staking-red-stripe-mobile": "staking-red-stripe"}>
                <Text label="Notice:" variant="body1" color="primary" className="staking-title"/>
                <Text label="You are not connected to Metamask wallet" variant="body2" color="primary" className="staking-subtitle"/>
              </div>  
            }
            {/* <div>
                <TopCard title="23,124,123" description="Total TARA Staked" topData={topData} />
              </div> */}
            <div className={isMobile ? "cardContainerMobile" : "cardContainer"}>
              <BaseCard title="0" description="Total TARA earned" tooltip={<Tooltip className="staking-icon-tooltip" title="Total number of TARA staking rewards earned for the lifetime of the connected wallet." Icon={InfoIcon} />} />
              <BaseCard title="0" description="Total TARA staked" tooltip={<Tooltip className="staking-icon-tooltip" title="Total number of TARA currently staked in the staking contract for connected wallet." Icon={InfoIcon} />} />
              <BaseCard title="0" description="Anualized yield" tooltip={<Tooltip className="staking-icon-tooltip" title="Effective annualized yield, this could be different than the stated expected yields due to special community events. " Icon={InfoIcon} />} />
            </div>
            <div className={isMobile ? "cardContainerMobile" : "cardContainer"}>
              <DataCard title="N/A" description="Available to Stake" label="TARA" onClickButton={() => console.log('tara')} onClickText="Stake" input={availableInput} dataOptions={stakingchips} tooltip={<Tooltip  title="Total number of TARA currently in the connected wallet that could be staked." Icon={InfoIcon} />} />
              <DataCard title="N/A" description="Staked total" label="TARA" onClickButton={() => console.log('tara')} onClickText="Un-stake" input={totalInput}  dataOptions={unstakingchips} tooltip={<Tooltip title="Total number of TARA that’s currently staked but NOT locked, and can be un-staked (withdrawn) from the staking contract. " Icon={InfoIcon} />} />
              {stakedFunds && <BaseCard title="24,000,000" description="Locked till 30 NOV 2022" tooltip={<Tooltip className="staking-icon-tooltip" title="" Icon={LockIcon} />} />}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Staking;
