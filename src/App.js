import React, { Component } from "react";
import "./App.css";
import Quate from "./components/Quate";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="wrapper">
          <Quate />
        </div>
      </div>
    );
  }
}

export default App;
