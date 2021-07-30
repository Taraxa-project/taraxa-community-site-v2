import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Title } from "taraxa-ui";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {<Title label="Test" variant="h4" color="textPrimary"/>}
        {<Button label="Test" variant="contained"/>}
      </header>
    </div>
  );
}

export default App;
