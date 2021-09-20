import React, { useEffect, useRef, useState } from 'react';
import { menu } from '../../global/globalVars';
import { BaseCard, Button, IconCard, Table, Text, ToggleButton, Tooltip} from '@taraxa_project/taraxa-ui';
import StakingIcon from '../../assets/icons/staking';
import BountiesIcon from '../../assets/icons/bounties';
import RedeemIcon from '../../assets/icons/redeem';
import NodeIcon from '../../assets/icons/node';
import ExplorerIcon from '../../assets/icons/explorer';
import DeployIcon from '../../assets/icons/deploy';
import { useHistory } from "react-router-dom";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './runnode.scss';
import { useMediaQuery } from 'react-responsive';
import {store, useGlobalState} from 'state-pool';
import Sidebar from '../../components/Sidebar/Sidebar';
import InfoIcon from '../../assets/icons/info';

let activeNodes = true;

const RunNode = () => {
  const history = useHistory();
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const [toggleValue, setToggleValue] = useState('earn');
  const [sidebarOpened, updateSidebarOpened] = useGlobalState("sidebarOpened");

  const columns = [
    { path: "node",   name: "node" },
    { path: "senderWallet", name: "senderWallet" },
    { path: "receiverWallet",  name: "receiverWallet" },
  ];

  const rows = [
    {data: [{node: 'Bob’s node #1', senderWallet: '0xe08c0 ... 29b34', receiverWallet: '0xe08c0 ... 29b34'}]}, 
    {data: [{node: 'Bob’s node #1', senderWallet: '0xe08c0 ... 29b34', receiverWallet: '0xe08c0 ... 29b34'}]}, 
    {data: [{node: 'Bob’s node #1', senderWallet: '0xe08c0 ... 29b34', receiverWallet: '0xe08c0 ... 29b34'}]}, 
    {data: [{node: 'Bob’s node #1', senderWallet: '0xe08c0 ... 29b34', receiverWallet: '0xe08c0 ... 29b34'}]}, 
    {data: [{node: 'Bob’s node #1', senderWallet: '0xe08c0 ... 29b34', receiverWallet: '0xe08c0 ... 29b34'}]}, 
    {data: [{node: 'Bob’s node #1', senderWallet: '0xe08c0 ... 29b34', receiverWallet: '0xe08c0 ... 29b34'}]}];

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
      <div className={isMobile ? "runnode-mobile" : "runnode"}>
      <Sidebar  />
        <div className="runnode-content">
          <div className="runnode-icon-container">
              <Text label="Running Testnet Nodes" variant="h4" color="primary" className="runnode-title"/>
              <Tooltip className="runnode-icon-tooltip" title="Test" Icon={InfoIcon} />
            </div>
          
          <Text label="Help accelerate Taraxa’s path towards mainnet by running nodes on the testnet" variant="body2" color="textSecondary" className={isMobile ? "mobile-runnode-subtitle" : "runnode-subtitle"}/>

          {!activeNodes && 
            <div className={isMobile ? "mobile-runnode-red-stripe" : "runnode-red-stripe"}>
              <Text label="Notice:" variant="body1" color="primary" className="runnode-title"/>
              <Text label="You aren’t running any block-producing nodes" variant="body2" color="primary" className="runnode-subtitle"/>
            </div>
          }
          <div className={isMobile ?  "mobileCardContainer" : "cardContainer"}>
            {activeNodes ? 
              <>
                <BaseCard title="11" description="Active nodes" id="mobileBasicCard" />
                <BaseCard title="3,238" description="Blocks produced" id="mobileBasicCard" />
                <BaseCard title="#16" description="Weekly rating" id="mobileBasicCard" />
              </>
              : 
              <>
                <IconCard title="Register a node" description="Register a node you’ve aleady set up."
                onClickText="Register a node" onClickButton={() => console.log('yes')} Icon={NodeIcon} tooltip={<Tooltip className="runnode-icon-tooltip" title="A registered node (which has already been setup) will automatically be delegated enough testnet tokens to participate in consensus." Icon={InfoIcon} />}/>
                <IconCard title="Set up a node" description="Learn how to set up a node on Taraxa’s testnet."
                onClickText="Set up a node" onClickButton={() => console.log("here")} Icon={NodeIcon}/>
              </>
            }
          </div>

          {activeNodes &&
            <div className={isMobile ? "mobileReferenceContainer" : "referenceContainer"}>
              <Text id={isMobile ? "mobileReferenceText" : "referenceText"} label="Active Nodes" variant="h6" color="primary"/>

              <Table columns={columns} rows={rows}/>
            </div>
          }

          <div className={isMobile ? "mobileReferenceContainer" : "referenceContainer"}>
              <Text id={isMobile ? "mobileReferenceText" : "referenceText"} label="References" variant="h6" color="primary"/>
              {isMobile ? 
                <div className="mobileReferencesButtonContainer">
                  <Button label="How to setup a node" className="referenceButton" variant="contained" onClick={() => console.log('go to')} />
                  <Button label="How to find my node" variant="contained" className="referenceButton" onClick={() => console.log('go to')} />
                  <Button label="How to receive delegation" className="referenceButton" variant="contained" onClick={() => console.log('go to')} />
                  <Button label="What rewards are there" className="referenceButton" variant="contained" onClick={() => console.log('go to')} />
                </div>
                :
                <>
                  <div className="referencesButtonContainer">
                    <Button label="How to setup a node" className="referenceButton" variant="contained" onClick={() => console.log('go to')} />
                    <Button label="How to find my node" variant="contained" className="referenceButton" onClick={() => console.log('go to')} />
                  </div>
                  <div className="bottomReferencesButtonContainer">
                    <Button label="How to receive delegation" className="referenceButton" variant="contained" onClick={() => console.log('go to')} />
                    <Button label="What rewards are there" className="referenceButton" variant="contained" onClick={() => console.log('go to')} />
                  </div>
                </>
              }
              
          </div>

        </div>
      </div>
      <Footer />
    </>
  )
}

export default RunNode;
