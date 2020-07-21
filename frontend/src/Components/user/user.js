import React from "react";

export const User = (props) => {
  return (
    <div className="chat-title">
      <h1> {props.name}</h1>
      <h2> {props.location} </h2>
      <figure className="avatar">
        {props.img && <img src={props.img} alt="Profile" />}
      </figure>
    </div>
  );
};
