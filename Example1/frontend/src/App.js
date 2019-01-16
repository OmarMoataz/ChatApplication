import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { Message } from "./Components/message/message";
import { User } from "./Components/user/user";
import ComposeMessage from "./Components/ComposeMessage/ComposeMessage";

class App extends Component {
  constructor() {
    super();

    this.state = {
      endpoint: "http://localhost:3030",
      messages: [
        { id:1, author: "Omar Moataz", msg:"Hi", img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg", time: "now"},
        { id:2, author: "Omar Moataz", msg:"How are you?", img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg", time: "now" },
        { id:3, author: "Omar Moataz", msg:"I'm good", img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg", time: "now" }
      ]
    };
  }

  send = () => {
    const socket = socketIOClient(this.state.endpoint);

    socket.emit("test", "test");
  };

  handleSubmit(message) {
    console.log(message);
    // this.setState({
    //   messages: [...this.state.messages, message]
    // })
    // const messages = this.state.messages.slice();
    // messages.push(message);
    // this.setState({messages});
    
    // this.setState({
    //   messages: this.state.messages.concat(message)
    // })
  }

  render() {
    const socket = socketIOClient(this.state.endpoint);

    socket.on("msg", msg => {
      console.log(`received msg ${msg}`);
    });

    return (
      <div>
        <div className={"chat"}>
          <User
            img="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg"
            location="Cairo"
            name="Omar Moataz"
          />
          <div className={"messages"}>
            <div className={"messages-content"}>
              {this.state.messages.map(message => <Message key={message.id} img={message.img} author={message.author} msg={message.msg} time={message.time}/>)}
            </div>
          </div>
          <ComposeMessage onSubmit={this.handleSubmit} />
        </div>
        <div className={"bg"} />
      </div>
    );
  }
}

export default App;
