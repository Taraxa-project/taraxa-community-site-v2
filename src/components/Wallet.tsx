import { useMetaMask } from "metamask-react";
import { useMediaQuery } from 'react-responsive';
import { Button, Text } from "@taraxa_project/taraxa-ui";

const Wallet = () => {
  const { status, account, connect } = useMetaMask();
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  if (status === "notConnected") {
    if (isMobile) {
      return null;
    }
    return (
      <Button id="noWalletContainer" label="Connect Wallet" variant="outlined" color="primary" onClick={connect} />
    );
  }

  if (status === "unavailable") {
    return (
      <div id="walletContainer">
        <Text label="Metamask not available" variant="caption" color="textSecondary" />
      </div>
    );
  }

  if (status === "connecting") {
    return (
      <div id="walletContainer">
        <Text label="Connecting..." variant="caption" color="textSecondary" />
      </div>
    );
  }

  return (
    <>
      <div id="walletContainer">
        <div className="walletIcon" />
        <Text label={account!} variant="caption" color="textSecondary" />
      </div>
    </>
  )
}

export default Wallet;
