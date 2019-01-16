import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { Message } from "./Components/message/message";
import { User } from "./Components/user/user";
import ComposeMessage from "./Components/ComposeMessage/ComposeMessage";

const socket = socketIOClient('http://localhost:3030');
// why multiple definitions
class App extends Component {
  //socket = socketIOClient(this.state.endpoint);
  constructor() {
    super();

    this.state = {
      endpoint: "http://localhost:3030",
      messages: [
        { id: 1, author: "Omar Moataz", msg: "Hi", img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg", time: "now" },
        { id: 2, author: "Omar Moataz", msg: "How are you?", img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg", time: "now" },
        { id: 3, author: "Omar Moataz", msg: "I'm good", img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg", time: "now" }
      ]
    };
  }

  // send = (msg) => {
  //   const socket = socketIOClient(this.state.endpoint);

  //   socket.emit("broadcast", msg);
  // };

  

  handleSubmit = (msg) => {
    this.setState(prevState => ({
      messages: [...prevState.messages, { msg }]
    }))
    socket.emit("send-message", {msg})
  }

  makeName() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 2; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  componentDidMount() {

    this.setState({ img: `https://ui-avatars.com/api/?name=${this.makeName()}`})

    socket.on("send-message", (msg) => {
      this.setState(prevState => ({
        messages: [...prevState.messages,  msg ]
      }))
    });    
    socket.on("msg", msg => {
      this.setState(prevState => ({
        messages: [...prevState.messages, { msg }]
      }))
    });

    console.log(this.state);
  }

  render() {
    ///const socket = socketIOClient(this.state.endpoint);

    

    return (
      <div>
        <div className={"chat"}>
          <User
            img={this.state.img}
            location="Cairo"
            name="Omar Moataz"
          />
          <div className={"messages"}>
            <div className={"messages-content"}>
              {this.state.messages.map(message => <Message key={`${message.id}${Math.random()}`} img={message.img} author={message.author} msg={message.msg} time={message.time} />)}
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
