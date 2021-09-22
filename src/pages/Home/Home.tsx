import { useEffect, useRef, useState } from 'react';
import { IconCard, Text, ToggleButton } from '@taraxa_project/taraxa-ui';
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
import { useMediaQuery } from 'react-responsive';
import { useGlobalState } from 'state-pool';
import Sidebar from '../../components/Sidebar/Sidebar';


const Home = () => {
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
      <div className={isMobile ? "home-mobile" : "home"}>
        <Sidebar />
        <div className="home-content">
          <Text label="Get started" variant="h4" color="primary" className="home-title" />
          <Text label="Welcome to Taraxa's community site!" variant="body2" color="textSecondary" className="home-subtitle" />
          {isMobile &&
            <ToggleButton exclusive onChange={onChangeToggle} currentValue={toggleValue} data={[{ value: 'earn', label: 'Earn' }, { value: 'testnet', label: 'Testnet' }]} className="toggleButton" />
          }
          <div className={isMobile ? "home-green-stripe-mobile" : "home-green-stripe"} style={{ display: isMobile && toggleValue !== "earn" ? 'none' : 'inherit' }}>
            <Text label="EARN" variant="body1" color="primary" className="home-title" />
            <Text label="Earn rewards while helping us grow." variant="body2" color="primary" className="home-subtitle" />
          </div>
          <div className="cardContainer" style={{ display: isMobile && toggleValue !== "earn" ? 'none' : isMobile ? 'inherit' : 'flex' }}>
            <IconCard title="Staking" description="Earn rewards while helping to secure Taraxa’s network."
              onClickText="Get Started" onClickButton={() => history.push('/staking')} Icon={StakingIcon} />
            <IconCard title="Bounties" description="Earn rewards while learning about Taraxa and grow it’s ecosystem."
              onClickText="Get Started" onClickButton={() => history.push('/bounties')} Icon={BountiesIcon} />
            <IconCard title="Redeem" description="Redeem TARA points for $TARA tokens and cool Taraxa swag."
              onClickText="Get Started" onClickButton={() => history.push('/redeem')} Icon={RedeemIcon} />
          </div>

          <div className={isMobile ? "home-green-stripe-mobile" : "home-green-stripe"} style={{ display: isMobile && toggleValue !== "testnet" ? 'none' : 'inherit' }}>
            <Text label="TESTNET" variant="body1" color="primary" className="home-title" />
            <Text label="Join Taraxa’s public testnet." variant="body2" color="primary" className="home-subtitle" />
          </div>
          <div className="cardContainer" style={{ display: isMobile && toggleValue !== "testnet" ? 'none' : isMobile ? 'inherit' : 'flex' }}>
            <IconCard title="Run a node" description="Earn rewards while helping to secure Taraxa’s network."
              onClickText="Get Started" onClickButton={() => history.push('/node')} Icon={NodeIcon} />
            <IconCard title="Taraxa explorer" description="Explore the ledger and find the transaction’s data."
              onClickText="Get Started" onClickButton={() => window.open('https://explorer.testnet.taraxa.io/', '_blank')} Icon={ExplorerIcon} />
            <IconCard title="Deploy DApps" description="Earn rewards while learning about Taraxa and grow it’s ecosystem."
              onClickText="Get Started" onClickButton={() => window.open('https://sandbox.testnet.taraxa.io/', '_blank')} Icon={DeployIcon} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home;
