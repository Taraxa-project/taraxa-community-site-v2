import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Header as THeader } from "@taraxa_project/taraxa-ui";
import TaraxaIcon from '../../assets/icons/taraxaIcon';
import HamburgerIcon from "../../assets/icons/hamburger";
import { useMediaQuery } from 'react-responsive';
import { useAuth } from "../../services/useAuth";
import { useModal } from "../../services/useModal";
import { useSidebar } from "../../services/useSidebar";

import Wallet from "./../Wallet";
import './header.scss'

const Header = () => {

  const history = useHistory();

  const auth = useAuth();
  const { signIn } = useModal();
  const { open } = useSidebar();

  const isLoggedIn = auth.user?.id;

  const [showProfile, setShowProfile] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  const profileTrigger = () => {
    setShowProfile(!showProfile);
  }

  const goToProfile = () => {
    history.push('/profile');
  }

  const button = !isLoggedIn ? <Button label="Sign in / Sign up" color="primary" variant="text" onClick={signIn} /> : <div><Button label={auth.user?.username} color="primary" variant="outlined" onClick={profileTrigger} /></div>;

  const profileModal = <>
    <Button label="My Profile" color="secondary" variant="contained" id="profileButton" onClick={goToProfile} />
    <Button label="Sign Out" color="primary" variant="outlined" onClick={() => {
      auth.signout!();
      setShowProfile(false);
    }} />
  </>;

  const hamburger = <div style={{ cursor: 'pointer' }} onClick={() => open!()}><HamburgerIcon /></div>

  return (
    <THeader
      color="primary"
      position="relative"
      Icon={TaraxaIcon}
      elevation={0}
      button={isMobile ? <></> : button}
      wallet={isMobile ? <></> : <Wallet />}
      profileModal={profileModal}
      showProfileModal={showProfile}
      hamburger={hamburger}
    />
  );
}

export default Header;
