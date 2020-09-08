import React from 'react';
import './App.css';
import Round from './Round'
import {round_one} from './Challenge'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Round challenge = {round_one}/>
      </header>
    </div>
  );
}
export default App;
