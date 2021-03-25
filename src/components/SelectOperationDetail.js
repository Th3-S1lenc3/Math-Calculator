import React, { Component } from 'react';
import './css/SelectOperationDetail.css';

import { OperationContext } from './OperationContext';

export default class SelectOperationDetail extends Component {
  static contextType = OperationContext;

  render() {
    const classes = 'custom-control custom-switch';
    const { setContext, showSteps } = this.context;

    let label = showSteps ? 'Hide Steps' : 'Show Steps';

    return (
      <div className={classes}>
      <input type="checkbox" className="custom-control-input toggleSteps" id="toggleSteps" onChange={() => {
        const target = { name: 'showSteps', value: !showSteps };
        {setContext(target)}
      }}/>
      <label className="toggleSteps-label custom-control-label" htmlFor="toggleSteps">{label}</label>
      </div>
    )
  }
}
