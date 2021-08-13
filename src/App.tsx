import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Home from './pages/Home/Home';
import Staking from './pages/Staking/Staking';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/staking">
            <Staking />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
