import BountiesSidebar from "../assets/icons/bountiesSidebar";
import DeploySidebar from "../assets/icons/deploySidebar";
import ExplorerSidebar from "../assets/icons/explorerSidebar";
import GetStarted from "../assets/icons/getStarted";
import NodeSidebar from "../assets/icons/nodeSidebar";
import RedeemSidebar from "../assets/icons/redeemSidebar";
import StakingSidebar from "../assets/icons/stakingSidebar";
import WalletSidebar from "../assets/icons/walletSidebar";
import NavLink from "../components/NavLink/NavLink";

export const menu = [
  { Link: <NavLink label="Get Started" Icon={GetStarted} to="/" />, name:"dashboard"},
  {
    label: 'Earn',
    items: [
      { Link: <NavLink label="Staking" Icon={StakingSidebar} to="/staking" />, name:"staking"},
      { Link: <NavLink label="Bounties" Icon={BountiesSidebar} to="/bounties" />, name:"bounties" },
      { Link: <NavLink label="Redeem" Icon={RedeemSidebar} to="/redeem" />, name:"redeem" },
    ],
  },
  {
    name: 'testnet',
    label: 'Testnet',
    items: [
      { Link: <NavLink label="Run a node" Icon={NodeSidebar} to="/node" /> },
      { Link: <NavLink label="Taraxa Explorer" Icon={ExplorerSidebar} to="/explorer" /> },
      { Link: <NavLink label="Deploy DApps" Icon={DeploySidebar} to="/deploy" /> },
      { Link: <NavLink label="Wallet" Icon={WalletSidebar} to="/wallet" /> }
    ],
  }
];