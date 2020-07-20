import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Chat from "./Components/Chat/Chat.js";

const App = () => {
  return (
    <Router>
      <Route exact path="/:id" component={Chat} />
    </Router>
  );
};

export default App;
