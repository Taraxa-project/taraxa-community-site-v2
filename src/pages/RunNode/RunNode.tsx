import { useEffect, useRef, useState } from 'react';
import { BaseCard, Button, IconCard, InputField, Modal, Table, Text, Tooltip } from '@taraxa_project/taraxa-ui';
import NodeIcon from '../../assets/icons/node';
import { useHistory } from "react-router-dom";
import './runnode.scss';
import { useMediaQuery } from 'react-responsive';
import { useGlobalState } from 'state-pool';
import InfoIcon from '../../assets/icons/info';
import CloseIcon from '../../assets/icons/close';

let activeNodes = true;

const RunNode = () => {
  const history = useHistory();
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const [toggleValue, setToggleValue] = useState('earn');
  const [sidebarOpened, updateSidebarOpened] = useGlobalState("sidebarOpened");
  const [registerNodeModal, setRegisterNodeModal] = useState(false);
  const [nodePublicAddress, setNodePublicAddress] = useState('');

  const columns = [
    { path: "node", name: "node" },
    { path: "senderWallet", name: "senderWallet" },
    { path: "receiverWallet", name: "receiverWallet" },
  ];

  const rows = [
    { data: [{ node: <><span className="dot" />Bob’s node #1</>, senderWallet: <><span className="dot" />0xe08c0 ... 29b34</>, receiverWallet: <><span className="dot" />0xe08c0 ... 29b34</> }] },
    { data: [{ node: <><span className="dot" />Bob’s node #1</>, senderWallet: <><span className="dot" />0xe08c0 ... 29b34</>, receiverWallet: <><span className="dot" />0xe08c0 ... 29b34</> }] },
    { data: [{ node: <><span className="dot" />Bob’s node #1</>, senderWallet: <><span className="dot" />0xe08c0 ... 29b34</>, receiverWallet: <><span className="dot" />0xe08c0 ... 29b34</> }] },
    { data: [{ node: <><span className="dot" />Bob’s node #1</>, senderWallet: <><span className="dot" />0xe08c0 ... 29b34</>, receiverWallet: <><span className="dot" />0xe08c0 ... 29b34</> }] },
    { data: [{ node: <><span className="dot" />Bob’s node #1</>, senderWallet: <><span className="dot" />0xe08c0 ... 29b34</>, receiverWallet: <><span className="dot" />0xe08c0 ... 29b34</> }] },
    { data: [{ node: <><span className="dot" />Bob’s node #1</>, senderWallet: <><span className="dot" />0xe08c0 ... 29b34</>, receiverWallet: <><span className="dot" />0xe08c0 ... 29b34</> }] }];

  const onChangeToggle = (event: object, value: any) => {
    setToggleValue(value);
  }

  const modalTrigger = () => {
    setRegisterNodeModal(!registerNodeModal);
  }

  const nodePublicAddressTrigger = (e: any) => {
    setNodePublicAddress(e.target.value);
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

  const modalNode =
    <div>
      <Text style={{ marginBottom: '2%' }} label="Register a node" variant="h6" color="primary" />

      <InputField label="Node public address" value={nodePublicAddress} variant="outlined" type="text" fullWidth onChange={nodePublicAddressTrigger} margin="normal" />

      <Button label="Submit" color="secondary" variant="contained" onClick={() => console.log('submited')} fullWidth className="marginButton" />

      <Text style={{ margin: '5% 0' }} label="References:" variant="body1" color="primary" />
      <Button label="How to find my node's address" variant="contained" className="node-control-reference-button" onClick={() => console.log('go to')} />
    </div>

  return (
    <div className={isMobile ? "runnode-mobile" : "runnode"}>
      <Modal id="signinModal" title="Submit KYC" show={registerNodeModal} children={modalNode} parentElementID="root" onRequestClose={modalTrigger} closeIcon={CloseIcon} />
      <div className="runnode-content">
        <div className="runnode-icon-container">
          <Text label="Running Testnet Nodes" variant="h4" color="primary" className="runnode-title" />
          <Tooltip className={isMobile ? "mobile-runnode-icon-tooltip" : "runnode-icon-tooltip"} title="Test" Icon={InfoIcon} />
        </div>

        <Text label="Help accelerate Taraxa’s path towards mainnet by running nodes on the testnet" variant="body2" color="textSecondary" className={isMobile ? "mobile-runnode-subtitle" : "runnode-subtitle"} />

        {!activeNodes &&
          <div className={isMobile ? "mobile-runnode-red-stripe" : "runnode-red-stripe"}>
            <Text label="Notice:" variant="body1" color="primary" className="runnode-title" />
            <Text label="You aren’t running any block-producing nodes" variant="body2" color="primary" className="runnode-subtitle" />
          </div>
        }
        <div className={isMobile ? "mobileCardContainer" : "cardContainer"}>
          {activeNodes ?
            <>
              <BaseCard title="11" description="Active nodes" id="mobileBasicCard" />
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

        {activeNodes &&
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
