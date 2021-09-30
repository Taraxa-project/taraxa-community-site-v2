import React, { useState, useContext, createContext } from "react";
import { useHistory } from "react-router-dom";

type Context = {
  isOpen: boolean,
  setIsOpen?: (isOpen: boolean) => void,
  content: string,
  setContent?: (content: string) => void,
  signIn?: () => void,
  reset?: () => void,
  code: string | undefined,
  setCode?: (code: string | undefined) => void,
}

const initialState: Context = {
  isOpen: false,
  content: "sign-in",
  code: undefined,
};

const ModalContext = createContext<Context>(initialState);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const modal = useProvideModal();
  return <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>;
}

export const useModal = () => {
  return useContext(ModalContext);
};

function useProvideModal() {
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('sign-in');
  const [code, setCode] = useState<undefined | string>();

  const signIn = () => {
    setContent('sign-in');
    setIsOpen(true);
  }

  const reset = () => {
    setContent('sign-in');
    setIsOpen(false);
    setCode(undefined);
    history.push('/');
  }

  return {
    isOpen,
    setIsOpen,
    content,
    setContent,
    code,
    setCode,
    signIn,
    reset,
  };
}
