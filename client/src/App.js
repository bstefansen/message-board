import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    get: ''
  };

  // TODO: get input to redirect to /b/general/

  handleSubmit = e => {
    e.preventDefault();
    window.location.assign("http://localhost:5000" + this.state.get)
  };

  render() {
    return (
      <div className="App">
        <h1>MERN | Message Board</h1>

        <div className="main">
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
          <br /><br />
          <a href="http://localhost:5000/b/general/">Board</a>
          <br /><br />
          <a href="http://localhost:5000/b/general/5eb33ead42a9c11a280ca34a" >Thread</a>
          <br /><br />
        </div>
      </div>
    );
  }
}

export default App;
