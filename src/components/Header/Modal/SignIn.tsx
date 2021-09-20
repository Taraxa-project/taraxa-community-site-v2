import { useState } from "react";
import { Button, Text, InputField } from "@taraxa_project/taraxa-ui";
import { useAuth } from "../../../services/useAuth";
import BubbleIcon from "../../../assets/icons/bubbleIcon";
import GoogleIcon from "../../../assets/icons/google";

type SignIn = {
  onSuccess: () => void,
  onForgotPassword: () => void,
  onCreateAccount: () => void
}

const SignIn = ({ onSuccess, onForgotPassword, onCreateAccount }: SignIn) => {

  const auth = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  return (
    <div>
      <Text label="Sign In" variant="h6" color="primary" />
      <InputField label="E-mail" error={hasError} helperText={error} placeholder="Email or username..." value={username} variant="outlined" type="text" fullWidth onChange={event => {
        setUsername(event.target.value);
      }} margin="normal" />
      <InputField type="password" error={hasError} helperText={error} label="Password" placeholder="Password..." value={password} variant="outlined" fullWidth onChange={event => {
        setPassword(event.target.value);
      }} margin="normal" />

      <Text id="forgotPasswordLabel" onClick={() => onForgotPassword()} label="Forgot password?" variant="body2" color="textSecondary" />

      <Button label="Login" color="secondary" variant="contained" onClick={async () => {
        const result = await auth.signin!(username, password);
        if (result.success) {
          setHasError(false);
          setError("");
          onSuccess();
        } else {
          setHasError(true);
          setError(result.response[0].messages[0].message);
        }
      }} fullWidth className="marginButton" />

      <Button Icon={GoogleIcon} variant="contained" onClick={() => false} className="marginButton bubbleButton" id="bubbleButtonLeft" />
      <Button Icon={BubbleIcon} variant="contained" onClick={() => false} className="marginButton bubbleButton" />

      <Text id="noAccountLabel" label="Don't have an account yet?" variant="body2" color="primary" />
      <Button label="Create an account" variant="contained" onClick={() => onCreateAccount()} fullWidth className="marginButton greyButton" />
    </div>
  )
}

export default SignIn;
