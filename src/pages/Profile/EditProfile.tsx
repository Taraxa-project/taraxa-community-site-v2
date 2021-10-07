import { useState } from "react";
import { Text, Button, InputField } from '@taraxa_project/taraxa-ui';

import { useAuth } from "../../services/useAuth";

interface EditProfileProps {
  closeEditProfile: () => void;
}

const EditProfile = ({ closeEditProfile }: EditProfileProps) => {

  const auth = useAuth();

  const [nickname, setNickname] = useState(auth.user && auth.user.username || 'username');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [changesMade, setChangesMade] = useState(false);

  const email = auth.user && auth.user.email || '';

  const [errors, setErrors] = useState<{ key: string, value: string }[]>([]);

  const errIndex = errors.map(error => error.key);
  const errValues = errors.map(error => error.value);

  const findErrorIndex = (field: string) => errIndex.findIndex((err) => err === field);
  const hasError = (field: string) => findErrorIndex(field) !== -1;

  const hasNicknameError = hasError('username');
  const nicknameErrorMessage = hasError('username') ? errValues[findErrorIndex('username')] : undefined;
  const hasPasswordError = hasError('password');
  const passwordErrorMessage = hasError('password') ? errValues[findErrorIndex('password')] : undefined;
  const hasPasswordConfirmationError = hasError('password-confirmation');
  const passwordConfirmationErrorMessage = hasError('password-confirmation') ? errValues[findErrorIndex('password-confirmation')] : undefined;

  let hasGeneralError = false;
  let generalErrorMessage = undefined;

  if (errors.length > 0 && !hasNicknameError && !hasPasswordError && !hasPasswordConfirmationError) {
    hasGeneralError = true;
    generalErrorMessage = errValues[0];
  }

  const submit = async (event: React.MouseEvent<HTMLElement> | React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrors([]);
    const errors = [];

    if (updatingPassword) {
      if (password.length < 12) {
        errors.push({ key: 'password', value: "The password needs to have at least 12 characters." });
      }

      if (password !== passwordConfirmation) {
        errors.push({ key: 'password-confirmation', value: "Passwords do not match." });
      }

    }

    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    let result;
    if (updatingPassword) {
      result = await auth.updateUser!(nickname, password);
    } else {
      result = await auth.updateUser!(nickname);
    }

    if (result.success) {
      setChangesMade(false);
      closeEditProfile();
      return;
    }

    setErrors(result.response[0].messages.map((message: any) => ({ key: message.id.split('.')[3], value: message.message })));
  };

  return (
    <form onSubmit={submit}>
      <div className="editProfileForm">
        <div className="formInputContainer">
          <div>
            <Text className="profile-inputLabel" label="Nickname" variant="body2" color="primary" />
            <InputField type="string" error={hasNicknameError} helperText={nicknameErrorMessage} className="profileInput" label="" color="secondary" value={nickname} variant="standard" onChange={(event: any) => { setNickname(event.target.value); setChangesMade(true) }} margin="normal" />
          </div>
        </div>

        <div className="formInputContainer">
          <div>
            <Text className="profile-inputLabel" label="Email" variant="body2" color="primary" />
            <div className="profileDisabledInput">{email}</div>
          </div>
        </div>

        <div className="formInputContainer">
          <div>
            <Text className="profile-inputLabel" label="Password" variant="body2" color="primary" />
            <div className="profileDisabledInput">************</div>
          </div>
          <Button className="profileEditButton" variant="outlined" color="secondary" size="small" label={updatingPassword ? "Cancel" : 'Update'} onClick={() => { updatingPassword ? setUpdatingPassword(false) : setUpdatingPassword(true) }} />
        </div>

        {updatingPassword &&
          <div className="verticalFormContainer">
            <div className="formInputContainer">
              <div>
                <Text className="profile-inputLabel" label="New password" variant="body2" color="primary" />
                <InputField type="password" error={hasPasswordError} helperText={passwordErrorMessage} className="profileInput" label="" color="secondary" value={password} variant="standard" onChange={(event: any) => { setPassword(event.target.value); setChangesMade(true) }} margin="normal" />
              </div>
            </div>

            <div className="formInputContainer">
              <div>
                <Text className="profile-inputLabel" label="Confirm new password" variant="body2" color="primary" />
                <InputField type="password" error={hasPasswordConfirmationError} helperText={passwordConfirmationErrorMessage} className="profileInput" label="" color="secondary" value={passwordConfirmation} variant="standard" onChange={(event: any) => { setPasswordConfirmation(event.target.value); setChangesMade(true) }} margin="normal" />
              </div>
            </div>
          </div>
        }
        {hasGeneralError && <Text label={generalErrorMessage!} variant="body1" color="error" />}
      </div>
      <div id="buttonsContainer">
        <Button type="submit" label="Save changes" variant="contained" color="secondary" onClick={submit} disabled={!changesMade} />
        <Button label="Cancel" variant="contained" id="grayButton" onClick={() => { setChangesMade(false); closeEditProfile() }} />
      </div>
    </form>
  )
}

export default EditProfile;
