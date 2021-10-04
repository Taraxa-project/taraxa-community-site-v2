import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { ProfileBasicCard, Text, ProfileCard, Button, LinkedCards, InputField, Tooltip, Modal, Checkbox } from '@taraxa_project/taraxa-ui';
import TaraxaIcon from '../../assets/icons/taraxaIcon';
import KYCIcon from '../../assets/icons/kyc';
import { useMediaQuery } from 'react-responsive';
import InfoIcon from '../../assets/icons/info';
import { useApi } from '../../services/useApi';
import { useAuth } from "../../services/useAuth";
import CloseIcon from '../../assets/icons/close';

import Title from "../../components/Title/Title";

import './profile.scss';

const Profile = () => {

  const auth = useAuth();
  const history = useHistory();

  const isLoggedIn = auth.user?.id;

  if (!isLoggedIn) {
    history.push('/');
  }

  const [editProfile, setEditProfile] = useState(false);
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
  const [kycModalOpen, setKycModalOpen] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const api = useApi();
  const [points, setPoints] = useState(0);
  const token = JSON.parse(localStorage.getItem('user') || '');
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [review, setReview] = useState([]);

  const modalTrigger = () => {
    setKycModalOpen(!kycModalOpen);
  }

  const agreementTrigger = (event: any) => {
    setAgreement(event.target.checked);
  }

  const modalKYC =
    <div>
      <div className="kycTopContainer">
        <Text style={{ marginBottom: '2%' }} label="Submit KYC" variant="h6" color="primary" />
        <KYCIcon />
        <Text style={{ margin: '2% 0 2% 0' }} label="To continue please upload an image of your ID / passport" variant="body2" color="textSecondary" />
        <Text label="NOTICE:" color="primary" variant="body2" />
      </div>

      <ul className="decimalUL">
        <li><Text label="To comply with recent SEC rulings, United States persons cannot receive token rewards" variant="body2" color="textSecondary" /></li>
        <li><Text label="Please don’t try to exit verification process while uploading an image;" variant="body2" color="textSecondary" /></li>
        <li><Text label="Only upload the image of the selected ID document;" variant="body2" color="textSecondary" /></li>
        <li><Text label="Picture should not be modified in any way;" variant="body2" color="textSecondary" /></li>
        <li><Text label="Ukranian passports are not supported." variant="body2" color="textSecondary" /></li>
      </ul>

      <div className="checkboxContainer">
        <Checkbox name="agreement" onChange={agreementTrigger} checked={agreement} />
        <Text label="I agree to the processing of my personal data" variant="body2" color="primary" />
      </div>


      <Button label="Proceed to verification" color="secondary" variant="contained" onClick={() => console.log('proceed')} fullWidth className="marginButton" disabled={!agreement} />
    </div>

  const modalKYCSuccess =
    <div>
      <div className="kycTopContainer">
        <Text style={{ marginBottom: '2%' }} label="Submit KYC" variant="h6" color="primary" />
        <Text style={{ marginBottom: '5%' }} label="Thank you! We will contact you via e-mail." color="primary" variant="body1" />
        <Text label="You have successfully submitted KYC! Let us check it and get back to you." variant="body2" color="textSecondary" />
      </div>

      <Button label="OK" color="secondary" variant="contained" onClick={() => setKycModalOpen(false)} fullWidth className="marginButton" />
    </div>

  const modalKYCError =
    <div>
      <div className="kycTopContainer">
        <Text style={{ marginBottom: '2%' }} label="Submit KYC" variant="h6" color="primary" />
        <Text style={{ marginBottom: '5%' }} label="Something went wrong, please try again." color="primary" variant="body1" />
        <Text label="ERROR: Image format should be JPG or PNG" variant="body2" color="textSecondary" />
      </div>

      <Button label="TRY AGAIN" color="secondary" variant="contained" onClick={() => setKycModalOpen(false)} fullWidth className="marginButton" />
    </div>


  const buttons = <div className="buttonsContainer">
    <Button color="primary" variant="outlined" label="Edit Profile" onClick={() => setEditProfile(true)} />
    <Button color="primary" variant="text" label="Log out" onClick={() => {
      auth.signout!();
      history.push('/');
    }} />
  </div>

  const kycButton = <div className="buttonsContainer">
    <Button color="primary" variant="outlined" label="Submit" onClick={() => setKycModalOpen(true)} />
  </div>

  const approvedContent = <>
    {approved.map((sub: any) => {
      return <div className="contentGrid">
        <div className="gridLeft">
          <Text label={sub.bounty.name} className="profileContentTitle" variant="body2" color="primary" />
          <Text label="number of points " variant="body2" color="textSecondary" />
        </div>
        <div className="gridRight">
          <Text label={sub.submission_date} variant="body2" color="textSecondary" />
          <Text label={sub.submission_reward} variant="body2" color="textSecondary" />
        </div>
      </div>
    })}
    <div className="contentGrid">
      <div className="gridLeft">
        <Text label="Bug bounty" className="profileContentTitle" variant="body2" color="primary" />
        <Text label="number of points " variant="body2" color="textSecondary" />
      </div>
      <div className="gridRight">
        <Text label="2 months ago" variant="body2" color="textSecondary" />
      </div>
    </div>
  </>

  const reviewContent = <div>
    <Text label="No submissions yet" className="noContent" variant="body2" color="textSecondary" />
  </div>

  const rejectedContent = <div>
    <Text label="No submissions yet" className="noContent" variant="body2" color="textSecondary" />
  </div>

  useEffect(() => {
    if (token && token.id) {
      const getSubmissions = async () => {
        const data = await api.get(`/submissions?user.id=${token.id}`)
          .then(async (res: any) => {
            if (!res.success) {
              return;
            }
            console.log('promise')
            setApproved(
              res.response.filter(
                (sub: { reviewed: boolean; accepted: boolean; }) => sub.reviewed === true && sub.accepted === true
              )
            );
            setRejected(
              res.response.filter(
                (sub: { reviewed: boolean; accepted: boolean; }) => sub.reviewed === true && sub.accepted === false
              )
            );
            setReview(
              res.response.filter(
                (sub: { reviewed: boolean | null; }) => sub.reviewed === null || sub.reviewed === false
              )
            );
          })
      }
      getSubmissions();
    }
  }, []);

  useEffect(() => {
    setPoints(
      approved.reduce(function (tot, submission: any) {
        return tot + parseFloat(submission.submission_reward);
      }, 0)
    );
  }, [approved]);

  return (
    <div className={isMobile ? "mobile-profile" : "profile"}>
      <div className="profile-content">
        <Title
          title={editProfile ? "My profile - settings" : "My profile"}
        />
        {!editProfile ?
          <>
            <div className={isMobile ? "mobileCardContainer" : "cardContainer"}>

              <Modal id={isMobile ? "mobile-signinModal" : "signinModal"} title="Submit KYC" show={kycModalOpen} children={modalKYC} parentElementID="root" onRequestClose={modalTrigger} closeIcon={CloseIcon} />

              {auth.user && <ProfileCard username={auth.user!.username} email={auth.user!.email} wallet={auth.user!.eth_wallet} Icon={TaraxaIcon} buttonOptions={buttons} />}
              <ProfileBasicCard title="KYC" description="Not submitted" Icon={KYCIcon} buttonOptions={kycButton} />
              <ProfileBasicCard title="My Rewards" description="TARA Points" value={points.toString()} />
            </div>
            <div className={isMobile ? "mobileCardContainer" : "cardContainer"}>
              <LinkedCards rejectedContent={rejectedContent} approvedContent={approvedContent} reviewContent={reviewContent} rejectedTooltip={<Tooltip className="staking-icon-tooltip" title="Bounty submissions that have been rejected. " Icon={InfoIcon} />} reviewTooltip={<Tooltip className="staking-icon-tooltip" title="Bounty submissions are being reviewed." Icon={InfoIcon} />} approvedTooltip={<Tooltip className="staking-icon-tooltip" title="Bounty submissions that have been approved and points have been rewarded. " Icon={InfoIcon} />} />
            </div>
          </>
          :
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
              <Button label="Save changes" variant="contained" color="secondary" onClick={() => { setEditProfile(false); setChangesMade(false) }} disabled={!changesMade} />
              <Button label="Cancel" variant="contained" id="grayButton" onClick={() => { setEditProfile(false); setChangesMade(false) }} />
            </div>
          </>
        }

      </div>
    </div>
  )
}

export default Profile;
