import React from 'react';
import { Link } from 'react-router-dom';
import { menu } from '../../global/globalVars';
import { Sidebar, Card, Text, Header, Footer } from 'taraxa-ui';
import TaraxaIcon from '../../assets/icons/taraxaIcon';
import StakingIcon from '../../assets/icons/staking';
import BountiesIcon from '../../assets/icons/bounties';
import RedeemIcon from '../../assets/icons/redeem';
import NodeIcon from '../../assets/icons/node';
import ExplorerIcon from '../../assets/icons/explorer';
import DeployIcon from '../../assets/icons/deploy';
import './home.scss';

const Home = () => {
  return (
    <>
      <Header color="primary" position="static" Icon={TaraxaIcon} elevation={0} />
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
            <Card title="Staking" description="Earn rewards while helping to secure Taraxa’s network."
            onClickText="Get Started" onClick={() => console.log("here")} Icon={StakingIcon}/>
            <Card title="Bounties" description="Earn rewards while learning about Taraxa and grow it’s ecosystem."
            onClickText="Get Started" onClick={() => console.log("here")} Icon={BountiesIcon}/>
            <Card title="Redeem" description="Redeem TARA points for $TARA tokens and cool Taraxa swag."
            onClickText="Get Started" onClick={() => console.log("here")} Icon={RedeemIcon}/>
          </div>

          <div className="home-green-stripe">
            <Text label="TESTNET" variant="body1" color="primary" className="home-title"/>
            <Text label="Join Taraxa’s public testnet." variant="body2" color="primary" className="home-subtitle"/>
          </div>
          <div className="cardContainer">
            <Card title="Run a node" description="Earn rewards while helping to secure Taraxa’s network."
            onClickText="Get Started" onClick={() => console.log("here")} Icon={NodeIcon}/>
            <Card title="Taraxa explorer" description="Explore the ledger and find the transaction’s data."
            onClickText="Get Started" onClick={() => console.log("here")} Icon={ExplorerIcon}/>
            <Card title="Deploy DApps" description="Earn rewards while learning about Taraxa and grow it’s ecosystem."
            onClickText="Get Started" onClick={() => console.log("here")} Icon={DeployIcon}/>
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

export default Home;
