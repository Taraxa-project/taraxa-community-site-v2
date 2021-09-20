import React, { useState, useContext, createContext } from "react";

type Context = {
  enabled: boolean,
  enable?: () => Promise<void>,
  disable?: () => Promise<void>
}

const initialState: Context = {
  enabled: true,
};

const BlockchainContext = createContext<Context>(initialState);

export const BlockchainProvider = ({ children }: { children: React.ReactNode }) => {
  const blockchain = useProvideBlockchain();
  return <BlockchainContext.Provider value={blockchain}>{children}</BlockchainContext.Provider>;
}

export const useBlockchain = () => {
  return useContext(BlockchainContext);
};

function useProvideBlockchain() {
  const [enabled, setEnabled] = useState(true);

  const enable = async () => {
    setEnabled(true);
  };

  const disable = async () => {
    setEnabled(false);
  };

  return {
    enabled,
    enable,
    disable,
  };
}
