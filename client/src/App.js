import React from 'react';
import './App.css';
import Round from './Round'
import {round_one} from './Challenge'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <Round challenge = {round_one}/>
        <div>
          <p>
            Please press the button for color the boxes<br/>
            You win if all the boxes turn <span style={{color:"#fddb3a"}}>yellow</span>
          </p>
        </div>
      </header>
    </div>
  );
}
export default App;
