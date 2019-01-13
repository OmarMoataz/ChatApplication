import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { Message } from './Components/message/message';

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      endpoint: "http://localhost:3030" 
    }
  }
  
  send = () => {
    const socket = socketIOClient(this.state.endpoint);

    
    socket.emit('test', 'test');
  }
  
  render() {
    const socket = socketIOClient(this.state.endpoint);
    
    socket.on('msg', (msg) => {
      console.log(`received msg ${msg}`);
    })
     
    return (
      <div>
      <div className={"chat"}>
  <div className={"chat-title"}>
    <h1>Fabio Ottaviani</h1>
    <h2>Supah</h2>
    <figure className={"avatar"}>
      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" alt="" /></figure>
  </div>
  <div className={"messages"}>
    <div className={"messages-content"}>
      <Message author="a" msg="test" img="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" time="now" />
    </div>
  </div>
  <div className={"message-box"}>
    <textarea type="text" className={"message-input"} placeholder="Type message..."></textarea>
    <button type="submit" className={"message-submit"}>Send</button>
  </div>

  </div>
  <div className={"bg"}></div>
  </div>
    )
  }
}

export default App