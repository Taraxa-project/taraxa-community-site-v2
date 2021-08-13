import BountiesSidebar from "../assets/icons/bountiesSidebar";
import DeploySidebar from "../assets/icons/deploySidebar";
import ExplorerSidebar from "../assets/icons/explorerSidebar";
import GetStarted from "../assets/icons/getStarted";
import NodeSidebar from "../assets/icons/nodeSidebar";
import RedeemSidebar from "../assets/icons/redeemSidebar";
import StakingSidebar from "../assets/icons/stakingSidebar";
import WalletSidebar from "../assets/icons/walletSidebar";
import { Link } from "react-router-dom";

export const menu = [
  { label: 'Get Started', Icon: GetStarted, Link: <Link to="/dashboard">Get Started</Link>},
  {
    label: 'Earn',
    items: [
      { label: 'Staking', Icon: StakingSidebar, Link: <Link to="/staking">Staking</Link> },
      { label: 'Bounties', Icon: BountiesSidebar, Link: <Link to="/bounties">Bounties</Link> },
      { label: 'Redeem', Icon: RedeemSidebar, Link: <Link to="/redeem">Redeem</Link> },
    ],
  },
  {
    name: 'testnet',
    label: 'Testnet',
    items: [
      { label: 'Run a Node', Icon: NodeSidebar, Link: <Link to="/node">Run a Node</Link> },
      { label: 'Taraxa Explorer', Icon: ExplorerSidebar, Link: <Link to="/explorer">Taraxa Explorer</Link> },
      { label: 'Deploy DApps', Icon: DeploySidebar, Link: <Link to="/deploy">Deploy DApps</Link> },
      { label: 'Wallet', Icon: WalletSidebar, Link: <Link to="/wallet">Wallet</Link> }
    ],
  }
];