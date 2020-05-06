import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>MERN | Message Board</h1>

      <div className="main">
        <h3>Search for a message board</h3> <br />
        <form>
          <input className="input" placeholder="/b/general"/>
          <button className="input" style={{width: "5%"}}>Submit</button>
        </form>
        <br /><br />
        <a href="board.html" >Board</a>
        <br /><br />
        <a href="thread.html" >Thread</a>
      </div>
    </div>
  );
}

export default App;
