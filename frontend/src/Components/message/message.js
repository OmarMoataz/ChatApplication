import React, { Component } from "react";

export class Message extends Component {
  constructor(props) {
    super();
    this.state = {
      author: props.author,
      msg: props.msg,
      image: props.img,
      time: props.time,
      right: props.right,
    };
  }

  render() {
    return (
      <div className={this.state.right ? "right" : ""}>
        <div className={"message new"}>
          <figure className={"avatar"}>
            <img src={this.state.image} alt="" />
          </figure>
          {this.state.msg}
          <div className={"timestamp"}>{this.state.time}</div>
        </div>
      </div>
    );
  }
}
