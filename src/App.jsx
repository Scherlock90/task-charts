import React, { Component } from 'react';
import { Content, Menu, Footer } from './components/main-components/index'

export default class App extends Component {
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
