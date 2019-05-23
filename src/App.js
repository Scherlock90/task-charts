import React, { Component } from 'react';
import Content from './components/Content';
import Footer from './components/Footer';
import Menu from './components/Menu';

class App extends Component {
  goToPage = (pageNumber) => {
    this.reactPageScroller.goToPage(pageNumber);
  }
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
  margin: '5em',
  padding: '3em',
  display: 'flex',
  justifyContent: 'center'
}
 
export default App;