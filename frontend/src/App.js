import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Chat from "./Components/Chat/Chat.js";

const App = () => {
  return (
    <Router>
      <Chat />
    </Router>
  );
};

export default App;
