import React, { Component } from "react";
import "./App.css";
import Quate from "./components/Quate";
import { Container, Responsive } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (         //removinau wraper
      <Responsive as='Container' fluid style={style}>
        <Quate />
      </Responsive >
    );
  }
}

export default App;

const style = {
  backgroundColor: "#6893e9",
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1em' 
 }