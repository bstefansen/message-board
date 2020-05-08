import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

class App extends Component {
  state = {
    response: '',
    response2: '',
    get: '',
    responseToGet: '',
  };

  // TODO: get input to redirect to /b/general/
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch(this.state.get);
    const body = await response;

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();

    const response =
      await axios.get(this.state.get)
    console.log(response.data);
    this.setState({ response2: response.data})
  };
  

  render() {
    return (
      <Router>
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
            <Redirect to={{ path: "/b/general/" }}>Test 2</Redirect>
            <a href="http://localhost:5000/b/general/" >Board</a>
            <br /><br />
            <Link to="/b/general/">Test</Link>
            <br /><br />
            <a href="http://localhost:5000/b/general/5eb33ead42a9c11a280ca34a" >Thread</a>
            <br /><br />
            <p>{this.state.response2}</p>
          </div>
          <div>
            <Route path="/b/general/" component={ Test }/>
          </div>
        </div>
      </Router>
      
    );
  }
}

const Test = ({ match }) => (
  <div>
    {match}
  </div>
)

export default App;
