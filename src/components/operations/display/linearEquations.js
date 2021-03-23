import React, { Component } from 'react';

import { OperationContext } from '../../OperationContext';
import SystemOfLinearEquations from '../utilities/SystemOfLinearEquations';

export default class LinearEquations extends Component {
  static contextType = OperationContext

  renderEquations() {
    const { equations } = this.context;
    let equationCount = equations['count'];

    let output = [];
    let outputTmp;

    outputTmp = (
      <SystemOfLinearEquations key={0} id="1" variables={equationCount} equations={equationCount} />
    )

    output.push(outputTmp);

    return output;
  }

  render() {
    const classes = 'operationInput';

    return (
      <div className={classes}>
        {this.renderEquations()}
      </div>
    )
  }
}
