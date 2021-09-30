import { useMediaQuery } from 'react-responsive';
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { MetaMaskProvider } from "metamask-react";

import { Modal } from "@taraxa_project/taraxa-ui";

import { AuthProvider } from "./services/useAuth";
import { ModalProvider, useModal } from "./services/useModal";

import SignIn from "./components/Modal/SignIn";
import EmailConfirmed from "./components/Modal/EmailConfirmed";
import SignUp from "./components/Modal/SignUp";
import SignUpSuccess from "./components/Modal/SignUpSuccess";
import ForgotPassword from "./components/Modal/ForgotPassword";
import ForgotPasswordSuccess from "./components/Modal/ForgotPasswordSuccess";
import ResetPassword from "./components/Modal/ResetPassword";

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

const Root = () => {

  const { isOpen, setIsOpen, content, setContent, code, reset } = useModal();
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  let modalElement = <SignIn onSuccess={() => {
    setIsOpen!(false);
  }} onForgotPassword={() => {
    setContent!('forgot-password');
  }} onCreateAccount={() => {
    setContent!('sign-up');
  }} />;

  if (content === 'email-confirmed') {
    modalElement = <EmailConfirmed onSuccess={() => {
      reset!();
    }} />;
  }

  if (content === 'sign-up') {
    modalElement = <SignUp onSuccess={() => {
      setContent!('sign-up-success');
    }} />;
  }

  if (content === 'sign-up-success') {
    modalElement = <SignUpSuccess onSuccess={() => {
      reset!();
    }} />;
  }

  if (content === 'forgot-password') {
    modalElement = <ForgotPassword onSuccess={() => {
      setContent!('forgot-password-success');
    }} />;
  }

  if (content === 'forgot-password-success') {
    modalElement = <ForgotPasswordSuccess onSuccess={() => {
      reset!();
    }} />;
  }

  if (content === 'reset-password') {
    modalElement = <ResetPassword
      code={code}
      onSuccess={() => {
        reset!();
      }}
    />;
  }

  return (
    <div className="App">
      <Modal
        id={isMobile ? "mobile-signinModal" : "signinModal"}
        title="Test"
        show={isOpen}
        children={modalElement}
        parentElementID="root"
        onRequestClose={reset!}
        closeIcon={CloseIcon}
      />
      <Header />
      <div className="App-Container">
        <Sidebar />
        <div className="App-Content">
          <div className="App-Page">
            <Switch>
              <Route exact path="/first-login" component={Home} />
              <Route exact path="/reset-password/:code" component={Home} />
              <Route exact path="/staking" component={Staking} />
              <Route exact path="/bounties" component={Bounties} />
              <Route exact path="/redeem" component={Redeem} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/node" component={RunNode} />
              <Route exact path="/wallet" component={Wallet} />
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <MetaMaskProvider>
      <GoogleReCaptchaProvider reCaptchaKey="6LdLJXAaAAAAAAipA9gQ8gpbvVs6b9Jq64Lmr9dl">
        <AuthProvider>
          <BrowserRouter>
            <ModalProvider>
              <Root />
            </ModalProvider>
          </BrowserRouter>
        </AuthProvider>
      </GoogleReCaptchaProvider>
    </MetaMaskProvider>
  );
}

export default App;