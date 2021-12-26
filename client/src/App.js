import React from 'react';
import './App.css';
import Round from './Round'
import { Button } from './styled'
import { useMetaMask } from "metamask-react";
import useContract from './hooks/useContract';

function PlayGame({ contract }) {
  const [countDown, setCountDown] = React.useState(9);
  const [win, setWin] = React.useState(false);
  const [game, setGame] =React.useState(undefined);
  const [result, setResult] = React.useState([]);
  const [card, setCard] = React.useState(undefined);
  function array2str(arr){
    var str = "";
    for(let i = 0; i <arr.length; i++){
    str += arr[i];
    }
    return str;
  }
  const submit = async () => {
    try{
      await contract.submit(array2str(result));
    }
    catch(e){
      alert(e.message);
    }
 
  }
  const getGame = async() => {
    let _game = await contract?.play();
    setGame(JSON.parse(_game));
  }
  React.useEffect(() => {
    getGame();
  },[])
  const getCard = async() => {
    try{
      let card = await contract.getCard();
      setCard(card);
    }
    catch(e) {
      alert(e.message);
    }
  }
  return (
    <>
      {game && !card && <Round 
        challenge={game}
        countDown={() => setCountDown(countDown - 1)}
        countDownValue={countDown}
        setWin={setWin}
        getCard={getCard}
        submit={submit}
        setResult={setResult}
        result={result}
      />}
      {card && <span style={{ color: "#fddb3a" }}>{card}</span>}
      <div>
        {!win && <p style={{ maxWidth: "21rem" }}>
          You win (Viettel - 100.000 VND) if all the boxes turn <span style={{ color: "#fddb3a" }}>yellow</span><br />
          Number of presses remaining {countDown} <br />
          {countDown < 0 && <p>You Lose 🙂</p>}
          <a href="https://hoan-do.gitbook.io/whitepaper/" style={{ color: "white" }}>Whitepaper</a>
        </p>}
      </div>
    </>
  )
}
function Vote({ contract, minimal, player }) {
  const [loading, setLoading] = React.useState(false);
  const register = async() => {
    setLoading(true);
    try{
      await contract.applyNow();
      alert("Apply successed, please waiting for transaction complete");
      setLoading(false);
    }
    catch(e){
      alert(e.message);
      setLoading(false);
    }
   
  }
  return (
    <>
      <div>The winner will get a phone card</div>
      <div style={{ marginBottom: "1rem" }}>Need <span style={{ fontWeight: "bold" }}>{minimal - player}</span> players to start</div>
      {!loading && <Button style={{ marginBottom: "1rem" }} onClick={register}>Apply Now 🤑 </Button>}
      {loading && <span>Loading...</span>}
      <a href="https://hoan-do.gitbook.io/whitepaper/" style={{ color: "white", fontSize: "14px" }}>Whitepaper</a>
    </>
  )
}
function App() {
  const { status, connect, account } = useMetaMask();
  const { data, contract } = useContract();
  return (
    <div className="App">
      <header className="App-header">
        {status === "unavailable" && <div>MetaMask not available 😰 please read <a href="https://hoan-do.gitbook.io/whitepaper/" style={{ color: "white" }}>Whitepaper</a></div>}
        {status === "notConnected" && <Button onClick={connect}>Connect</Button>}
        {status === "connecting" && <div>Connecting...</div>}
        {status === "connected" && !data.paused && <PlayGame contract={contract}/>}

        {status === "connected" && data.paused &&
          <Vote contract={contract} minimal={data?.minimal} player={data?.players} />}
      </header>
    </div>
  );
}
export default App;
