import React, { useState } from 'react';
import './redeem.scss';
import { menu } from '../../global/globalVars';
import {  BaseCard, Text, DataCard, InputField, Chip, Snackbar } from 'taraxa-ui';
import TaraxaIcon from '../../assets/icons/taraxaIcon';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useMediaQuery } from 'react-responsive';
import Sidebar from '../../components/Sidebar/Sidebar';

function Redeem() {
  const [availableToclaim, setAvailableToclaim] = useState(0);
  const [totalToclaim, setTotalToclaim] = useState(0);
  const [claim, setClaim] = useState('');
  const [open, setOpen] = useState(true);
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  const availableTrigger = (event: any) => {
    setAvailableToclaim(event.target.value);
  }
  const totalTrigger = (event: any) => {
    setTotalToclaim(event.target.value);
  }
  const claimTrigger = (claim: string) => {
    setClaim(claim);
  }
  const onClose = () => {
    setOpen(false);
  }
  const availableInput = <InputField type="number" min={1} max={100000} className="whiteInput" label="" color="secondary" placeholder="Enter amount..." value={availableToclaim} variant="outlined" fullWidth onChange={availableTrigger} margin="normal" />

  const claimchips = <>
    <Chip label="25%" onClick={() => claimTrigger('25%')} variant="default" clickable className={ claim === '25%' ? "chipSelected" : "chip"}/>
    <Chip label="50%" onClick={() => claimTrigger('50%')} className={claim === '50%' ? "chipSelected" : "chip"}  variant="default" clickable/>
    <Chip label="75%" onClick={() => claimTrigger('75%')} variant="default" clickable className={claim === '75%' ? "chipSelected" : "chip"}/>
    <Chip label="100%" onClick={() => claimTrigger('100%')} variant="default" clickable className={claim === '100%' ? "chipSelected" : "chip"}/>
  </>

  return (
    <>
      <Header />
      <div className={isMobile ? "claim-mobile" : "claim"}>
        <Snackbar severity="success" message="Insufficient TARA points" open={open} autoHideDuration={50000} onSnackbarClose={onClose}/>
      <Sidebar />
        <div className="claim-content">
          <Text label="Redeem TARA Points" variant="h4" color="primary" className={isMobile ? "mobile-claim-title" : "claim-title"}/>
          <Text label="Earn rewards and help test &amp; secure the Taraxa’s network " variant="body2" color="textSecondary" className={isMobile ? "mobile-claim-subtitle" : "claim-subtitle"}/>
          
          <div className={isMobile ? "MobileCardContainer" : "cardContainer"}>
            <BaseCard title="26,322" description="TARA locked till next month" />
            <BaseCard title="141,234" description="TARA claimed total" />
            <BaseCard title="41,234" description="Current wallet balance" />
          </div>
          <div className="cardContainer">
            <DataCard title="122,234,123" description="Available to claim" label="TARA" onClickButton={() => console.log('tara')} onClickText="Claim" input={availableInput} dataOptions={claimchips}  />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Redeem;
