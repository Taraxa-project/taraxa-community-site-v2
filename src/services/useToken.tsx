import { ethers } from 'ethers';
import { useMetaMask } from 'metamask-react';

function useToken() {
  const { ethereum } = useMetaMask();
  const abi = ['function balanceOf(address) view returns (uint)'];

  const getInstance = () => {
    const instance = new ethers.Contract(
      process.env.REACT_APP_TARA_ADDRESS!,
      abi,
      new ethers.providers.Web3Provider(ethereum)
    )
    return instance
  }

  return getInstance;
}

export default useToken
