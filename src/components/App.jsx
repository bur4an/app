import React from 'react';

import { hot } from 'react-hot-loader'

import List from './Form/List.jsx'

const REACT_VERSION = React.version;

class App extends React.Component {
  render(){
    return(
      <div>
          <div align="center"> React version: {REACT_VERSION} </div>
          <List />
      </div>
    )
  }
}

export default hot(module)(App)
