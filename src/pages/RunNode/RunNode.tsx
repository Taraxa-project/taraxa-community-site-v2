import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useGlobalState } from 'state-pool';

import { BaseCard, Button, IconCard, Modal, Table, Text, Tooltip } from '@taraxa_project/taraxa-ui';

import NodeIcon from '../../assets/icons/node';
import InfoIcon from '../../assets/icons/info';
import CloseIcon from '../../assets/icons/close';

import RegisterNode from './RegisterNode';

import { useApi } from "../../services/useApi";

import './runnode.scss';

interface Node {
  id: number;
  ethWallet: string;
  created_at: Date;
  published_at: Date;
  updated_at: Date;
}


const RunNode = () => {
  const api = useApi();

  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const [sidebarOpened, updateSidebarOpened] = useGlobalState("sidebarOpened");
  const [registerNodeModal, setRegisterNodeModal] = useState(false);

  const [hasActiveNodes, setHasActiveNodes] = useState(false);
  const [nodes, setNodes] = useState<Node[]>([]);

  useEffect(() => {
    const getNodes = async () => {
      const data = await api.get(`/nodes?_limit=-1`, true);
      if (!data.success) {
        return;
      }
      setHasActiveNodes(data.response.length > 0);
      setNodes(data.response);
    }
    getNodes();
  }, []);

  const columns = [
    { path: "name", name: "name" },
    { path: "node", name: "node" },
  ];


  const rows = nodes.map(node => ({
    data: [
      {
        name: <><span className="dot" />{node.ethWallet}</>,
        node: <>{node.ethWallet}</>
      }
    ]
  }));

  const modalTrigger = () => {
    setRegisterNodeModal(!registerNodeModal);
  }

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          updateSidebarOpened(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const registerModal = (
    <RegisterNode onSuccess={(address: string) => {
      console.log(address)
    }} />
  );
  return (
    <div className={isMobile ? "runnode-mobile" : "runnode"}>
      <Modal id="signinModal" title="Submit KYC" show={registerNodeModal} children={registerModal} parentElementID="root" onRequestClose={modalTrigger} closeIcon={CloseIcon} />
      <div className="runnode-content">
        <div className="runnode-icon-container">
          <Text label="Running Testnet Nodes" variant="h4" color="primary" className="runnode-title" />
          <Tooltip className={isMobile ? "mobile-runnode-icon-tooltip" : "runnode-icon-tooltip"} title="Test" Icon={InfoIcon} />
        </div>

        <Text label="Help accelerate Taraxa’s path towards mainnet by running nodes on the testnet" variant="body2" color="textSecondary" className={isMobile ? "mobile-runnode-subtitle" : "runnode-subtitle"} />

        {!hasActiveNodes &&
          <div className={isMobile ? "mobile-runnode-red-stripe" : "runnode-red-stripe"}>
            <Text label="Notice:" variant="body1" color="primary" className="runnode-title" />
            <Text label="You aren’t running any block-producing nodes" variant="body2" color="primary" className="runnode-subtitle" />
          </div>
        }
        <div className={isMobile ? "mobileCardContainer" : "cardContainer"}>
          {hasActiveNodes ?
            <>
              <BaseCard title={`${nodes.length}`} description="Active nodes" id="mobileBasicCard" />
              <BaseCard title="3,238" description="Blocks produced" id="mobileBasicCard" />
              <BaseCard title="#16" description="Weekly rating" id="mobileBasicCard" />
            </>
            :
            <>
              <IconCard title="Register a node" description="Register a node you’ve aleady set up."
                onClickText="Register a node" onClickButton={() => setRegisterNodeModal(true)} Icon={NodeIcon} tooltip={<Tooltip className="runnode-icon-tooltip" title="A registered node (which has already been setup) will automatically be delegated enough testnet tokens to participate in consensus." Icon={InfoIcon} />} />
              <IconCard title="Set up a node" description="Learn how to set up a node on Taraxa’s testnet."
                onClickText="Set up a node" onClickButton={() => console.log("here")} Icon={NodeIcon} />
            </>
          }
        </div>

        {hasActiveNodes &&
          <div className={isMobile ? "mobileReferenceContainer" : "referenceContainer"}>
            <Text id={isMobile ? "mobileReferenceText" : "referenceText"} label="Active Nodes" variant="h6" color="primary" />

            <Table columns={columns} rows={rows} />
            <Button label="Register a new node" className="node-control-button" color="secondary" variant="contained" onClick={() => setRegisterNodeModal(true)} />
          </div>
        }

        <div className={isMobile ? "mobileReferenceContainer" : "referenceContainer"}>
          <Text id={isMobile ? "mobileReferenceText" : "referenceText"} label="References" variant="h6" color="primary" />
          {isMobile ?
            <div className="mobileReferencesButtonContainer">
              <Button label="How to setup a node" className="referenceButton" variant="contained" onClick={() => console.log('go to')} />
              <Button label="How to find my node" variant="contained" className="referenceButton" onClick={() => console.log('go to')} />
              <Button label="How to receive delegation" className="referenceButton" variant="contained" onClick={() => console.log('go to')} />
              <Button label="What rewards are there" className="referenceButton" variant="contained" onClick={() => console.log('go to')} />
            </div>
            :
            <>
              <div className="referencesButtonContainer">
                <Button label="How to setup a node" className="referenceButton" variant="contained" onClick={() => console.log('go to')} />
                <Button label="How to find my node" variant="contained" className="referenceButton" onClick={() => console.log('go to')} />
              </div>
              <div className="bottomReferencesButtonContainer">
                <Button label="How to receive delegation" className="referenceButton" variant="contained" onClick={() => console.log('go to')} />
                <Button label="What rewards are there" className="referenceButton" variant="contained" onClick={() => console.log('go to')} />
              </div>
            </>
          }

        </div>

      </div>
    </div>
  )
}

export default RunNode;
