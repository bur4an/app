import React from 'react';

import { hot } from 'react-hot-loader'

import Input from './Form/Input.jsx'

const REACT_VERSION = React.version;

class App extends React.Component {
  render(){
    return(
      <div>
          <div align="center"> React version: {REACT_VERSION} </div>
          <Input />
      </div>
    )
  }
}

export default hot(module)(App)
