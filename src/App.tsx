import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import logo from './logo.svg';
import './App.css';

import Home from './pages/Home/Home';
import Staking from './pages/Staking/Staking';
import Bounties from './pages/Bounties/Bounties';
import Redeem from './pages/Redeem/Redeem';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/staking" component={Staking} />
            <Route exact path="/bounties" component={Bounties} />
            <Route exact path="/redeem" component={Redeem} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
