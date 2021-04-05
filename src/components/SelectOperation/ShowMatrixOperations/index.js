import React, { Component } from 'react';

import { OperationContext } from '@OperationContext';

export default class ShowMatrixOperations extends Component {
  static contextType = OperationContext;

  render() {
    const classes = 'custom-control custom-switch';
    const { setContext, showMatrixOperations } = this.context;

    let state = showMatrixOperations ? 'Hide' : 'Show';

    return (
      <div className={classes}>
        <input type="checkbox" className="custom-control-input toggleMatrixOperations" id="toggleMatrixOperations" onChange={() => {
          const target = [
            { name: 'showMatrixOperations', value: !showMatrixOperations },
            { name: 'type', value: 'default' },
          ];
          {setContext(target)}
        }}/>
        <label className="toggleMatrixOperations-label custom-control-label" htmlFor="toggleMatrixOperations">{state} Matrix Operations</label>
      </div>
    )
  }
}
