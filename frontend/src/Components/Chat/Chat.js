import React, { Component } from "react";
import socketIOClient from "socket.io-client";

import { Message } from "../message/message";
import { User } from "../user/user";
import ComposeMessage from "../ComposeMessage/ComposeMessage";

import "./Chat.css";

class Chat extends Component {
  constructor(params) {
    super(params);
    this.author = "Omar Moataz";
    this.socket = socketIOClient(`http://localhost:3030/`);
    this.state = {
      messages: [],
      id: null
    };
  }

  componentDidMount() {
    this.setState({ id: this.props.match.params.id || 1 }, () => {
      this.socket.emit("join", this.state.id);
  
      this.socket.on("send-message", (msg) => {
        const { author, content } = msg;

        const currentMsg = {
          author,
          content,
          id: new Date().getTime(),
          img: `https://ui-avatars.com/api/?name=${msg.author}`,
          time: "now",
        };
        this.setState((prevState) => ({
          messages: [...prevState.messages, currentMsg],
        }));
      });
    })
  }

  handleSubmit = (messageContent) => {
    const { id } = this.state;

    this.setState((prevState) => ({
      messages: [
        ...prevState.messages,
        {
          author: this.author,
          content: messageContent,
          id: new Date().getTime(),
          img: `https://ui-avatars.com/api/?name=${this.author}`,
          time: "now",
        },
      ],
    }));
    this.socket.emit("send-message", {
      content: messageContent,
      author: this.author,
      room: id,
    });
  };

  makeName() {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 2; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  render() {
    const { id, messages } = this.state;
    const roomImg = `https://ui-avatars.com/api?name=${id}`;

    return (
      <div>
        <div className="chat">
          <User img={roomImg} location="Cairo" name={`Room ${id}`} />
          <div className="messages">
            <div className="messages-content">
              {messages.map((message) => (
                <Message
                  key={message.id}
                  img={message.img}
                  author={message.author}
                  content={message.content}
                  time={message.time}
                />
              ))}
            </div>
          </div>
          <ComposeMessage onSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

export default Chat;
