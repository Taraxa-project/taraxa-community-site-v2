import { Text, Loading } from "@taraxa_project/taraxa-ui";


interface IsStaking {
  amount: string;
}

const IsStaking = ({ amount }: IsStaking) => {
  return (
    <div>
      <Text label="STAKING" variant="h6" color="primary" />
      <div className="iconContainer">
        <Loading />
      </div>
      <Text label={`Staking ${amount} TARA from your account...`} variant="body2" color="primary" />
    </div>
  )
}

export default IsStaking;
