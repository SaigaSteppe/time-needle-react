import React, { Component } from 'react';
import './App.css';
import Content from './Components/Content';
import Header from './Components/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Content />

      </div>
    );
  }
}

export default App;
