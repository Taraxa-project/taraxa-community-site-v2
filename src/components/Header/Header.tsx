import { useState } from "react";
import { Button, Text, InputField, Header as THeader, Modal, Checkbox } from "taraxa-ui";
import TaraxaIcon from '../../assets/icons/taraxaIcon';
import './header.scss'
import BubbleIcon from "../../assets/icons/bubbleIcon";

const Header = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [signIn, setSignIn] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [conditions, setConditions] = useState(false);
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
  
  const button = <Button label="Sign in / Sign up" color="primary" variant="text" onClick={modalTrigger} />
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

    <Button label="Create an account" color="secondary" disableElevation variant="contained" onClick={() => console.log(username)} fullWidth className="marginButton"/>

    <Text label="or sign up with" variant="body2" color="primary"  />

    <Button Icon={BubbleIcon} variant="contained" onClick={() => setSignIn(!signIn)} className="marginButton bubbleButton" id="bubbleButtonLeft"/>
    <Button Icon={BubbleIcon} variant="contained" onClick={() => setSignIn(!signIn)} className="marginButton bubbleButton" />
  </div>

    return (
      <>
        <Modal id="signinModal" title="Test" show={modalOpen} children={signIn ? modalSignIn : modalSignUp} parentElementID="root" onRequestClose={modalTrigger}/>
        <THeader color="primary" position="static" Icon={TaraxaIcon} elevation={0} button={button} />
      </>
    )
}

export default Header;