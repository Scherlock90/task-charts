import React, { Component } from 'react';
import Content from './components/Content';
import Menu from './components/Menu';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Menu />
        <div style={styleContent}>
          <Content />
        </div>
      </div>
    );
  }
}

const styleContent = {
  margin: '1em',
  padding: '3em',
  display: 'flex',
  justifyContent: 'center',
  height: '100vh'
}

export default App;