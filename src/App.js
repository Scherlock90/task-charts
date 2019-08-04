import React, { Component } from 'react';
import Content from './components/MainComponents/Content';
import Menu from './components/MainComponents/Menu';

class App extends Component {
  goToPage = (pageNumber) => {
    this.reactPageScroller.goToPage(pageNumber);
  }
  render() {
    return (
      <>
        <Menu />
        <Content />
      </>
    );
  }
}

export default App;