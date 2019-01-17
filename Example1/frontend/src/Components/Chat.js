import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { Message } from "./message/message";
import { User } from "./user/user";
import ComposeMessage from "./ComposeMessage/ComposeMessage";


class Chat extends Component {
    socket;
  constructor(params) {
    super();
    this.socket = socketIOClient(`http://localhost:3030/`);
    this.state = {
      //endpoint: "http://localhost:3030",
      roomImg: `https://ui-avatars.com/api/?name=${params.match.params.id}`,
      userImg: `https://ui-avatars.com/api/?name=${this.makeName()}`,
      id: params.match.params.id,
      messages: [
      ]
    };
  }


  

  handleSubmit = (msg) => {
    this.setState(prevState => ({
      messages: [...prevState.messages,  { id: new Date().getTime(), author: this.state.author, msg: msg, img: `https://ui-avatars.com/api/?name=${this.state.author}`, time: "now" }]
    }))
    this.socket.emit("send-message", {msg: msg, author: this.state.author, room: this.state.id})
  }

  makeName() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 2; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  componentDidMount() {
    fetch('http://uinames.com/api/').then(response => response.json())
    .then( (data)  => {
        this.setState({author: `${data.name} ${data.surname}`});
        console.log(this.state);
        }).catch(error => console.log(error));

    this.socket.emit('join', this.state.id);
    
    this.socket.on("send-message", (msg) => {
        console.log(msg);
        const currentMsg =  { id: new Date().getTime(), author: msg.author, msg: msg.msg, img: `https://ui-avatars.com/api/?name=${msg.author}`, time: "now" };
      this.setState(prevState => ({
        messages: [...prevState.messages,  currentMsg ]
      }))
    }); 

  }

  render() {

    

    return (
      <div>
        <div className={"chat"}>
          <User
            img={this.state.roomImg}
            location="Cairo"
            name={this.state.id}
          />
          <div className={"messages "}>
            <div className={"messages-content"}>
              {this.state.messages.map(message => <Message key={`${message.id}`} img={message.img} author={message.author} msg={message.msg} time={message.time} right={/*message.author != this.state.author*/ false}/>)}
            </div>
          </div>
          <ComposeMessage onSubmit={this.handleSubmit} />
        </div>
        <div className={"bg"} />
      </div>
    );
  }
}

export default Chat;
