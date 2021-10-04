import { useState } from "react";
import { Button, Text, InputField } from "@taraxa_project/taraxa-ui";
import { useAuth } from "../../services/useAuth";

type SignInProps = {
  onSuccess: () => void,
  onForgotPassword: () => void,
  onCreateAccount: () => void
}

const SignIn = ({ onSuccess, onForgotPassword, onCreateAccount }: SignInProps) => {

  const auth = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<{ key: string, value: string }[]>([]);

  const errIndex = errors.map(error => error.key);
  const errValues = errors.map(error => error.value);

  const findErrorIndex = (field: string) => errIndex.findIndex((err) => err === field);
  const hasError = (field: string) => findErrorIndex(field) !== -1;

  const hasEmailError = hasError('email');
  const emailErrorMessage = hasError('email') ? errValues[findErrorIndex('email')] : undefined;
  const hasPasswordError = hasError('password');
  const passwordErrorMessage = hasError('password') ? errValues[findErrorIndex('password')] : undefined;

  let hasGeneralError = false;
  let generalErrorMessage = undefined;

  if(errors.length > 0 && !hasEmailError && !hasPasswordError) {
    hasGeneralError = true;
    generalErrorMessage = errValues[0];
  }

  return (
    <div>
      <Text label="Sign In" variant="h6" color="primary" />
      <InputField label="E-mail" error={hasEmailError} helperText={emailErrorMessage} placeholder="Email or username..." value={username} variant="outlined" type="text" fullWidth onChange={event => {
        setUsername(event.target.value);
      }} margin="normal" />
      <InputField type="password" error={hasPasswordError} helperText={passwordErrorMessage} label="Password" placeholder="Password..." value={password} variant="outlined" fullWidth onChange={event => {
        setPassword(event.target.value);
      }} margin="normal" />

      <Text id="forgotPasswordLabel" onClick={() => onForgotPassword()} label="Forgot password?" variant="body2" color="textSecondary" />

      {hasGeneralError && <Text label={generalErrorMessage!} variant="body1" color="error" />}

      <Button label="Login" color="secondary" variant="contained" onClick={async () => {
        setErrors([]);

        const result = await auth.signin!(username, password);
        if (result.success) {
          onSuccess();
          return;
        }
        setErrors(result.response[0].messages.map((message: any) => ({ key: message.id.split('.')[3], value: message.message })));

      }} fullWidth className="marginButton" />

      {/* <Button Icon={GoogleIcon} variant="contained" onClick={() => false} className="marginButton bubbleButton" id="bubbleButtonLeft" /> */}
      {/* <Button Icon={BubbleIcon} variant="contained" onClick={() => false} className="marginButton bubbleButton" /> */}

      <Text id="noAccountLabel" label="Don't have an account yet?" variant="body2" color="primary" />
      <Button label="Create an account" variant="contained" onClick={() => onCreateAccount()} fullWidth className="marginButton greyButton" />
    </div>
  )
}

export default SignIn;
