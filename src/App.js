import React, { Component } from 'react';
import './App.css';
import Content from './Components/Content';
import Header from './Components/Header';
import Footer from "./Components/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Header />
          <Content />

        </div>

          <Footer />

      </div>
    );
  }
}

export default App;
