import { ethers } from "ethers";
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useMetaMask } from "metamask-react";

import { Modal, Text, Tooltip, TopCard, BaseCard, DataCard, InputField } from '@taraxa_project/taraxa-ui';

import CloseIcon from '../../assets/icons/close';
import InfoIcon from '../../assets/icons/info';
import TrophyIcon from '../../assets/icons/trophy';
import LockIcon from './../../assets/icons/lock';

import StakingSuccess from './Modal/StakingSuccess';
import StakingError from './Modal/StakingError';
import Approve from './Modal/Approve';
import IsStaking from './Modal/IsStaking';

import useToken from '../../services/useToken';
import useStaking from '../../services/useStaking';

import './staking.scss';

const weiToEth = (val: ethers.BigNumberish) => ethers.utils.formatUnits(val, "ether");
const formatEth = (val: ethers.BigNumberish) => ethers.utils.commify(val.toString());
const roundEth = (val: string) => (+val).toFixed(4);

const formatTime = (seconds: number) => {
  const unit = [
    "second",
    "minute",
    "hour",
    "day",
    "month",
    "year",
  ];
  return [
    1,
    60,
    60 * 60,
    24 * 60 * 60,
    30 * 24 * 60 * 60,
    365 * 24 * 60 * 60,
  ].reduce((prev: string, currVal: number, currIndex: number) => {
    const u = unit[currIndex];
    const decimal = seconds / currVal;

    if (decimal >= 1) {
      const plural = decimal > 1;
      return `${Math.round(decimal)} ${u}${plural ? 's' : ''}`;
    }

    return prev;
  }, `${seconds}`);
};

function Staking() {
  const { account } = useMetaMask();
  const token = useToken();
  const staking = useStaking();

  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isApprove, setIsApprove] = useState(false);
  const [isStaking, setIsStaking] = useState(false);

  const [tokenBalance, setTokenBalance] = useState<ethers.BigNumber>(ethers.BigNumber.from("0"));
  const [toStake, setToStake] = useState<ethers.BigNumber>(ethers.BigNumber.from("0"));
  const [stakeInput, setStakeInput] = useState("0.0");
  const [currentStakeBalance, setCurrentStakeBalance] = useState<ethers.BigNumber>(ethers.BigNumber.from("0"));

  const [lockingPeriod, setLockingPeriod] = useState<ethers.BigNumber>(ethers.BigNumber.from(30 * 24 * 60 * 60));

  useEffect(() => {
    const getTokenBalance = async () => {
      if (!token) {
        return;
      }

      const balance = await token.balanceOf(account);
      setTokenBalance(balance);
      setToStake(balance);
      setStakeInput(formatEth(weiToEth(balance)));
    };

    const getLockingPeriod = async () => {
      if (!staking) {
        return;
      }

      const currentLockingPeriod = await staking.lockingPeriod();
      setLockingPeriod(currentLockingPeriod);
    }

    getTokenBalance();
    getLockingPeriod();
  }, [account, token, staking]);

  return (
    <>
      <StakingModal
        isSuccess={isSuccess}
        isError={isError}
        isApprove={isApprove}
        isStaking={isStaking}
        setIsSuccess={setIsSuccess}
        setIsError={setIsError}
        setIsApprove={setIsApprove}
        setIsStaking={setIsStaking}
        stakedAmount={formatEth(roundEth(weiToEth(toStake)))}
        balance={formatEth(roundEth(weiToEth(tokenBalance)))}
        lockingPeriod={formatTime(lockingPeriod.toNumber())}
      />
      <div className={isMobile ? "stakingRootMobile" : "stakingRoot"}>
        <div className="staking">
          <div className="staking-content">
            <StakingTitle />
            <StakingMetamaskNotification />
            {/* <StakingTop /> */}
            <Stake
              setIsSuccess={setIsSuccess}
              setIsError={setIsError}
              setIsApprove={setIsApprove}
              setIsStaking={setIsStaking}
              tokenBalance={tokenBalance}
              setTokenBalance={setTokenBalance}
              toStake={toStake}
              setToStake={setToStake}
              stakeInput={stakeInput}
              setStakeInput={setStakeInput}
              currentStakeBalance={currentStakeBalance}
              setCurrentStakeBalance={setCurrentStakeBalance}
              lockingPeriod={lockingPeriod}
            />
          </div>
        </div>
      </div>
    </>
  );
}

