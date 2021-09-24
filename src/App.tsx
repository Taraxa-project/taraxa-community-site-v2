import { useEffect, useState } from "react";
import { useHistory, withRouter, RouteComponentProps } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { MetaMaskProvider } from "metamask-react";

import { Modal } from "@taraxa_project/taraxa-ui";

import { AuthProvider } from "./services/useAuth";

import SignIn from "./components/Modal/SignIn";
import EmailConfirmed from "./components/Modal/EmailConfirmed";
import SignUp from "./components/Modal/SignUp";
import SignUpSuccess from "./components/Modal/SignUpSuccess";
import ForgotPassword from "./components/Modal/ForgotPassword";
import ForgotPasswordSuccess from "./components/Modal/ForgotPasswordSuccess";

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';

import Home from "./pages/Home/Home";
import Staking from "./pages/Staking/Staking";
import Bounties from "./pages/Bounties/Bounties";
import Redeem from "./pages/Redeem/Redeem";
import Profile from "./pages/Profile/Profile";
import RunNode from "./pages/RunNode/RunNode";
import Wallet from "./pages/Wallet/Wallet";

import CloseIcon from './assets/icons/close';

import "./App.css";

const Root = withRouter(({ match }: RouteComponentProps) => {

  const history = useHistory();
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('sign-in');

  useEffect(() => {
    if (match.path.includes('/first-login')) {
      setModalOpen(true);
      setModalContent('email-confirmed');
    }
  }, []);

  const signIn = () => {
    setModalContent('sign-in');
    setModalOpen(!modalOpen);
  }

  const modalReset = () => {
    setModalContent('sign-in');
    setModalOpen(false);
    history.push('/');
  }

  let modalElement = <SignIn onSuccess={() => {
    setModalOpen(false);
  }} onForgotPassword={() => {
    setModalContent('forgot-password');
  }} onCreateAccount={() => {
    setModalContent('sign-up');
  }} />;

  if (modalContent === 'email-confirmed') {
    modalElement = <EmailConfirmed onSuccess={() => {
      modalReset();
    }} />;
  }

  if (modalContent === 'sign-up') {
    modalElement = <SignUp onSuccess={() => {
      setModalContent('sign-up-success');
    }} />;
  }

  if (modalContent === 'sign-up-success') {
    modalElement = <SignUpSuccess onSuccess={() => {
      modalReset();
    }} />;
  }

  if (modalContent === 'forgot-password') {
    modalElement = <ForgotPassword onSuccess={() => {
      setModalContent('forgot-password-success');
    }} />;
  }

  if (modalContent === 'forgot-password-success') {
    modalElement = <ForgotPasswordSuccess onSuccess={() => {
      modalReset();
    }} />;
  }

  return (
    <div className="App">
      <Modal
        id={isMobile ? "mobile-signinModal" : "signinModal"}
        title="Test"
        show={modalOpen}
        children={modalElement}
        parentElementID="root"
        onRequestClose={signIn}
        closeIcon={CloseIcon}
      />
      <Header signIn={signIn} />
      <div className="App-Container">
        <Sidebar signIn={signIn} />
        <div className="App-Content">
          <div className="App-Page">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/first-login" component={Home} />
              <Route exact path="/staking" component={Staking} />
              <Route exact path="/bounties" component={Bounties} />
              <Route exact path="/redeem" component={Redeem} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/node" component={RunNode} />
              <Route exact path="/wallet" component={Wallet} />
            </Switch>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
});

function App() {
  return (
    <MetaMaskProvider>
      <GoogleReCaptchaProvider reCaptchaKey="6LdLJXAaAAAAAAipA9gQ8gpbvVs6b9Jq64Lmr9dl">
        <AuthProvider>
          <BrowserRouter>
            <Root />
          </BrowserRouter>
        </AuthProvider>
      </GoogleReCaptchaProvider>
    </MetaMaskProvider>
  );
}

export default App;