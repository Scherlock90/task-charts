import React, { Component } from 'react';
import Content from './components/MainComponents/Content';
import Menu from './components/MainComponents/Menu';
import Footer from './components/MainComponents/Footer';

class App extends Component {
  goToPage = (pageNumber) => {
    this.reactPageScroller.goToPage(pageNumber);
  }
  render() {
    return (
      <>
        <Menu />
        <Content />
        <Footer />
      </>
    );
  }
}

export default App;