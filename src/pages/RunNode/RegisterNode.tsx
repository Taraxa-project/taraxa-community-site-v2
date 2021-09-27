import { useState } from "react";
import { Button, Text, InputField } from "@taraxa_project/taraxa-ui";

import { useApi } from "../../services/useApi"

type RegisterNode = {
  onSuccess: (address: string) => void,
}

const RegisterNode = ({ onSuccess }: RegisterNode) => {
  const api = useApi();

  const [nodePublicAddress, setNodePublicAddress] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  return (
    <div>
      <Text style={{ marginBottom: '2%' }} label="Register a node" variant="h6" color="primary" />

      <InputField
        label="Node public address"
        error={error !== undefined}
        helperText={error}
        value={nodePublicAddress}
        variant="outlined"
        type="text"
        fullWidth
        margin="normal"
        onChange={event => {
          setNodePublicAddress(event.target.value);
        }}
      />
      <Button
        label="Submit"
        color="secondary"
        variant="contained"
        onClick={async () => {
          setError(undefined);

          const result = await api.post(`/nodes`, { ethWallet: nodePublicAddress }, true);
          if (result.success) {
            onSuccess(nodePublicAddress);
            return;
          }

          setError(typeof result.response === "string" ? result.response : undefined);
        }}
        fullWidth
        className="marginButton"
      />

      <Text style={{ margin: '5% 0' }} label="References:" variant="body1" color="primary" />

      <Button
        label="How to find my node's address"
        variant="contained"
        className="node-control-reference-button"
        onClick={() => console.log('go to')}
      />
    </div>
  )
}

export default RegisterNode;
