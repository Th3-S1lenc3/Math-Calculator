import React, { Component } from 'react';

import { OperationContext } from '@OperationContext';

export default class OutputDetail extends Component {
  static contextType = OperationContext;

  render() {
    const classes = 'custom-control custom-switch';
    const { setContext, showMatrixOperations, outputDetail } = this.context;

    let detail;

    if (outputDetail == 'fraction') {
      detail = 'decimal';
    }
    else {
      detail = 'fraction';
    }

    return (
      <div className={classes}>
        <input type="checkbox" className="custom-control-input toggleOutputDetail" id="toggleOutputDetail" onChange={() => {
          const target = { name: 'outputDetail', value: detail };
          {setContext(target)}
        }}/>
        <label className="toggleOutputDetail-label custom-control-label" htmlFor="toggleOutputDetail">Show Output As {detail.capitaliseFirst()}</label>
      </div>
    )
  }
}
