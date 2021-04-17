import React, { Component } from 'react';

import SelectOperationContainer from '@components/SelectOperation';
import ExecuteOperationContainer from '@components/ExecuteOperation';
import OperationContextProvider from '@components/OperationContext';
import '@components/Prototypes/index.js';

import './index.css';

export default class Main extends Component {
  render() {
    return (
      <OperationContextProvider>
        <SelectOperationContainer />
        <div className="main">
          <ExecuteOperationContainer />
        </div>
      </OperationContextProvider>
    );
  }
}
