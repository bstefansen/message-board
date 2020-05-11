import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    get: ''
  };
  
  handleSubmit = e => {
    e.preventDefault();
    window.location.assign(window.location.protocol + "//" + window.location.hostname + ":5000" + this.state.get)
  };

  render() {
    return (
      <div className="App">
        <h1>MERN | Message Board</h1>

        <div className="main" onload={this.setHref}>
          <h3>Search for a message board</h3> <br />
          <form onSubmit={this.handleSubmit}>
            <input
              className="input"
              placeholder="/b/general/"
              type="text"
              value={this.state.get}
              onChange={e => this.setState({ get: e.target.value })}
              />
            <button className="button" type="submit">Submit</button>
          </form>
        </div>

        <footer>
          <a href="https://bstefansen.github.io/Portfolio/" target="_blank" style={{textDecoration: "none"}}>© 2020, Blake Stefansen</a>
        </footer>
      </div>
    );
  }
}

export default App;
