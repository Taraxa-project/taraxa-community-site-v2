import { ethers } from 'ethers';
import { useMetaMask } from 'metamask-react';

function useChain() {
  const { chainId, ethereum } = useMetaMask();
  console.log(ethereum)
  console.log(ethereum)
  const provider = null;
  // const signer = provider.getSigner()
  return { chainId, provider }
}

export default useChain
