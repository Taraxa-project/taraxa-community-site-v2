import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import { Modal, Notification, BaseCard, IconCard, Tooltip, Text, Button } from '@taraxa_project/taraxa-ui';

import CloseIcon from '../../assets/icons/close';
import NodeIcon from '../../assets/icons/node';
import InfoIcon from '../../assets/icons/info';

import { useApi } from "../../services/useApi";

import Title from '../../components/Title/Title';

import RegisterNode from './Modal/RegisterNode';
import UpdateNode from './Modal/UpdateNode';

import './runnode.scss';

interface Node {
  id: number;
  name: string;
  ethWallet: string;
  topPosition: null | number;
  blocksProduced: number;
  lastMinedBlockDate: null | Date;
}

const RunNode = () => {
  const api = useApi();

  const [hasRegisterNodeModal, setHasRegisterNodeModal] = useState(false);
  const [hasUpdateNodeModal, setHasUpdateNodeModal] = useState(false);
  const [currentEditedNode, setCurrentEditedNode] = useState<null | Node>(null);

  const [nodes, setNodes] = useState<Node[]>([]);
  const [blocksProduced, setBlocksProduced] = useState("0");
  const [weeklyRating, setWeeklyRating] = useState("N/A");

  const getNodes = async () => {
    const data = await api.get(`/nodes?_limit=-1`, true);
    if (!data.success) {
      return;
    }
    const nodes: Node[] = data.response;

    function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
      return value !== null && value !== undefined;
    }

    const rating = Math.min(...nodes.map(node => node.topPosition).filter(notEmpty));
    const produced = nodes.map(node => node.blocksProduced).reduce((acc, blocks) => acc + blocks, 0);
    setNodes(nodes.map(node => {
      if (node.lastMinedBlockDate !== null) {
        return {
          ...node,
          lastMinedBlockDate: new Date(node.lastMinedBlockDate),
        }
      }
      return node;
    }));
    setWeeklyRating(`#${rating}`);
    setBlocksProduced(ethers.utils.commify(produced.toString()));
  }

  useEffect(() => {
    getNodes();
  }, []);

  console.log(nodes)

  const formatNodeName = (name: string) => {
    if (name.length <= 17) {
      return name;
    }
    return `${name.substr(0, 7)} ... ${name.substr(-5)}`;
  }
  const rows = nodes.map(node => {
    let className = "dot";
    if (node.lastMinedBlockDate !== null) {
      const now = new Date();
      const diff = Math.ceil((now.getTime() - node.lastMinedBlockDate.getTime()) / 1000);
      if (diff / 60 < 120) {
        className += " active";
      }
    }
    return (
      <div key={node.id}>
        <span className={className} />
        {formatNodeName(node.name === '' ? node.ethWallet : node.name)}
        <a href="#" onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.preventDefault();
          setCurrentEditedNode(node);
          setHasUpdateNodeModal(true);

        }}>e</a>
        <a href="#" onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.preventDefault();

        }}>d</a>
      </div>
    );
  });

  return (
    <div className="runnode">
      <RunNodeModal
        hasUpdateNodeModal={hasUpdateNodeModal}
        hasRegisterNodeModal={hasRegisterNodeModal}
        setHasRegisterNodeModal={setHasRegisterNodeModal}
        setHasUpdateNodeModal={setHasUpdateNodeModal}
        currentEditedNode={currentEditedNode}
        getNodes={getNodes}
      />
      <div className="runnode-content">
        <Title
          title="Running Testnet Nodes"
          subtitle="Help accelerate Taraxa’s path towards mainnet by running nodes on the testnet"
          tooltip="Test"
        />
        {nodes.length === 0 &&
          <div className="notification">
            <Notification
              title="Notice:"
              text="You aren’t running any block-producing nodes"
              variant="danger"
            />
          </div>
        }
        <div className="cardContainer">
          {nodes.length > 0 && <>
            <BaseCard title={`${nodes.length}`} description="Active nodes" />
            <BaseCard title={blocksProduced} description="Blocks produced" />
            <BaseCard title={weeklyRating} description="Weekly rating" />
          </>}
          {nodes.length === 0 && <>
            <IconCard title="Register a node" description="Register a node you’ve aleady set up."
              onClickText="Register a node" onClickButton={() => setHasRegisterNodeModal(true)} Icon={NodeIcon} tooltip={<Tooltip className="runnode-icon-tooltip" title="A registered node (which has already been setup) will automatically be delegated enough testnet tokens to participate in consensus." Icon={InfoIcon} />} />
            <IconCard title="Set up a node" description="Learn how to set up a node on Taraxa’s testnet."
              onClickText="Set up a node" onClickButton={() => {
                window.open('https://docs.taraxa.io/node-setup/testnet_node_setup', '_blank')
              }} Icon={NodeIcon} />
          </>}
        </div>
        {nodes.length > 0 &&
          <div className="box">
            <Text label="Active Nodes" variant="h6" color="primary" className="box-title" />
            <div className="box-list">
              {[0, 1, 2].map(col => {
                const l = col * 4;
                const r = rows.slice(l, l + 4);
                return (<div key={col} className="box-list-col">{r}</div>);
              })}
            </div>
            <Button label="Register a new node" color="secondary" variant="contained" onClick={() => setHasRegisterNodeModal(true)} />
          </div>}

        <div className="box">
          <Text label="References" variant="h6" color="primary" className="box-title" />
          <Button label="How to setup a node" className="referenceButton" variant="contained" onClick={() => console.log('go to')} />
          <Button label="How to find my node" variant="contained" className="referenceButton" onClick={() => console.log('go to')} />
          <Button label="How to receive delegation" className="referenceButton" variant="contained" onClick={() => console.log('go to')} />
          <Button label="What rewards are there" className="referenceButton" variant="contained" onClick={() => console.log('go to')} />
        </div>
      </div>
    </div>
  );
}

interface RunNodeModalProps {
  hasRegisterNodeModal: boolean;
  setHasRegisterNodeModal: (hasRegisterNodeModal: boolean) => void;
  hasUpdateNodeModal: boolean;
  setHasUpdateNodeModal: (hasUpdateNodeModal: boolean) => void;
  getNodes: () => void;
  currentEditedNode: null | Node;
}

const RunNodeModal = ({ hasRegisterNodeModal, hasUpdateNodeModal, setHasRegisterNodeModal, setHasUpdateNodeModal, getNodes, currentEditedNode }: RunNodeModalProps) => {
  let modal;

  if (hasRegisterNodeModal) {
    modal = <RegisterNode onSuccess={() => {
      getNodes();
      setHasRegisterNodeModal(false);
    }} />;
  }

  if (hasUpdateNodeModal && currentEditedNode !== null) {
    modal = <UpdateNode
      id={currentEditedNode.id}
      name={currentEditedNode.name}
      onSuccess={() => {
        getNodes();
        setHasUpdateNodeModal(false);
      }} />;
  }

  if (!modal) {
    return null;
  }

  return (
    <Modal
      id="signinModal"
      title="Register Node"
      show={hasRegisterNodeModal || hasUpdateNodeModal}
      children={modal}
      parentElementID="root"
      onRequestClose={() => {
        setHasRegisterNodeModal(false);
        setHasUpdateNodeModal(false);
      }}
      closeIcon={CloseIcon}
    />
  );
}

export default RunNode;
