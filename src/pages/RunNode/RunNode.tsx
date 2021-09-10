import React, { useEffect, useRef, useState } from 'react';
import { menu } from '../../global/globalVars';
import { Button, IconCard, Text, ToggleButton} from 'taraxa-ui';
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


const RunNode = () => {
  const history = useHistory();
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const [toggleValue, setToggleValue] = useState('earn');
  const [sidebarOpened, updateSidebarOpened] = useGlobalState("sidebarOpened");

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
          <Text label="Running Testnet Nodes" variant="h4" color="primary" className="runnode-title"/>
          <Text label="Help accelerate Taraxa’s path towards mainnet by running nodes on the testnet" variant="body2" color="textSecondary" className="runnode-subtitle"/>

          <div className="runnode-red-stripe">
            <Text label="Notice:" variant="body1" color="primary" className="runnode-title"/>
            <Text label="You aren’t running any block-producing nodes" variant="body2" color="primary" className="runnode-subtitle"/>
          </div>
          <div className={isMobile ? "mobileCardContainer" : "cardContainer"}>
            <IconCard title="Register a node" description="Register a node you’ve aleady set up."
            onClickText="Register a node" onClickButton={() => console.log('yes')} Icon={NodeIcon}/>
            <IconCard title="Set up a node" description="Learn how to set up a node on Taraxa’s testnet."
            onClickText="Set up a node" onClickButton={() => console.log("here")} Icon={NodeIcon}/>
            
          </div>

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
