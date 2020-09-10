import React from 'react';
import './App.css';
import Round from './Round'
import {round_one} from './Challenge'

function App() {
  const [countDown, setCountDown] = React.useState(10);

  return (
    <div className="App">
      <header className="App-header">
        
        <Round challenge = {round_one} 
               countDown= {() => setCountDown(countDown - 1)}
               countDownValue = {countDown}
        />
        <div>
          <p>
            Please press the button for color the boxes<br/>
            You win if all the boxes turn <span style={{color:"#fddb3a"}}>yellow</span><br/>
            Number of presses remaining {countDown} <br/>
            {countDown < 0 && <p>You Lose 🙂</p>}
          </p>
        </div>
      </header>
    </div>
  );
}
export default App;
