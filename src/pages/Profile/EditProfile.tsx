import { useState } from "react";
import { Text, Button, InputField } from '@taraxa_project/taraxa-ui';

import { useAuth } from "../../services/useAuth";

interface EditProfileProps {
  closeEditProfile: () => void;
}

const EditProfile = ({ closeEditProfile }: EditProfileProps) => {

  const auth = useAuth();

  const [nickname, setNickname] = useState(auth.user && auth.user.username || 'username');
  const [password, setPassword] = useState('password');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [email, setEmail] = useState(auth.user && auth.user.email || '');
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [updatingEmail, setUpdatingEmail] = useState(false);
  const [changesMade, setChangesMade] = useState(false);

  return (
    <>
      <div className="editProfileForm">
        <div className="formInputContainer">
          <Text className="profile-inputLabel" label="Nickname" variant="body2" color="primary" />
          <InputField type="string" className="profileInput" label="" color="secondary" value={nickname} variant="standard" onChange={(event: any) => { setNickname(event.target.value); setChangesMade(true) }} margin="normal" />
        </div>

        <div className="formInputContainer">
          <Text className="profile-inputLabel" label="Password" variant="body2" color="primary" />
          <div className="profileDisabledInput">{password} <Button className="profileEditButton" variant="text" label={updatingPassword ? "Cancel" : 'Update'} onClick={() => { updatingPassword ? setUpdatingPassword(false) : setUpdatingPassword(true) }} /></div>
        </div>

        {updatingPassword &&
          <div className="verticalFormContainer">
            <div className="formInputContainer">
              <Text className="profile-inputLabel" label="Old password" variant="body2" color="primary" />
              <InputField type="string" className="profileInput" label="" color="secondary" value={oldPassword} variant="standard" onChange={(event: any) => { setOldPassword(event.target.value); setChangesMade(true) }} margin="normal" />
            </div>

            <div className="formInputContainer">
              <Text className="profile-inputLabel" label="New password" variant="body2" color="primary" />
              <InputField type="string" className="profileInput" label="" color="secondary" value={newPassword} variant="standard" onChange={(event: any) => { setNewPassword(event.target.value); setChangesMade(true) }} margin="normal" />
            </div>

            <div className="formInputContainer">
              <Text className="profile-inputLabel" label="Confirm new password" variant="body2" color="primary" />
              <InputField type="string" className="profileInput" label="" color="secondary" value={setConfirmNewPassword} variant="standard" onChange={(event: any) => { setConfirmNewPassword(event.target.value); setChangesMade(true) }} margin="normal" />
            </div>
          </div>
        }

        <div className="formInputContainer">
          <Text className="profile-inputLabel" label="Email" variant="body2" color="primary" />
          <div className="profileDisabledInput">{email} <Button className="profileEditButton" variant="text" label={updatingEmail ? "Cancel" : 'Update'} onClick={() => { updatingEmail ? setUpdatingEmail(false) : setUpdatingEmail(true) }} /></div>
        </div>

        {updatingEmail &&
          <div className="verticalFormContainer">
            <div className="formInputContainer">
              <Text className="profile-inputLabel" label="Confirmation Code" variant="body2" color="primary" />
              <InputField type="string" className="profileInput" label="" color="secondary" value={confirmationCode} variant="standard" onChange={(event: any) => { setConfirmationCode(event.target.value); setChangesMade(true) }} margin="normal" />
            </div>

            <div className="formInputContainer">
              <Text className="profile-inputLabel" label="New e-mail" variant="body2" color="primary" />
              <InputField type="string" className="profileInput" label="" color="secondary" value={newPassword} variant="standard" onChange={(event: any) => { setNewEmail(event.target.value); setChangesMade(true) }} margin="normal" />
            </div>

            <div className="formInputContainer">
              <Text className="profile-inputLabel" label="Password" variant="body2" color="primary" />
              <InputField type="string" className="profileInput" label="" color="secondary" value={emailPassword} variant="standard" onChange={(event: any) => { setEmailPassword(event.target.value); setChangesMade(true) }} margin="normal" />
            </div>
          </ div>
        }
      </div>
      <div id="buttonsContainer">
        <Button label="Save changes" variant="contained" color="secondary" onClick={() => { setChangesMade(false); closeEditProfile() }} disabled={!changesMade} />
        <Button label="Cancel" variant="contained" id="grayButton" onClick={() => { setChangesMade(false); closeEditProfile() }} />
      </div>
    </>
  )
}

export default EditProfile;
