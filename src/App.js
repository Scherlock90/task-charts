import React, { Component } from 'react';
import Content from './components/Content';
import Menu from './components/Menu';

class App extends Component {
  goToPage = (pageNumber) => {
    this.reactPageScroller.goToPage(pageNumber);
  }
  render() {
    return (
      <div className="App">
        <Menu />
        <div className="content-main-own">
          <Content />
        </div>
      </div>
    );
  }
}

export default App;