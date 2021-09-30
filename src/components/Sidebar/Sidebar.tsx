import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { store, useGlobalState } from 'state-pool';
import { Button, Sidebar as MSidebar } from "@taraxa_project/taraxa-ui";

import Wallet from "./../Wallet";

import { menu } from '../../global/globalVars';
import { useAuth } from "../../services/useAuth";
import { useModal } from "../../services/useModal";

import './sidebar.scss'

store.setState("sidebarOpened", false)
store.setState("isLogged", false)
store.setState("walletConnected", false)

const Sidebar = () => {
  const auth = useAuth();
  const { signIn } = useModal();

  const isLoggedIn = auth.user?.id;
  const history = useHistory();
  const [sidebarOpened, updateSidebarOpened] = useGlobalState("sidebarOpened");

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          updateSidebarOpened(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

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
    <div ref={wrapperRef}><MSidebar disablePadding={true} dense={true} items={menu} open={sidebarOpened} mobileActions={mobileButtons} onClose={updateSidebarOpened} /></div>
  );
}

export default Sidebar;