import { useEffect, useRef, useState } from "react";
import { Button, Text, InputField, Header as THeader, Modal, Checkbox, Sidebar as MSidebar } from "taraxa-ui";
import EmailIcon from "../../assets/icons/email";
import HamburgerIcon from "../../assets/icons/hamburger";
import './sidebar.scss'
import BubbleIcon from "../../assets/icons/bubbleIcon";
import { useHistory } from "react-router-dom";
import {store, useGlobalState} from 'state-pool';
import { useMediaQuery } from 'react-responsive';
import { menu } from '../../global/globalVars';

store.setState("sidebarOpened", false)
store.setState("modalOpen", false)
store.setState("isLogged", false)
store.setState("walletConnected", false)

const Sidebar = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [signIn, setSignIn] = useState(true);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [conditions, setConditions] = useState(false);
  const [isLogged, setLogged] = useState(true);
  const [walletConnected, setWallet] = useState(false);
  const [sidebarOpened, updateSidebarOpened] = useGlobalState("sidebarOpened");
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  
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
  
  const modalTrigger = () => {
    setModalOpen(!modalOpen);
    setSignIn(true);
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

  const conditionsTrigger = (event: any) => {
    setConditions(event.target.checked);
  }

  const goToProfile = () => {
    history.push('/profile');
  }

  const logout = () => {
    setLogged(false);
    setWallet(false);
    setShowProfile(false);
  }

  const createAccount = () => {
    setSignUpSuccess(true);
  }

  const finalAction = () => {
    setSignUpSuccess(false);
    setModalOpen(false);
    setLogged(true);
  }
  
  const button = !isLogged ? <Button label="Sign in / Sign up" color="secondary" variant="contained" onClick={modalTrigger} /> : <div><Button label="My Profile" color="secondary" variant="contained" onClick={goToProfile} /></div>;
  
  const wallet = isLogged && walletConnected ? <div id="mobileWalletContainer"><div className="walletIcon" /><Text label="0x2612b77E5ee1a5feeDdD5eC08731749bC2217F54" variant="caption" color="textSecondary"  /></div> : isLogged && !walletConnected ? <div id="mobileNoWalletContainer"><Button label="Connect Wallet" variant="text" color="primary" fullWidth/></div> : <></>;

  const mobileButtons = <div className="mobileButtons">{button}{wallet}</div>
  
  const modalSignIn = 
    <div>
      <Text label="Sign In" variant="h6" color="primary"  />
      <InputField label="E-mail" placeholder="Email or username..." value={username} variant="outlined" type="text" fullWidth onChange={usernameTrigger} margin="normal" />
      <InputField type="text" label="Password" placeholder="Password..." value={password} variant="outlined" fullWidth onChange={passwordTrigger} margin="normal" />
      <Text id="forgotPasswordLabel" label="Forgot password?" variant="body2" color="textSecondary" />

      
      <Button label="Login" color="secondary" variant="contained" onClick={() => console.log(username)} fullWidth className="marginButton"/>

      <Button Icon={BubbleIcon} variant="contained" onClick={() => setSignIn(!signIn)} className="marginButton bubbleButton" id="bubbleButtonLeft"/>
      <Button Icon={BubbleIcon} variant="contained" onClick={() => setSignIn(!signIn)} className="marginButton bubbleButton" />

      <Text id="noAccountLabel" label="Don't have an account yet?" variant="body2" color="primary" />
      <Button label="Create an account" variant="contained" onClick={() => setSignIn(!signIn)} fullWidth className="marginButton greyButton"/>
    </div>

  const modalSignUp = 
  <div>
    <Text label="Create an account" variant="h6" color="primary"  />
    <InputField  type="text" label="Username" placeholder="Create username..." value={username} variant="outlined" fullWidth onChange={usernameTrigger} margin="normal" />
    <InputField type="text" label="E-mail" placeholder="Registration e-mail..." value={email} variant="outlined" fullWidth onChange={emailTrigger} margin="normal" />
    <InputField type="text" label="Password" placeholder="Password..." value={password} variant="outlined" fullWidth onChange={passwordTrigger} margin="normal" />
    <InputField type="text" label="Repeat password" placeholder="Repeat password..." value={repeatedPassword} variant="outlined" fullWidth onChange={repeatedPasswordTrigger} margin="normal" />

    <div style={{ textAlign: 'left', display: 'flex'}}>
      <Checkbox name="conditions" onChange={conditionsTrigger} checked={conditions} />
      <Text label="I agree to Terms &amp; Conditions and Privacy Policy" variant="body2" color="primary"/>
    </div>

    <Button label="Create an account" color="secondary" disableElevation variant="contained" onClick={() => createAccount()} fullWidth className="marginButton"/>

    <Text label="or sign up with" variant="body2" color="primary"  />

    <Button Icon={BubbleIcon} variant="contained" onClick={() => setSignIn(!signIn)} className="marginButton bubbleButton" id="bubbleButtonLeft"/>
    <Button Icon={BubbleIcon} variant="contained" onClick={() => setSignIn(!signIn)} className="marginButton bubbleButton" />
  </div>

  const modalSignUpSuccess = 
    <div>
      <Text label="Create an account" variant="h6" color="primary" className="signUpSuccessfullTitle" />
      <EmailIcon />
      <Text label="Thank you" variant="body1" color="primary"  style={{marginTop: '10%'}}/>
      <Text label="Please confirm your e-mail" variant="body1" color="primary" style={{marginBottom: '10%'}} />

      <Text label="We have sent you a confirmation link, please confirm your e-mail to complete registration." variant="body2" color="textSecondary" style={{marginBottom: '5%'}}/>
      <Button label="OK" color="secondary" variant="contained" onClick={() => finalAction()} fullWidth className="marginButton"/>
    </div>

    return (
      <>
        <Modal id="signinModal" title="Test" show={modalOpen} children={signIn ? modalSignIn : signUpSuccess ? modalSignUpSuccess : modalSignUp} parentElementID="root" onRequestClose={modalTrigger}/>
        <div ref={wrapperRef}><MSidebar disablePadding={true} dense={true} items={menu} open={sidebarOpened} mobileActions={mobileButtons} onClose={updateSidebarOpened} className="sidebar" /></div>
      </>
    )
}

export default Sidebar;