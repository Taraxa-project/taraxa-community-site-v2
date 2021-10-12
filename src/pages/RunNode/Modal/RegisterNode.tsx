import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Text, InputField } from "@taraxa_project/taraxa-ui";
import Modal from "../../../components/Modal/Modal"

import { useApi } from "../../../services/useApi"

type RegisterNodeProps = {
  onSuccess: () => void,
}

const RegisterNode = ({ onSuccess }: RegisterNodeProps) => {
  const history = useHistory();
  const api = useApi();

  const [nodePublicAddress, setNodePublicAddress] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  const submit = async (event: React.MouseEvent<HTMLElement> | React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(undefined);

    const result = await api.post(`/nodes`, { ethWallet: nodePublicAddress }, true);
    if (result.success) {
      onSuccess();
      return;
    }

    setError(typeof result.response === "string" ? result.response : undefined);
  }

  const onClose = () => {
    history.push('/');
  }

  return (
    <Modal title={'Register a node'} onClose={onClose} />
  )

  /*return (
    <div>
      <Modal title={'Register a node'} onClose={onClose} />

      <form onSubmit={submit}>
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
          type="submit"
          label="Submit"
          color="secondary"
          variant="contained"
          className="marginButton"
          onClick={submit}
          fullWidth
        />
      </form>

      <Text style={{ margin: '5% 0' }} label="References:" variant="body1" color="primary" />

      <Button
        label="How to find my node's address"
        variant="outlined"
        color="secondary"
        className="node-control-reference-button"
        onClick={() => window.open(`https://docs.taraxa.io/node-setup/node_address`, '_blank', 'noreferrer noopener')}
        fullWidth={true}
      />
    </div>
  )*/
}

export default RegisterNode;
