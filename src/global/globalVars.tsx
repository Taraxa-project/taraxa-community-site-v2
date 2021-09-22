import BountiesSidebar from "../assets/icons/bountiesSidebar";
import DeploySidebar from "../assets/icons/deploySidebar";
import ExplorerSidebar from "../assets/icons/explorerSidebar";
import GetStarted from "../assets/icons/getStarted";
import NodeSidebar from "../assets/icons/nodeSidebar";
import RedeemSidebar from "../assets/icons/redeemSidebar";
import StakingSidebar from "../assets/icons/stakingSidebar";
import SubmitIcon from "../assets/icons/submit";
import WalletSidebar from "../assets/icons/walletSidebar";
import NavLink from "../components/NavLink/NavLink";
import { Text } from "@taraxa_project/taraxa-ui";
import AttachmentIcon from "../assets/icons/attachment";
import "./globalVars.scss";

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
      { Link: <NavLink label="Run a node" Icon={NodeSidebar} to="/node" />, name: "node" },
      { Link: <NavLink label="Taraxa Explorer" Icon={ExplorerSidebar} to={{ pathname: "https://explorer.testnet.taraxa.io/" }} target="_blank" /> },
      { Link: <NavLink label="Deploy DApps" Icon={DeploySidebar} to={{ pathname: "https://sandbox.testnet.taraxa.io/" }} target="_blank" /> },
      // { Link: <NavLink label="Wallet" Icon={WalletSidebar} to="/wallet" />, name: "wallet" }
    ],
  }
];


export const bountiesDescription = <div className="bounties-description-container">
  <SubmitIcon /> <Text className="bounties-description" label="Submit bounty" color="primary" />
</div>

export const fileButtonLabel = <div className="file-button-label">
<AttachmentIcon /> <Text className="file-input" label="Attach the file" color="primary" />
</div>