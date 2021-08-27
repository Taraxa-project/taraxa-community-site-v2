import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { menu } from '../../global/globalVars';
import { Sidebar, IconCard, Text } from 'taraxa-ui';
import TaraxaIcon from '../../assets/icons/taraxaIcon';
import StakingIcon from '../../assets/icons/staking';
import BountiesIcon from '../../assets/icons/bounties';
import RedeemIcon from '../../assets/icons/redeem';
import NodeIcon from '../../assets/icons/node';
import ExplorerIcon from '../../assets/icons/explorer';
import DeployIcon from '../../assets/icons/deploy';
import { useHistory } from "react-router-dom";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './home.scss';


const Home = () => {
  const history = useHistory();
  
  return (
    <>
      <Header />
      <div className="home">
        <Sidebar disablePadding={true} dense={true} items={menu} className="home-sidebar" />
        <div className="home-content">
          <Text label="Get started" variant="h4" color="primary" className="home-title"/>
          <Text label="Welcome to Taraxa's community site!" variant="body2" color="textSecondary" className="home-subtitle"/>
          <div className="home-green-stripe">
            <Text label="EARN" variant="body1" color="primary" className="home-title"/>
            <Text label="Earn rewards while helping us grow." variant="body2" color="primary" className="home-subtitle"/>
          </div>
          <div className="cardContainer">
            <IconCard title="Staking" description="Earn rewards while helping to secure Taraxa’s network."
            onClickText="Get Started" onClick={() => history.push('/staking')} Icon={StakingIcon}/>
            <IconCard title="Bounties" description="Earn rewards while learning about Taraxa and grow it’s ecosystem."
            onClickText="Get Started" onClick={() => console.log("here")} Icon={BountiesIcon}/>
            <IconCard title="Redeem" description="Redeem TARA points for $TARA tokens and cool Taraxa swag."
            onClickText="Get Started" onClick={() => console.log("here")} Icon={RedeemIcon}/>
          </div>

          <div className="home-green-stripe">
            <Text label="TESTNET" variant="body1" color="primary" className="home-title"/>
            <Text label="Join Taraxa’s public testnet." variant="body2" color="primary" className="home-subtitle"/>
          </div>
          <div className="cardContainer">
            <IconCard title="Run a node" description="Earn rewards while helping to secure Taraxa’s network."
            onClickText="Get Started" onClick={() => console.log("here")} Icon={NodeIcon}/>
            <IconCard title="Taraxa explorer" description="Explore the ledger and find the transaction’s data."
            onClickText="Get Started" onClick={() => console.log("here")} Icon={ExplorerIcon}/>
            <IconCard title="Deploy DApps" description="Earn rewards while learning about Taraxa and grow it’s ecosystem."
            onClickText="Get Started" onClick={() => console.log("here")} Icon={DeployIcon}/>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home;
