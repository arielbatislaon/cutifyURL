import React, { Component } from 'react';
import URLForm from './components/urlform/urlform';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to URL Cutifier</h1>
        </header>
       
          <URLForm/>
      
      </div>
    );
  }
}

export default App;
