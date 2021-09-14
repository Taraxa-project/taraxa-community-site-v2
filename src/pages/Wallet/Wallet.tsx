import React, { useEffect, useRef, useState } from 'react';
import { menu } from '../../global/globalVars';
import { BaseCard, Button, IconCard, Table, Text, ToggleButton, Tooltip} from 'taraxa-ui';
import StakingIcon from '../../assets/icons/staking';
import BountiesIcon from '../../assets/icons/bounties';
import RedeemIcon from '../../assets/icons/redeem';
import NodeIcon from '../../assets/icons/node';
import ExplorerIcon from '../../assets/icons/explorer';
import DeployIcon from '../../assets/icons/deploy';
import { useHistory } from "react-router-dom";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './wallet.scss';
import { useMediaQuery } from 'react-responsive';
import {store, useGlobalState} from 'state-pool';
import Sidebar from '../../components/Sidebar/Sidebar';
import WalletIcon from '../../assets/icons/wallet';
import InfoIcon from '../../assets/icons/info';

let walletConnected = true;

const Wallet = () => {
  const history = useHistory();
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const [toggleValue, setToggleValue] = useState('earn');
  const [sidebarOpened, updateSidebarOpened] = useGlobalState("sidebarOpened");

  const columns = [
    { path: "wallet",   name: "wallet" },
    { path: "balance", name: "balance" },
    { path: "address",  name: "address" },
  ];

  const rows = [
    {data: [{wallet: 'Test wallet #1', balance: '1,350,241 TARA', address: 'f412430dcf4398sp9fsdv8cno30dn10zs438ccnqkqk43ifd9aure9wv9231'}]}, 
    {data: [{wallet: 'Test wallet #1', balance: '1,350,241 TARA', address: 'f412430dcf4398sp9fsdv8cno30dn10zs438ccnqkqk43ifd9aure9wv9231'}]}, 
    {data: [{wallet: 'Test wallet #1', balance: '1,350,241 TARA', address: 'f412430dcf4398sp9fsdv8cno30dn10zs438ccnqkqk43ifd9aure9wv9231'}]}, 
    {data: [{wallet: 'Test wallet #1', balance: '1,350,241 TARA', address: 'f412430dcf4398sp9fsdv8cno30dn10zs438ccnqkqk43ifd9aure9wv9231'}]}, 
    {data: [{wallet: 'Test wallet #1', balance: '1,350,241 TARA', address: 'f412430dcf4398sp9fsdv8cno30dn10zs438ccnqkqk43ifd9aure9wv9231'}]}, 
    {data: [{wallet: 'Test wallet #1', balance: '1,350,241 TARA', address: 'f412430dcf4398sp9fsdv8cno30dn10zs438ccnqkqk43ifd9aure9wv9231'}]}];

  const onChangeToggle = (event: object, value: any) => {
    setToggleValue(value);
  }

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                updateSidebarOpened(false);
            }
        }
  
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);


  return (
    <>
      <Header />
      <div className={isMobile ? "wallet-mobile" : "wallet"}>
      <Sidebar  />
        <div className="wallet-content">
          <Text label="Testnet Wallet" variant="h4" color="primary" className="wallet-title"/>
          <Text label="Wallet for the testnet, DO NOT send on-ETH assets to these addresses." variant="body2" color="textSecondary" className="wallet-subtitle"/>

          <div className={isMobile ? "mobileCardContainer" : "cardContainer"}>
            {walletConnected ? 
              <>
                <IconCard className="walletCard" title="1,350,421" description="TARA total"
                onClickText="Send" onClickButton={() => console.log('yes')} tooltip={<Tooltip className="staking-icon-tooltip" title="Test test" Icon={InfoIcon} />}/>
                <IconCard className="walletCard" title="23" description="Accounts (addresses)"
                onClickText="Receive" onClickButton={() => console.log('yes')} tooltip={<Tooltip className="staking-icon-tooltip" title="Test test" Icon={InfoIcon} />}/>
                <IconCard className="walletCard" title="12" description="Transactions"
                onClickText="Add new account" onClickButton={() => console.log('yes')} tooltip={<Tooltip className="staking-icon-tooltip" title="Test test" Icon={InfoIcon} />}/>
              </>
              : 
              <>
                <IconCard title="Connect" description="Connect to Taraxa Wallet (beta)"
                onClickText="Connect to Taraxa wallet" onClickButton={() => console.log('yes')} Icon={WalletIcon}/>
                <IconCard title="Install the wallet" description="Install the wallet to manage your TARA"
                onClickText="Install the wallet" onClickButton={() => console.log("here")} Icon={WalletIcon}/>
              </>
            }
          </div>

          {walletConnected &&
            <div className={isMobile ? "mobileReferenceContainer" : "referenceContainer"}>
              <Text id={isMobile ? "mobileReferenceText" : "referenceText"} label="Accounts" variant="h6" color="primary"/>

              <Table columns={columns} rows={rows}/>
            </div>
          } 
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Wallet;
