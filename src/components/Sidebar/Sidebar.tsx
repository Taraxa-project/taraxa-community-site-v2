import { useHistory, withRouter, RouteComponentProps } from "react-router-dom";
import { Button, Sidebar as MSidebar } from "@taraxa_project/taraxa-ui";

import BountiesSidebar from "../../assets/icons/bountiesSidebar";
import DeploySidebar from "../../assets/icons/deploySidebar";
import ExplorerSidebar from "../../assets/icons/explorerSidebar";
import GetStarted from "../../assets/icons/getStarted";
import NodeSidebar from "../../assets/icons/nodeSidebar";
import RedeemSidebar from "../../assets/icons/redeemSidebar";
import StakingSidebar from "../../assets/icons/stakingSidebar";
import WalletSidebar from "../../assets/icons/walletSidebar";

import NavLink from "../../components/NavLink/NavLink";
import Wallet from "./../Wallet";

import { useAuth } from "../../services/useAuth";
import { useModal } from "../../services/useModal";
import { useSidebar } from "../../services/useSidebar";

import './sidebar.scss'

const Sidebar = ({}: RouteComponentProps) => {
  const auth = useAuth();
  const { signIn } = useModal();
  const { isOpen, close } = useSidebar();

  const menu = [
    { Link: <NavLink label="Get Started" Icon={GetStarted} to="/" />, name: "dashboard" },
    {
      label: 'Earn',
      items: [
        { Link: <NavLink label="Staking" Icon={StakingSidebar} to="/staking" />, name: "staking" },
        { Link: <NavLink label="Bounties" Icon={BountiesSidebar} to="/bounties" />, name: "bounties" },
        { Link: <NavLink label="Redeem" Icon={RedeemSidebar} to="/redeem" />, name: "redeem" },
      ],
    },
    {
      name: 'testnet',
      label: 'Testnet',
      items: [
        { Link: <NavLink label="Run a node" Icon={NodeSidebar} to="/node" />, name: "node" },
        { Link: <NavLink label="Taraxa Explorer" Icon={ExplorerSidebar} to={{ pathname: "https://explorer.testnet.taraxa.io/" }} target="_blank" /> },
        { Link: <NavLink label="Deploy DApps" Icon={DeploySidebar} to={{ pathname: "https://sandbox.testnet.taraxa.io/" }} target="_blank" /> },
        // { Link: <NavLink label="Wallet" Icon={WalletSidebar} to="/wallet" />, name: "wallet" }
      ],
    }
  ];

  const isLoggedIn = auth.user?.id;
  const history = useHistory();

  const goToProfile = () => {
    history.push('/profile');
  }

  const button = !isLoggedIn ? <Button label="Sign in / Sign up" color="secondary" variant="contained" onClick={signIn} /> : <div><Button label="My Profile" color="secondary" variant="contained" onClick={goToProfile} /></div>;

  const mobileButtons = (
    <div className="mobileButtons">
      {button}
      <Wallet />
    </div>
  );

  return (
    <MSidebar disablePadding={true} dense={true} items={menu} open={isOpen} mobileActions={mobileButtons} onClose={() => close!()} />
  );
}

export default withRouter(Sidebar);
