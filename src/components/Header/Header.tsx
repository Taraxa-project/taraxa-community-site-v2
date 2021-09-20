import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Button, Text, InputField, Header as THeader, Modal, Checkbox } from "@taraxa_project/taraxa-ui";
import TaraxaIcon from '../../assets/icons/taraxaIcon';
import EmailIcon from "../../assets/icons/email";
import HamburgerIcon from "../../assets/icons/hamburger";
import './header.scss'
import BubbleIcon from "../../assets/icons/bubbleIcon";
import { store, useGlobalState } from 'state-pool';
import { useMediaQuery } from 'react-responsive';
import GoogleIcon from './../../assets/icons/google';
import { useAuth } from "../../services/useAuth";

store.setState("sidebarOpened", false)
store.setState("modalOpen", false)
store.setState("walletConnected", false)

const Header = ({ match }: RouteComponentProps) => {

  console.log(match)

  const auth = useAuth();
  const isLoggedIn = auth.user?.id;

  const { executeRecaptcha } = useGoogleReCaptcha();

  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [ethWallet, setEthWallet] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [signIn, setSignIn] = useState(true);
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [conditions, setConditions] = useState(false);
  const [walletConnected, setWallet] = useState(false);
  const [forgottenPassword, setForgottenPassword] = useState(false);
  const [forgottenPasswordEmail, setForgottenPasswordEmail] = useState('');
  const [forgottenPasswordSuccess, setForgottenPasswordSuccess] = useState(false);
  const [sidebarOpened, updateSidebarOpened] = useGlobalState("sidebarOpened");
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  useEffect(() => {
    if (match.path.includes('/first-login')) {
      setEmailConfirmed(true);
    }
  }, []);

  const modalTrigger = () => {
    setModalOpen(!modalOpen);
    setSignIn(true);
  }

  const profileTrigger = () => {
    setShowProfile(!showProfile);
  }

  const usernameTrigger = (event: any) => {
    setUsername(event.target.value);
  }

  const emailTrigger = (event: any) => {
    setEmail(event.target.value);
  }

  const passwordTrigger = (event: any) => {
    setPassword(event.target.value);
  }

  const repeatedPasswordTrigger = (event: any) => {
    setRepeatedPassword(event.target.value);
  }

  const ethWalletTrigger = (event: any) => {
    setEthWallet(event.target.value);
  }

  const conditionsTrigger = (event: any) => {
    setConditions(event.target.checked);
  }

  const forgottenPasswordEmailTrigger = (event: any) => {
    setForgottenPasswordEmail(event.target.value);
  }

  const goToProfile = () => {
    history.push('/profile');
  }

  const finalAction = () => {
    setSignUpSuccess(false);
    setModalOpen(false);
  }

  const finalPasswordAction = () => {
    setForgottenPasswordSuccess(false);
  }

  const button = !isLoggedIn ? <Button label="Sign in / Sign up" color="primary" variant="text" onClick={modalTrigger} /> : <div><Button label={auth.user?.username} color="primary" variant="outlined" onClick={profileTrigger} /></div>;

  const profileModal = <>
    <Button label="My Profile" color="secondary" variant="contained" id="profileButton" onClick={goToProfile} />
    <Button label="Sign Out" color="primary" variant="outlined" onClick={() => {
      auth.signout!();
      setShowProfile(false);
    }} />
  </>;

  const wallet = isLoggedIn && walletConnected ? <div id="walletContainer"><div className="walletIcon" /><Text label="0x2612b77E5ee1a5feeDdD5eC08731749bC2217F54" variant="caption" color="textSecondary" /></div> : isLoggedIn && !walletConnected ? <div id="noWalletContainer"><Button label="Connect Wallet" variant="text" color="primary" fullWidth /></div> : <></>;
  const modalSignIn =
    <div>
      <Text label="Sign In" variant="h6" color="primary" />
      <InputField label="E-mail" placeholder="Email or username..." value={username} variant="outlined" type="text" fullWidth onChange={usernameTrigger} margin="normal" />
      <InputField type="password" label="Password" placeholder="Password..." value={password} variant="outlined" fullWidth onChange={passwordTrigger} margin="normal" />
      <Text id="forgotPasswordLabel" onClick={() => { setForgottenPassword(true) }} label="Forgot password?" variant="body2" color="textSecondary" />


      <Button label="Login" color="secondary" variant="contained" onClick={async () => {
        const result = await auth.signin!(username, password);
        if (result) {
          setModalOpen(false);
        }
      }} fullWidth className="marginButton" />

      <Button Icon={GoogleIcon} variant="contained" onClick={() => setSignIn(!signIn)} className="marginButton bubbleButton" id="bubbleButtonLeft" />
      <Button Icon={BubbleIcon} variant="contained" onClick={() => setSignIn(!signIn)} className="marginButton bubbleButton" />

      <Text id="noAccountLabel" label="Don't have an account yet?" variant="body2" color="primary" />
      <Button label="Create an account" variant="contained" onClick={() => setSignIn(!signIn)} fullWidth className="marginButton greyButton" />
    </div>

  const modalSignUp =
    <div>
      <Text label="Create an account" variant="h6" color="primary" />
      <InputField type="text" label="Username" placeholder="Create username..." value={username} variant="outlined" fullWidth onChange={usernameTrigger} margin="normal" />
      <InputField type="text" label="E-mail" placeholder="Registration e-mail..." value={email} variant="outlined" fullWidth onChange={emailTrigger} margin="normal" />
      <InputField type="text" label="ETH Wallet" placeholder="Your MetaMask Ethereum Address..." value={ethWallet} variant="outlined" fullWidth onChange={ethWalletTrigger} margin="normal" />
      <InputField type="password" label="Password" placeholder="Password..." value={password} variant="outlined" fullWidth onChange={passwordTrigger} margin="normal" />
      <InputField type="password" label="Repeat password" placeholder="Repeat password..." value={repeatedPassword} variant="outlined" fullWidth onChange={repeatedPasswordTrigger} margin="normal" />

      <div style={{ textAlign: 'left', display: 'flex' }}>
        <Checkbox name="conditions" onChange={conditionsTrigger} checked={conditions} />
        <Text label="I agree to Terms &amp; Conditions and Privacy Policy" variant="body2" color="primary" />
      </div>

      <Button label="Create an account" color="secondary" disableElevation variant="contained" onClick={async () => {
        const token = await executeRecaptcha!("signup");
        const result = auth.signup!(username, email, ethWallet, password, token);

        if (result) {
          setSignUpSuccess(true);
        }
      }} fullWidth className="marginButton" />

      <Text label="or sign up with" variant="body2" color="primary" />

      <Button Icon={BubbleIcon} variant="contained" onClick={() => setSignIn(!signIn)} className="marginButton bubbleButton" id="bubbleButtonLeft" />
      <Button Icon={BubbleIcon} variant="contained" onClick={() => setSignIn(!signIn)} className="marginButton bubbleButton" />
    </div>

  const modalSignUpSuccess =
    <div>
      <Text label="Create an account" variant="h6" color="primary" className="signUpSuccessfullTitle" />
      <EmailIcon />
      <Text label="Thank you" variant="body1" color="primary" style={{ marginTop: '10%' }} />
      <Text label="Please confirm your e-mail" variant="body1" color="primary" style={{ marginBottom: '10%' }} />

      <Text label="We have sent you a confirmation link, please confirm your e-mail to complete registration." variant="body2" color="textSecondary" style={{ marginBottom: '5%' }} />
      <Button label="OK" color="secondary" variant="contained" onClick={() => finalAction()} fullWidth className="marginButton" />
    </div>

  const modalEmailConfirmed =
    <div>
      <Text label="Create an account" variant="h6" color="primary" className="signUpSuccessfullTitle" />
      <EmailIcon />
      <Text label="Thanks for validating your email!" variant="body1" color="primary" style={{ marginBottom: '10%' }} />

      <Text label="We have sent you a confirmation link, please confirm your e-mail to complete registration." variant="body2" color="textSecondary" style={{ marginBottom: '5%' }} />
      <Button label="OK" color="secondary" variant="contained" onClick={() => finalAction()} fullWidth className="marginButton" />
    </div>

  const forgottenPasswordModal =
    <div>
      <Text label="Forgot Password" variant="h6" color="primary" />
      <Text label="Please, enter your registration e-mail." variant="body2" color="textSecondary" />
      <InputField label="E-mail" placeholder="Your email..." value={username} variant="outlined" type="text" fullWidth onChange={forgottenPasswordEmailTrigger} margin="normal" />

      <Button label="Reset Password" color="secondary" variant="contained" onClick={() => {
        setForgottenPassword(false);
        setForgottenPasswordSuccess(true);
      }} fullWidth className="marginButton" />
    </div>

  const modalForgottenPasswordSuccess =
    <div>
      <Text label="Forgot password" variant="h6" color="primary" className="signUpSuccessfullTitle" />
      <EmailIcon />
      <Text label="We have sent your new password to your registration e-mail." variant="body1" color="primary" style={{ marginBottom: '10%' }} />

      <Text label="Please log in with your new password." variant="body2" color="textSecondary" style={{ marginBottom: '5%' }} />
      <Button label="OK" color="secondary" variant="contained" onClick={() => finalPasswordAction()} fullWidth className="marginButton" />
    </div>

  const hamburger = <div style={{ cursor: 'pointer' }} onClick={() => updateSidebarOpened(true)}><HamburgerIcon /></div>

  let modalContent = modalSignUp;

  if (forgottenPassword) {
    modalContent = forgottenPasswordModal;
  }

  if (forgottenPasswordSuccess) {
    modalContent = modalForgottenPasswordSuccess;
  }

  if (signIn) {
    modalContent = modalSignIn;
  }

  if (signUpSuccess) {
    modalContent = modalSignUpSuccess;
  }

  if (emailConfirmed) {
    modalContent = modalEmailConfirmed;
  }

  return (
    <>
      <Modal id="signinModal" title="Test" show={modalOpen} children={modalContent} parentElementID="root" onRequestClose={modalTrigger} />
      <THeader color="primary" position="relative" Icon={TaraxaIcon} elevation={0} button={isMobile ? <></> : button} wallet={isMobile ? <></> : wallet} profileModal={profileModal} showProfileModal={showProfile} hamburger={hamburger} />
    </>
  )
}

export default withRouter(Header);
