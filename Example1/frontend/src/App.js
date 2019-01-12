import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      endpoint: "http://localhost:4001" 
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
      <div style={{ textAlign: "center" }}>
        <button onClick={() => this.send()}>test</button>
      </div>
    )
  }
}

export default App