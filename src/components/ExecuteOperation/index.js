import React, { useContext } from 'react';
import ReactDOM from "react-dom";
import './index.css';

import ExecuteOperationInput from './Input';
import ExecuteOperationOutput from './Output';

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
