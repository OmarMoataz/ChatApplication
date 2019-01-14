import React, { Component } from 'react';

export class User extends Component {
  constructor(props) {
    super();
    this.state = {
      name: props.name,
      location: props.location,
      image: props.img
    }
  }

  render()  {
      return (
        <div className={"chat-title"}>
          <h1> {this.state.name}</h1>
          <h2> {this.state.location} </h2>
          <figure className={"avatar"}>
            <img src={this.state.image} alt="Profile" />
          </figure>
        </div>
      )
  }

}
