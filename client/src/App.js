import React, { Component } from 'react';
//import SystemStatus from './SystemStatus';
import PairArguments from './PairArguments'
import './App.css';

class App extends Component {

  render() {
    return (
      
      <div className="App">
        <header><h3>Rotulagem de Argumentos Jurídicos</h3></header>
        <hr/>
        <PairArguments />
      </div>

    );
  }
}

export default App;