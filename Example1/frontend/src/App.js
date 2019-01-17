import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Chat from "./Components/Chat";
class App extends Component {

  render() {

    return (
      <Router>
        <div>
          <Route  path="/:id" component={Chat} />
        </div>
      </Router>
    );
  }
}

export default App;
