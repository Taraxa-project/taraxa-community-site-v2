import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { MetaMaskProvider } from "metamask-react";
import { useMediaQuery } from 'react-responsive';

import { AuthProvider } from "./services/useAuth";
import { ModalProvider, useModal } from "./services/useModal";
import { SidebarProvider } from "./services/useSidebar";

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

import './App.scss';

const Root = () => {

  const { modal } = useModal();
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  let appClassName = 'App';

  if (isMobile) {
    appClassName += ' App-mobile';
  }

  return (
    <div className={appClassName}>
      {modal}
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
              <SidebarProvider>
                <Root />
              </SidebarProvider>
            </ModalProvider>
          </BrowserRouter>
        </AuthProvider>
      </GoogleReCaptchaProvider>
    </MetaMaskProvider>
  );
}

export default App;