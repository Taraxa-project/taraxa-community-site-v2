import { Button, Text } from "@taraxa_project/taraxa-ui";
import SuccessIcon from '../../../assets/icons/success';
import LockIcon from './../../../assets/icons/lock';


interface StakingSuccess {
  lockingPeriod: string;
  onSuccess: () => void;
}

const StakingSuccess = ({ lockingPeriod, onSuccess }: StakingSuccess) => {
  return (
    <div>
      <Text label="SUCCESS" variant="h6" color="primary" />
      <div className="iconContainer">
        <SuccessIcon />
      </div>
      <Text label={`Your TARA has been successfully transferred to the staking contract. View Etherscan`} variant="body2" color="primary" />

      <div className="staking-success-container">
        <Text label="Please keep in mind:" className="title" />
        <div className="lock-container">
          <LockIcon />
          <Text className="lock-container-text" label={`Lock-in period: ${lockingPeriod}`} color="primary" />
        </div>
        <Text label={`After ${lockingPeriod} you will be able to withdraw your TARA (If you don’t withdraw, your funds remain staked and unlocked). View full staking rules`} color="textSecondary" />
      </div>
      <Button className="staking-success-button" label="OK" color="secondary" variant="contained" fullWidth onClick={onSuccess} />
    </div>
  )
}

export default StakingSuccess;
