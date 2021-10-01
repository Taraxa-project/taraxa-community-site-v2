import { useState } from "react";
import { Button, Text, InputField } from "@taraxa_project/taraxa-ui";

import { useApi } from "../../../services/useApi"

type UpdateNodeProps = {
  id: number,
  name: string,
  onSuccess: () => void,
}

const UpdateNode = ({ id, name, onSuccess }: UpdateNodeProps) => {
  const api = useApi();

  const [nodeName, setNodeName] = useState(name);
  const [error, setError] = useState<string | undefined>(undefined);

  return (
    <div>
      <Text style={{ marginBottom: '2%' }} label="Update node" variant="h6" color="primary" />
      <InputField
        label="Node name"
        error={error !== undefined}
        helperText={error}
        value={nodeName}
        variant="outlined"
        type="text"
        fullWidth
        margin="normal"
        onChange={event => {
          setNodeName(event.target.value);
        }}
      />
      <Button
        label="Save"
        color="secondary"
        variant="contained"
        onClick={async () => {
          setError(undefined);

          const result = await api.put(`/nodes/${id}`, { name: nodeName }, true);
          if (result.success) {
            onSuccess();
            return;
          }

          setError(typeof result.response === "string" ? result.response : undefined);
        }}
        fullWidth
        className="marginButton"
      />
    </div>
  )
}

export default UpdateNode;
