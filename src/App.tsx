import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { MetaMaskProvider } from "metamask-react";
import { AuthProvider } from "./services/useAuth";

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

import "./App.css";

function App() {
  return (
    <MetaMaskProvider>
      <GoogleReCaptchaProvider reCaptchaKey="6LdLJXAaAAAAAAipA9gQ8gpbvVs6b9Jq64Lmr9dl">
        <AuthProvider>
          <BrowserRouter>
            <div className="App">
              <Header />
              <div className="App-Container">
                <Sidebar />
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
          </BrowserRouter>
        </AuthProvider>
      </GoogleReCaptchaProvider>
    </MetaMaskProvider>
  );
}

export default App;
