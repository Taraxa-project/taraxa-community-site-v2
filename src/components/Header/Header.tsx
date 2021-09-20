import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Button, Text, Header as THeader, Modal } from "@taraxa_project/taraxa-ui";
import TaraxaIcon from '../../assets/icons/taraxaIcon';
import HamburgerIcon from "../../assets/icons/hamburger";
import './header.scss'
import { store, useGlobalState } from 'state-pool';
import { useMediaQuery } from 'react-responsive';
import { useAuth } from "../../services/useAuth";
import SignIn from "./Modal/SignIn";
import SignUp from "./Modal/SignUp";
import SignUpSuccess from "./Modal/SignUpSuccess";
import ForgotPassword from "./Modal/ForgotPassword";
import ForgotPasswordSuccess from "./Modal/ForgotPasswordSuccess";
import EmailConfirmed from "./Modal/EmailConfirmed";

store.setState("sidebarOpened", false)
store.setState("modalOpen", false)
store.setState("walletConnected", false)

const Header = ({ match }: RouteComponentProps) => {

  const auth = useAuth();
  const isLoggedIn = auth.user?.id;

  const history = useHistory();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('sign-in');

  const modalToggle = () => {
    setModalContent('sign-in');
    setModalOpen(!modalOpen);
  }

  const modalReset = () => {
    setModalContent('sign-in');
    setModalOpen(false);
    history.push('/');
  }

  const [showProfile, setShowProfile] = useState(false);
  const [walletConnected, setWallet] = useState(false);
  const [sidebarOpened, updateSidebarOpened] = useGlobalState("sidebarOpened");
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  useEffect(() => {
    if (match.path.includes('/first-login')) {
      setModalOpen(true);
      setModalContent('email-confirmed');
    }
  }, []);

  const profileTrigger = () => {
    setShowProfile(!showProfile);
  }

  const goToProfile = () => {
    history.push('/profile');
  }

  const button = !isLoggedIn ? <Button label="Sign in / Sign up" color="primary" variant="text" onClick={modalToggle} /> : <div><Button label={auth.user?.username} color="primary" variant="outlined" onClick={profileTrigger} /></div>;

  const profileModal = <>
    <Button label="My Profile" color="secondary" variant="contained" id="profileButton" onClick={goToProfile} />
    <Button label="Sign Out" color="primary" variant="outlined" onClick={() => {
      auth.signout!();
      setShowProfile(false);
    }} />
  </>;

  const wallet = walletConnected ? <div id="walletContainer"><div className="walletIcon" /><Text label="0x2612b77E5ee1a5feeDdD5eC08731749bC2217F54" variant="caption" color="textSecondary" /></div> : !walletConnected ? <div id="noWalletContainer"><Button label="Connect Wallet" variant="text" color="primary" fullWidth /></div> : <></>;
  const hamburger = <div style={{ cursor: 'pointer' }} onClick={() => updateSidebarOpened(true)}><HamburgerIcon /></div>

  let modalElement = <SignIn onSuccess={() => {
    setModalOpen(false);
  }} onForgotPassword={() => {
    setModalContent('forgot-password');
  }} onCreateAccount={() => {
    setModalContent('sign-up');
  }} />;

  if (modalContent === 'email-confirmed') {
    modalElement = <EmailConfirmed onSuccess={() => {
      modalReset();
    }} />;
  }

  if (modalContent === 'sign-up') {
    modalElement = <SignUp onSuccess={() => {
      setModalContent('sign-up-success');
    }} />;
  }

  if (modalContent === 'sign-up-success') {
    modalElement = <SignUpSuccess onSuccess={() => {
      modalReset();
    }} />;
  }

  if (modalContent === 'forgot-password') {
    modalElement = <ForgotPassword onSuccess={() => {
      setModalContent('forgot-password-success');
    }} />;
  }

  if (modalContent === 'forgot-password-success') {
    modalElement = <ForgotPasswordSuccess onSuccess={() => {
      modalReset();
    }} />;
  }

  return (
    <>
      <Modal id="signinModal" title="Test" show={modalOpen} children={modalElement} parentElementID="root" onRequestClose={modalToggle} />
      <THeader color="primary" position="relative" Icon={TaraxaIcon} elevation={0} button={isMobile ? <></> : button} wallet={isMobile ? <></> : wallet} profileModal={profileModal} showProfileModal={showProfile} hamburger={hamburger} />
    </>
  )
}

export default withRouter(Header);
