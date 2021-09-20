import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Button, Text, InputField, Checkbox } from "@taraxa_project/taraxa-ui";
import { useAuth } from "../../../services/useAuth";
import BubbleIcon from "../../../assets/icons/bubbleIcon";
import GoogleIcon from "../../../assets/icons/google";

type SignUp = {
  onSuccess: () => void
}

const SignUp = ({ onSuccess }: SignUp) => {

  const auth = useAuth();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [ethWallet, setEthWallet] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [tc, setTc] = useState(false);

  const [errors, setErrors] = useState<{ key: string, value: string }[]>([]);

  const errIndex = errors.map(error => error.key);
  const errValues = errors.map(error => error.value);

  const findErrorIndex = (field: string) => errIndex.findIndex((err) => err == field);
  const hasError = (field: string) => findErrorIndex(field) !== -1;

  const hasUsernameError = hasError('username');
  const usernameErrorMessage = hasError('username') ? errValues[findErrorIndex('username')] : undefined;
  const hasEmailError = hasError('email');
  const emailErrorMessage = hasError('email') ? errValues[findErrorIndex('email')] : undefined;
  const hasPasswordError = hasError('password');
  const passwordErrorMessage = hasError('password') ? errValues[findErrorIndex('password')] : undefined;
  const hasPasswordConfirmationError = hasError('password-confirmation');
  const passwordConfirmationErrorMessage = hasError('password-confirmation') ? errValues[findErrorIndex('password-confirmation')] : undefined;

  return (

    <div>
      <Text label="Create an account" variant="h6" color="primary" />
      <InputField type="text" error={hasUsernameError} helperText={usernameErrorMessage} label="Username" placeholder="Create username..." value={username} variant="outlined" fullWidth onChange={event => {
        setUsername(event.target.value);
      }} margin="normal" />
      <InputField type="text" error={hasEmailError} helperText={emailErrorMessage} label="E-mail" placeholder="Registration e-mail..." value={email} variant="outlined" fullWidth onChange={event => {
        setEmail(event.target.value);
      }} margin="normal" />
      <InputField type="text" error={false} label="ETH Wallet" placeholder="Your MetaMask Ethereum Address..." value={ethWallet} variant="outlined" fullWidth onChange={event => {
        setEthWallet(event.target.value);
      }} margin="normal" />
      <InputField type="password" error={hasPasswordError} helperText={passwordErrorMessage} label="Password" placeholder="Password..." value={password} variant="outlined" fullWidth onChange={event => {
        setPassword(event.target.value);
      }} margin="normal" />
      <InputField type="password" error={hasPasswordConfirmationError} helperText={passwordConfirmationErrorMessage} label="Repeat password" placeholder="Repeat password..." value={passwordConfirmation} variant="outlined" fullWidth onChange={event => {
        setPasswordConfirmation(event.target.value);
      }} margin="normal" />

      <div style={{ textAlign: 'left', display: 'flex' }}>
        <Checkbox name="conditions" onChange={event => {
          setTc(event.target.checked);
        }} checked={tc} />
        <Text label="I agree to Terms &amp; Conditions and Privacy Policy" variant="body2" color="primary" />
      </div>

      <Button label="Create an account" color="secondary" disableElevation variant="contained" onClick={async () => {
        setErrors([]);
        const errors = [];

        if (password !== passwordConfirmation) {
          errors.push({ key: 'password-confirmation', value: "Passwords do not match." });
        }

        if (username.trim() === '') {
          errors.push({ key: 'username', value: "Username not set." });
        }

        if (errors.length > 0) {
          setErrors(errors);
          return;
        }

        const token = await executeRecaptcha!("signup");
        const result = await auth.signup!(username, email, ethWallet, password, token);

        if (result.success) {
          onSuccess();
          return;
        }

        setErrors(result.response[0].messages.map((message: any) => ({ key: message.id.split('.')[3], value: message.message })));
      }} fullWidth className="marginButton" />

      <Text label="or sign up with" variant="body2" color="primary" />

      <Button Icon={GoogleIcon} variant="contained" onClick={() => false} className="marginButton bubbleButton" id="bubbleButtonLeft" />
      <Button Icon={BubbleIcon} variant="contained" onClick={() => false} className="marginButton bubbleButton" />
    </div>
  )
}

export default SignUp;