interface StakingModal {
  isSuccess: boolean;
  isError: boolean;
  isApprove: boolean;
  isStaking: boolean;
  setIsSuccess: (isSuccess: boolean) => void;
  setIsError: (isError: boolean) => void;
  setIsApprove: (isApprove: boolean) => void;
  setIsStaking: (isStaking: boolean) => void;
  stakedAmount: string;
  balance: string;
  lockingPeriod: string;
}

function StakingModal({ isSuccess, isError, isApprove, isStaking, setIsSuccess, setIsError, setIsApprove, setIsStaking, stakedAmount, balance, lockingPeriod }: StakingModal) {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  let modal = <></>;

  if (isSuccess) {
    modal = (
      <StakingSuccess lockingPeriod={lockingPeriod} onSuccess={() => {
        setIsSuccess(false);
      }} />
    );
  }

  if (isError) {
    modal = (
      <StakingError amount={balance} onSuccess={() => {
        setIsError(false);
      }} />
    );
  }

  if (isApprove) {
    modal = (
      <Approve amount={stakedAmount} />
    );
  }

  if (isStaking) {
    modal = (
      <IsStaking amount={stakedAmount} />
    );
  }

  return (
    <Modal
      id={isMobile ? "mobile-signinModal" : "signinModal"}
      title="Test"
      show={isStaking || isApprove || isSuccess || isError}
      children={modal}
      parentElementID="root"
      onRequestClose={() => {
        setIsSuccess(false);
        setIsError(false);
        setIsApprove(false);
        setIsStaking(false);
      }}
      closeIcon={CloseIcon}
    />
  );
}

function StakingTitle() {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  return (
    <>
      <div className={isMobile ? "mobile-staking-icon-container" : "staking-icon-container"}>
        <Text label="Staking: Phase 1 - Pre-staking" variant="h4" color="primary" className="staking-title" />
        <Tooltip className="staking-icon-tooltip" title="We’re currently in the first phase of staking roll-out, Pre-staking, which enables TARA lockups on the ETH network. The next phase will be Mirrored Staking, which mirrors staking data from the ETH network over to the Taraxa testnet to enable delegation to consensus nodes. The last phase is mainnet launch, in which all tokens, staking, and delegation is migrated to the Taraxa mainnet." Icon={InfoIcon} />
      </div>
      <Text label="Earn rewards and help test &amp; secure the Taraxa’s network " variant="body2" color="textSecondary" className={isMobile ? "mobile-staking-subtitle" : "staking-subtitle"} />
    </>
  );
}

function StakingMetamaskNotification() {
  const { status } = useMetaMask();
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  if (status === "connected") {
    return null;
  }
  return (
    <div className={isMobile ? "staking-red-stripe-mobile" : "staking-red-stripe"}>
      <Text label="Notice:" variant="body1" color="primary" className="staking-title" />
      <Text label="You are not connected to the Metamask wallet" variant="body2" color="primary" className="staking-subtitle" />
    </div>
  );
}

function StakingTop() {
  const topData = (
    <div>
      <div className="top-data-header">
        <Text label="Top stakers" variant="body1" color="primary" />
        <Text label="See full list" variant="body1" color="primary" />
      </div>
      <table cellSpacing="8">
        <tr>
          <td>1.</td>
          <td><TrophyIcon /> vitalik</td>
          <td>0xe08c0 ... 29b34</td>
          <td>4,000,000 TARA</td>
        </tr>
        <tr>
          <td>2.</td>
          <td><TrophyIcon /> username2</td>
          <td>0xe08c0 ... 29b34</td>
          <td>800,000 TARA</td>
        </tr>
        <tr>
          <td>3.</td>
          <td><TrophyIcon /> mark_cuban</td>
          <td>0xe08c0 ... 29b34</td>
          <td>750,000 TARA</td>
        </tr>
      </table>
    </div>
  );
  return (
    <div>
      <TopCard title="23,124,123" description="Total TARA Staked" topData={topData} />
    </div>
  );
}

