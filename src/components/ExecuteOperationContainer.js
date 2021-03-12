import React, { useContext } from 'react';
import ReactDOM from "react-dom";
import './css/ExecuteOperationContainer.css';

import ExecuteOperationInput from './ExecuteOperationInput';
import ExecuteOperationOutput from './ExecuteOperationOutput';

export default class ExecuteOperationContainer extends React.Component {
  constructor(props) {
    super(props);
  }

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
