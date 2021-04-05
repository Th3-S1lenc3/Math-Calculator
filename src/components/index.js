import React from 'react';
import './index.css';
import SelectOperationContainer from './SelectOperation';
import ExecuteOperationContainer from './ExecuteOperation';
import OperationContextProvider from './OperationContext';
import './Prototypes/index.js';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }

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
