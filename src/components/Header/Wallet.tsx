import { useMetaMask } from "metamask-react";
import { Button, Text } from "@taraxa_project/taraxa-ui";
import { useBlockchain } from "../../services/useBlockchain";

const Wallet = () => {
  const blockchain = useBlockchain();
  const { status, account, connect } = useMetaMask();

  if (!blockchain.enabled) {
    return null;
  }

  if (status === "unavailable") {
    return (
      <div id="walletContainer">
        <Text label="Metamask not available" variant="caption" color="textSecondary" />
      </div>
    );
  }

  if (status === "notConnected") {
    return (
      <div id="noWalletContainer">
        <Button label="Connect Wallet" variant="text" color="primary" fullWidth onClick={connect} />
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
