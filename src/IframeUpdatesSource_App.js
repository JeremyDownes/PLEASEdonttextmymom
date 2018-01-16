import IPChatClient from 'twilio-ip-messaging-react';
import React from 'react';
import logo from './logo.svg';
import './App.css'
//import Twilio from './Twilio.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {message: '', source: ''}
    this.source = ''
    this.changeMessage = this.changeMessage.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.path = "http://localhost:4001/"
    
  }

  changeMessage(e) {
    let thisState = this.state
    thisState.message = e.target.value
    this.setState(thisState)
  }

  handleClick() {
    let thisState = this.state
    thisState.source = this.path+'?message='+this.state.message
    this.setState(thisState)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Please Don't Text My Mom !</h1>
        </header>
        <p className="App-intro">
          <input onChange={this.changeMessage}></input>
        </p>
        <p><button onClick={this.handleClick}>Please don't click</button></p>
        <iframe src={this.state.source}></iframe>
      </div>
    );
  }
}

export default App;
