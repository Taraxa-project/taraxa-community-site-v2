import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

import { ProfileBasicCard, Text, ProfileCard, Button, LinkedCards, Tooltip, ProfileSubmissionsCard } from '@taraxa_project/taraxa-ui';

import BountyIcon from '../../assets/icons/bounties';
import TaraxaIcon from '../../assets/icons/taraxaIcon';
import InfoIcon from '../../assets/icons/info';
import KYCIcon from '../../assets/icons/kyc';
import SuccessIcon from '../../assets/icons/success';
import ErrorIcon from '../../assets/icons/error';

import { formatTime } from "../../utils/time";

import { useAuth } from "../../services/useAuth";
import { useApi } from '../../services/useApi';
import Title from "../../components/Title/Title";

interface ViewProfileProps {
  openEditProfile: () => void;
  openKYCModal: () => void;
}

const ViewProfile = ({ openEditProfile, openKYCModal }: ViewProfileProps) => {

  const auth = useAuth();
  const api = useApi();

  const [points, setPoints] = useState(0);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [review, setReview] = useState([]);


  const getSubmissions = async () => {
    if (!auth.user || !auth.user.id) {
      return;
    }

    const data = await api.get(`/submissions?user.id=${auth.user!.id}`);
    if (!data.success) {
      return;
    }

    setApproved(
      data.response.filter(
        (sub: { reviewed: boolean; accepted: boolean; }) => sub.reviewed === true && sub.accepted === true
      )
    );
    setRejected(
      data.response.filter(
        (sub: { reviewed: boolean; accepted: boolean; }) => sub.reviewed === true && sub.accepted === false
      )
    );
    setReview(
      data.response.filter(
        (sub: { reviewed: boolean | null; }) => sub.reviewed === null || sub.reviewed === false
      )
    );
  }

  useEffect(() => {
    getSubmissions();
  }, []);

  useEffect(() => {
    const p = approved.reduce((tot, submission: any) => {
      return tot + parseFloat(submission.submission_reward);
    }, 0)

    setPoints(p);
  }, [approved]);

  return (
    <>
      <ViewProfileDetails
        points={points}
        openEditProfile={openEditProfile}
        openKYCModal={openKYCModal}
      />
      <ViewProfileBounties
        approved={approved}
        rejected={rejected}
        review={review}
      />
    </>
  )
}

interface ViewProfileDetailsProps {
  points: number;
  openEditProfile: () => void;
  openKYCModal: () => void;
}

function ViewProfileDetails({ points, openEditProfile, openKYCModal }: ViewProfileDetailsProps) {
  const auth = useAuth();
  const history = useHistory();
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  const buttons = <div className="buttonsContainer">
    <Button color="primary" variant="outlined" label="Edit Profile" onClick={() => openEditProfile()} />
    <Button color="primary" variant="text" label="Log out" onClick={() => {
      auth.signout!();
      history.push('/');
    }} />
  </div>

  return (
    <div className={isMobile ? "mobileCardContainer" : "cardContainer"}>
      {auth.user && <ProfileCard username={auth.user!.username} email={auth.user!.email} wallet={auth.user!.eth_wallet} Icon={TaraxaIcon} buttonOptions={buttons} />}
      <ViewProfileDetailsKYC openKYCModal={openKYCModal} />
      <ProfileBasicCard title="My Rewards" description="TARA Points" value={points.toString()} />
    </div>
  )
}

interface ViewProfileDetailsKYCProps {
  openKYCModal: () => void;
}

function ViewProfileDetailsKYC({ openKYCModal }: ViewProfileDetailsKYCProps) {
  const auth = useAuth();
  const kyc = auth.user!.kyc;

  const empty = [null, "", "-", "NOT_STARTED"];
  const hasKYC = ![...empty, "VERIFYING"].includes(kyc);
  const kycStatus = ![...empty].includes(kyc) ? kyc : "NOT_STARTED";

  const status: { [string: string]: string } = {
    "NOT_STARTED": "Not sumbitted",
    "VERIFYING": "Verifying...",
    "APPROVED": "Approved",
    "DENIED": "Denied",
  }

  let kycButton;

  if (!hasKYC) {
    kycButton = <div className="buttonsContainer">
      <Button variant="contained" color="secondary" label="Verify" onClick={() => openKYCModal()} />
    </div>
  }

  if (kycStatus === "APPROVED") {
    kycButton = <SuccessIcon />
  }

  if (kycStatus === "DENIED") {
    kycButton = <ErrorIcon />
  }

  return (
    <ProfileBasicCard title="KYC" description={status[kycStatus]} Icon={KYCIcon} buttonOptions={kycButton} />
  )
}

interface ViewProfileBountiesProps {
  approved: any[];
  rejected: any[];
  review: any[];
}

function ViewProfileBounties({ approved, rejected, review }: ViewProfileBountiesProps) {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  const renderSubmission = (sub: any) => {
    const now = new Date();
    const date = new Date(sub.submission_date);
    const dateDiff = Math.ceil((now.getTime() - date.getTime()) / 1000);
    return (
      <div key={sub.id} className="contentGrid">
        <div className="gridLeft">
          <Text label={sub.bounty.name} className="profileContentTitle" variant="body2" color="primary" />
          <Text label={sub.submission_reward} variant="body2" color="textSecondary" />
        </div>
        <div className="gridRight">
          <Text label={`${formatTime(dateDiff)} ago`} variant="body2" color="textSecondary" />
        </div>
      </div>
    );
  }

  const noSubmissions = <div>
    <Text label="No submissions yet" className="noContent" variant="body2" color="textSecondary" />
  </div>;

  let approvedContent = noSubmissions;
  let rejectedContent = noSubmissions;
  let reviewContent = noSubmissions;

  if (approved.length > 0) {
    approvedContent = (
      <>
        {approved.map((sub: any) => renderSubmission(sub))}
      </>
    );
  }

  if (rejected.length > 0) {
    rejectedContent = (
      <>
        {rejected.map((sub: any) => renderSubmission(sub))}
      </>
    );
  }

  if (review.length > 0) {
    reviewContent = (
      <>
        {review.map((sub: any) => renderSubmission(sub))}
      </>
    );
  }

  return (
    <>
      <Title
        title="Bounty submissions"
        subtitle=""
        tooltip=""
        Icon={BountyIcon}
        size='medium'
      />
      <div className={isMobile ? "mobileCardContainer" : "cardContainer"}>
        <ProfileSubmissionsCard
          title='Approved'
          itemsContent={approvedContent}
          tooltip={<Tooltip className="staking-icon-tooltip" title="Bounty submissions that have been approved and points have been rewarded." Icon={InfoIcon} />}
        />
        <ProfileSubmissionsCard
          title='In Review'
          itemsContent={reviewContent}
          tooltip={<Tooltip className="staking-icon-tooltip" title="Bounty submissions are being reviewed." Icon={InfoIcon} />}
        />
        <ProfileSubmissionsCard
          title='Rejected'
          itemsContent={rejectedContent}
          tooltip={<Tooltip className="staking-icon-tooltip" title="Bounty submissions that have been rejected." Icon={InfoIcon} />}
        />
      </div>
    </>
  )
}

export default ViewProfile;
