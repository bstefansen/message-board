import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };

  // TODO: get input to redirect to /b/general/
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/b/general/');
    const body = await response;

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();

    const response =
      await axios.get("/b/general/")
    console.log(response);
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
              value={this.state.post}
              onChange={e => this.setState({ post: e.target.value })}
              />
            <button className="button" type="submit">Submit</button>
          </form>
          <br /><br />
          <a href="board.html" >Board</a>
          <br /><br />
          <a href="thread.html" >Thread</a>
        </div>
      </div>
    );
  }
}

export default App;
