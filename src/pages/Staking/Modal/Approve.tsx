import { Text, Loading } from "@taraxa_project/taraxa-ui";


interface Approve {
  amount: string;
}

const Approve = ({ amount }: Approve) => {
  return (
    <div>
      <Text label="APPROVING" variant="h6" color="primary" />
      <div className="iconContainer">
        <Loading />
      </div>
      <Text label={`Please allow the Staking contract to transfer ${amount} TARA from your account.`} variant="body2" color="primary" />
    </div>
  )
}

export default Approve;
