import React, { Component } from "react";

class ComposeMessage extends Component {
  constructor(props) {
    super(props);
    this.messageReference = React.createRef();
  }

  updateInputValue() {
    this.props.onSubmit(this.messageReference.current.value);
    this.setState({}, (() => {
      this.setState({messageReference: ""});
      this.messageReference.current.value = "";
    }));
  }

  render() {
    return (
      <div className={"message-box"}>
        <textarea onKeyUp= {(event) => { 
          if(event.keyCode === 13) {
            this.updateInputValue();
          }
        }}
          ref={this.messageReference}
          type="text"
          className={"message-input"}
          placeholder="Type message..."
        />
        <button onClick={() => { this.updateInputValue() }} type="submit" className={"message-submit"}>
          Send
        </button>
      </div>
    );
  }
}

export default ComposeMessage;
