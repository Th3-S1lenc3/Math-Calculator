import React from 'react';
import './css/Main.css';
import SelectOperationContainer from './SelectOperationContainer';
import ExecuteOperationContainer from './ExecuteOperationContainer';
import OperationContextProvider from './OperationContext';

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
