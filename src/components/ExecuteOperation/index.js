import React, { Component } from 'react';
import './index.css';

import ExecuteOperationInput from './Input';
import ExecuteOperationOutput from './Output';

export default class ExecuteOperationContainer extends Component {
  render() {
    const classesOuter = 'execute-operation-container';
    const classesInner = 'execute-operation-container-inner'

    return (
      <div className={classesOuter}>
        <div className={classesInner}>
          <ExecuteOperationInput />
          <ExecuteOperationOutput />
        </div>
      </div>
    )
  }
}