interface Stake {
  setIsSuccess: (isSuccess: boolean) => void;
  setIsError: (isError: boolean) => void;
  setIsApprove: (isApprove: boolean) => void;
  setIsStaking: (isApprove: boolean) => void;
  tokenBalance: ethers.BigNumber;
  setTokenBalance: (tokenBalance: ethers.BigNumber) => void;
  toStake: ethers.BigNumber;
  setToStake: (toStake: ethers.BigNumber) => void;
  stakeInput: string;
  setStakeInput: (stakeInput: string) => void;
  currentStakeBalance: ethers.BigNumber;
  setCurrentStakeBalance: (currentStakeBalance: ethers.BigNumber) => void;
  lockingPeriod: ethers.BigNumber;
}

function Stake({ setIsSuccess, setIsError, setIsApprove, setIsStaking, tokenBalance, setTokenBalance, setToStake, stakeInput, setStakeInput, currentStakeBalance, setCurrentStakeBalance, lockingPeriod }: Stake) {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  const { account } = useMetaMask();
  const token = useToken();
  const staking = useStaking();

  const [hasStake, setHasStake] = useState(false);
  const [canClaimStake, setCanClaimStake] = useState(false);
  const [currentStakeStartDate, setCurrentStakeStartDate] = useState<Date | null>(null);
  const [currentStakeEndDate, setCurrentStakeEndDate] = useState<Date | null>(null);

  const [stakeInputError, setStakeInputError] = useState<string | null>(null);
  const [unstakeInputError, setUnstakeInputError] = useState<string | null>(null);

  const resetStake = () => {
    setHasStake(false);
    setCanClaimStake(false);
    setCurrentStakeBalance(ethers.BigNumber.from("0"));
    setCurrentStakeStartDate(null);
    setCurrentStakeEndDate(null);
  };

  useEffect(() => {
    const getStakedBalance = async () => {
      if (!staking) {
        return;
      }

      const currentStake = await staking.stakeOf(account);

      const currentStakeBalance = currentStake[0];
      let currentStakeStartDate = currentStake[1].toNumber();
      let currentStakeEndDate = currentStake[2].toNumber();

      if (currentStakeBalance.toString() === "0" || currentStakeStartDate === 0 || currentStakeEndDate === 0) {
        resetStake();
        return;
      }

      const currentTimestamp = Math.ceil(new Date().getTime() / 1000);
      const canClaimStake = currentTimestamp > currentStakeEndDate;

      currentStakeStartDate = new Date(currentStakeStartDate * 1000);
      currentStakeEndDate = new Date(currentStakeEndDate * 1000);

      setHasStake(true);
      setCanClaimStake(canClaimStake);
      setCurrentStakeBalance(currentStakeBalance);
      setCurrentStakeStartDate(currentStakeStartDate);
      setCurrentStakeEndDate(currentStakeEndDate);
    };

    getStakedBalance();
  }, [account, token, staking]);

  const stakeTokens = async () => {
    setStakeInputError(null);

    const value = ethers.utils.parseUnits(stakeInput.replace(/,/ig, ''));
    setStakeInput(formatEth(weiToEth(value)));
    setToStake(value);

    if (value.isZero()) {
      setStakeInputError("No tokens available");
      return;
    }

    if (value.gt(tokenBalance)) {
      setStakeInputError("Not enough tokens available");
      return;
    }

    if (!token || !staking) {
      return;
    }

    const allowance = await token.allowance(account, process.env.REACT_APP_STAKING_ADDRESS!);

    if (value.gt(allowance)) {
      setIsApprove(true);
      try {
        const approveTx = await token.approve(process.env.REACT_APP_STAKING_ADDRESS!, value);
        await approveTx.wait(1);
      } catch (err) {
        return;
      } finally {
        setIsApprove(false);
      }
    }

    try {
      setIsStaking(true);
      const stakeTx = await staking.stake(value);
      await stakeTx.wait(1);

      setIsStaking(false);
      setIsSuccess(true);

      const newBalance = tokenBalance.sub(value);
      setTokenBalance(newBalance)
      setToStake(newBalance);
      setStakeInput(formatEth(weiToEth(newBalance)));

      const currentTimestamp = Math.ceil(new Date().getTime() / 1000);

      setHasStake(true);
      setCanClaimStake(false);
      setCurrentStakeBalance(currentStakeBalance.add(value));
      setCurrentStakeStartDate(new Date(currentTimestamp * 1000));
      setCurrentStakeEndDate(new Date((currentTimestamp + lockingPeriod.toNumber()) * 1000));
    } catch (err) {
      setIsStaking(false);
      setIsSuccess(false);
    }
  };

  const unstakeTokens = async () => {
    if (!canClaimStake) {
      setUnstakeInputError("No stake available");
      return;
    }

    if (!token || !staking) {
      return;
    }

    try {
      const unstakeTx = await staking.unstake();
      await unstakeTx.wait(1);
    } catch (err) {
      return;
    }

    const newBalance = tokenBalance.add(currentStakeBalance);
    setTokenBalance(newBalance)
    setToStake(newBalance);
    setStakeInput(formatEth(weiToEth(newBalance)));

    resetStake();
  };

  const stakeInputField = (
    <InputField
      type="text"
      className="whiteInput"
      label=""
      color="secondary"
      placeholder="Enter amount..."
      variant="outlined"
      margin="normal"
      error={stakeInputError !== null}
      helperText={stakeInputError !== null ? stakeInputError : ""}
      fullWidth
      value={stakeInput}
      onChange={(event) => setStakeInput(event.target.value)}
    />);

  const unstakeInputField = (
    <InputField
      type="text"
      className="whiteInput"
      label=""
      color="secondary"
      variant="outlined"
      margin="normal"
      error={unstakeInputError !== null}
      helperText={unstakeInputError !== null ? unstakeInputError : ""}
      disabled={true}
      fullWidth
      value={canClaimStake ? formatEth(weiToEth(currentStakeBalance)) : "0.0"}
    />);

  return (
    <>
      <div className={isMobile ? "cardContainerMobile" : "cardContainer"}>
        <BaseCard title="0.0" description="Total TARA earned" tooltip={<Tooltip className="staking-icon-tooltip" title="Total number of TARA staking rewards earned for the lifetime of the connected wallet." Icon={InfoIcon} />} />
        <BaseCard title={formatEth(roundEth(weiToEth(currentStakeBalance)))} description="Total TARA staked" tooltip={<Tooltip className="staking-icon-tooltip" title="Total number of TARA currently staked in the staking contract for connected wallet." Icon={InfoIcon} />} />
        <BaseCard title="20.0%" description="Anualized yield" tooltip={<Tooltip className="staking-icon-tooltip" title="Effective annualized yield, this could be different than the stated expected yields due to special community events. " Icon={InfoIcon} />} />
      </div>
      <div className={isMobile ? "cardContainerMobile" : "cardContainer"}>
        <DataCard title={formatEth(roundEth(weiToEth(tokenBalance)))} description="Available to Stake" label="TARA" onClickButton={() => stakeTokens()} onClickText="Stake" input={stakeInputField} tooltip={<Tooltip title="Total number of TARA currently in the connected wallet that could be staked." Icon={InfoIcon} />} />
        <DataCard title={canClaimStake ? formatEth(roundEth(weiToEth(currentStakeBalance))) : "0.0"} disabled={!canClaimStake} description="Available to Unstake" label="TARA" onClickButton={() => unstakeTokens()} onClickText="Un-stake" input={unstakeInputField} tooltip={<Tooltip title="Total number of TARA that’s currently staked but NOT locked, and can be un-staked (withdrawn) from the staking contract. " Icon={InfoIcon} />} />
        {hasStake && currentStakeEndDate !== null && <BaseCard title={formatEth(roundEth(weiToEth(currentStakeBalance)))} description={`Locked till ${currentStakeEndDate.toLocaleDateString()}`} tooltip={<Tooltip className="staking-icon-tooltip" title="" Icon={LockIcon} />} />}
      </div>
    </>
  );
}

export default Staking;