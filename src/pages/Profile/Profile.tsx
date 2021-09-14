import React, { useState, useRef, useEffect } from 'react';
import './profile.scss';
import { menu } from '../../global/globalVars';
import { ProfileBasicCard, Text, ProfileCard, Button, LinkedCards, InputField } from '@taraxa_project/taraxa-ui';
import TaraxaIcon from '../../assets/icons/taraxaIcon';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import KYCIcon from '../../assets/icons/kyc';
import { useMediaQuery } from 'react-responsive';
import Sidebar from '../../components/Sidebar/Sidebar';

const Profile = () => {
  const [editProfile, setEditProfile] = useState(false);
  const [nickname, setNickname] = useState('username');
  const [password, setPassword] = useState('password');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [email, setEmail] = useState('email@email.com');
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [updatingEmail, setUpdatingEmail] = useState(false);
  const [changesMade, setChangesMade] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  const buttons = <div className="buttonsContainer">
    <Button color="primary" variant="outlined" label="Edit Profile" onClick={() => setEditProfile(true)}/>
    <Button color="primary" variant="text" label="Log out"/>
  </div>

  const approvedContent = <>
                            <div className="contentGrid">
                              <div className="gridLeft">
                                <Text label="Incentivized testnet" className="profileContentTitle" variant="body2" color="primary" />
                                <Text label="number of points " variant="body2" color="textSecondary" />
                              </div>
                              <div className="gridRight">
                                <Text label="3 weeks ago" variant="body2" color="textSecondary" />
                              </div> 
                            </div>
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

  return (
    <>
      <Header />
      <div className={isMobile ? "mobile-profile" : "profile"}>
        <Sidebar />
        <div className="profile-content">
          <Text label={editProfile ? "My profile - settings" : "My profile"} variant="h4" color="primary" className="profile-title"/>
          
          {!editProfile ?
            <>
              <div className={isMobile ? "mobileCardContainer" : "cardContainer"}>
                <ProfileCard username="Test 1" email="test@test.com" wallet="0x2612b77E5ee1a5feeDdD5eC08731749bC2217F54" Icon={TaraxaIcon} buttonOptions={buttons}/>
                <ProfileBasicCard title="KYC" description="Not submitted" Icon={KYCIcon}/>
                <ProfileBasicCard title="Wallet Balance" description="TARA" value="41,234"/>
              </div>
              <div className={isMobile ? "mobileCardContainer" : "cardContainer"}>
                <LinkedCards rejectedContent={rejectedContent} approvedContent={approvedContent} reviewContent={reviewContent} />
              </div>
            </>  
            :
            <>
              <div className="editProfileForm">
                <div className="formInputContainer">
                  <Text className="profile-inputLabel" label="Nickname"variant="body2" color="primary"/>
                  <InputField type="string" className="profileInput" label="" color="secondary"  value={nickname} variant="standard" onChange={(event: any) => {setNickname(event.target.value); setChangesMade(true)}} margin="normal" />
                </div>

                <div className="formInputContainer">
                  <Text className="profile-inputLabel" label="Password" variant="body2" color="primary"/>
                  <div className="profileDisabledInput">{password} <Button className="profileEditButton" variant="text" label={updatingPassword ? "Cancel" : 'Update'} onClick={() => {updatingPassword ?setUpdatingPassword(false) : setUpdatingPassword(true)}}/></div>
                </div>

                {updatingPassword &&
                    <div className="verticalFormContainer">
                      <div className="formInputContainer">
                        <Text className="profile-inputLabel" label="Old password"variant="body2" color="primary"/>
                        <InputField type="string" className="profileInput" label="" color="secondary"  value={oldPassword} variant="standard" onChange={(event: any) => {setOldPassword(event.target.value); setChangesMade(true)}} margin="normal" />
                      </div>

                      <div className="formInputContainer">
                        <Text className="profile-inputLabel" label="New password"variant="body2" color="primary"/>
                        <InputField type="string" className="profileInput" label="" color="secondary"  value={newPassword} variant="standard" onChange={(event: any) => {setNewPassword(event.target.value); setChangesMade(true)}} margin="normal" />
                      </div>

                      <div className="formInputContainer">
                        <Text className="profile-inputLabel" label="Confirm new password"variant="body2" color="primary"/>
                        <InputField type="string" className="profileInput" label="" color="secondary"  value={setConfirmNewPassword} variant="standard" onChange={(event: any) => {setConfirmNewPassword(event.target.value); setChangesMade(true)}} margin="normal" />
                      </div>
                    </div>
                  }

                <div className="formInputContainer">
                  <Text className="profile-inputLabel" label="Email"variant="body2" color="primary"/>
                  <div className="profileDisabledInput">{email} <Button className="profileEditButton" variant="text" label={updatingEmail ? "Cancel" : 'Update'} onClick={() => {updatingEmail ? setUpdatingEmail(false) : setUpdatingEmail(true)}}/></div>
                </div>

                {updatingEmail &&
                    <div className="verticalFormContainer">
                      <div className="formInputContainer">
                        <Text className="profile-inputLabel" label="Confirmation Code"variant="body2" color="primary"/>
                        <InputField type="string" className="profileInput" label="" color="secondary"  value={confirmationCode} variant="standard" onChange={(event: any) => {setConfirmationCode(event.target.value); setChangesMade(true)}} margin="normal" />
                      </div>

                      <div className="formInputContainer">
                        <Text className="profile-inputLabel" label="New e-mail"variant="body2" color="primary"/>
                        <InputField type="string" className="profileInput" label="" color="secondary"  value={newPassword} variant="standard" onChange={(event: any) => {setNewEmail(event.target.value); setChangesMade(true)}} margin="normal" />
                      </div>

                      <div className="formInputContainer">
                        <Text className="profile-inputLabel" label="Password"variant="body2" color="primary"/>
                        <InputField type="string" className="profileInput" label="" color="secondary"  value={emailPassword} variant="standard" onChange={(event: any) => {setEmailPassword(event.target.value); setChangesMade(true)}} margin="normal" />
                      </div>
                    </ div>
                  }
              </div>
              <div id="buttonsContainer">
                <Button label="Save changes" variant="contained" color="secondary" onClick={() => {setEditProfile(false); setChangesMade(false)}} disabled={!changesMade} />
                <Button label="Cancel" variant="contained" id="grayButton" onClick={() => {setEditProfile(false); setChangesMade(false)}} disabled={!changesMade} />
              </div>
            </>
          }
          
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Profile;
