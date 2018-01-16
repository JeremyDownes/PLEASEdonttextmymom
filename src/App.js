import React from 'react';
import logo from './logo.png';
import './App.css'
import Twilio from './Twilio.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {message: '', conversation: []}
    this.source = ''
    this.changeMessage = this.changeMessage.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.path = "https://.ngrok.io/"
    this. getUpdate = this.getUpdate.bind(this)
    this.lastUpdate = ''
  }

  changeMessage(e) {
    let thisState = this.state
    thisState.message = e.target.value
    this.setState(thisState)
  }

  async handleClick() {
    let thisState = this.state
    let remark = await Twilio.post(this.path+'?message='+this.state.message)
    thisState.conversation.push({client: remark})
    this.setState(thisState)
  }

  componentDidMount() {
   setInterval(this.getUpdate, 5000)
 }

 async getUpdate() {
    let thisState = this.state
    let response = await Twilio.update(this.path+'update/')
    if (response) {
      if (response !== this.lastUpdate) {
        thisState.conversation.push({agent: response})
        this.setState(thisState)
        this.lastUpdate = response
      }
    }
 }

 agentOrClient(obj) {
  if (obj.hasOwnProperty('client')) {
    return 'client'
  } else {
    return 'agent'
  }
 }

 translateAXC(aXc) {
  if(aXc==='agent') {
    return 'Mom: '
  }
    return "You: "
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
        <ul>
          {
            this.state.conversation.map((remark)=> {
              let aXc = this.agentOrClient(remark)
            return <li className={aXc}> {this.translateAXC(aXc)+remark[aXc]} </li>})
          }
        </ul>
      </div>
    );
  }
}

export default App;
