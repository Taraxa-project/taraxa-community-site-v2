import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from '@taraxa_project/taraxa-ui';
import { useMediaQuery } from 'react-responsive';

import CloseIcon from '../../assets/icons/close';

import { useAuth } from "../../services/useAuth";

import Title from "../../components/Title/Title";

import KYC from "./Modal/KYC";
import KYCSuccess from "./Modal/KYCSuccess";
import KYCError from "./Modal/KYCError";

import ViewProfile from "./ViewProfile";
import EditProfile from "./EditProfile";

import './profile.scss';

const Profile = () => {
  const auth = useAuth();
  const history = useHistory();
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  const isLoggedIn = auth.user?.id;

  if (!isLoggedIn) {
    history.push('/');
  }

  const [editProfile, setEditProfile] = useState(false);
  const [isKYCModalOpen, setIsKYCModalOpen] = useState(false);

  return (
    <div className={isMobile ? "mobile-profile" : "profile"}>
      <div className="profile-content">
        <Title
          title={editProfile ? "My profile - settings" : "My profile"}
        />
        <ProfileModal
          isKYCModalOpen={isKYCModalOpen}
          setIsKYCModalOpen={setIsKYCModalOpen}
        />
        {!editProfile ?
          <ViewProfile
            openEditProfile={() => setEditProfile(true)}
            openKYCModal={() => setIsKYCModalOpen(true)} />
          :
          <EditProfile
            closeEditProfile={() => setEditProfile(false)}
          />
        }
      </div>
    </div>
  )
}

interface ProfileModalProps {
  isKYCModalOpen: boolean;
  setIsKYCModalOpen: (isKYCModalOpen: boolean) => void;
}

function ProfileModal({ isKYCModalOpen, setIsKYCModalOpen }: ProfileModalProps) {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  const modalKYC = <KYC onSuccess={() => { }} />
  const modalKYCSuccess = <KYCSuccess onSuccess={() => { }} />
  const modalKYCError = <KYCError onSuccess={() => { }} />

  return (
    <Modal
      id={isMobile ? "mobile-signinModal" : "signinModal"}
      title="Submit KYC"
      parentElementID="root"
      show={isKYCModalOpen}
      children={modalKYC}
      onRequestClose={() => {
        setIsKYCModalOpen(false);
      }}
      closeIcon={CloseIcon} />
  )
}

export default Profile;
