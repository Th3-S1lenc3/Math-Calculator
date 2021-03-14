import React, { Component } from 'react';
import './css/SelectOperationDetail.css';

import { OperationContext } from './OperationContext';

export default class SelectOperationDetail extends Component {
  static contextType = OperationContext;

  render() {
    const classes = 'operation-detail centre';
    const { setContext } = this.context;

    return (
      <div className={classes}>
        <select onChange={() => {
          const target = { name: 'showSteps', value: eval(event.target.value) };
          {setContext(target)}
        }} className="custom-select custom-select-sm">
          <option value='false' defaultValue>Hide Steps</option>
          <option value='true'>Show Steps</option>
        </select>
      </div>
    )
  }
}
