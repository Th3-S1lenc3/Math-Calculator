import React, { Component } from 'react';

import { OperationContext } from '@OperationContext';
import Matrix from '@utilities/Matrix';

export default class AddMatrices extends Component {
  static contextType = OperationContext;

  renderMatrices() {
    const { matrices } = this.context;
    let matrixCount = Object.keys(matrices).length;
    let i = 1;

    let output = [];
    let outputTmp;

    for (let matrix in matrices) {
      let rows = matrices[matrix].rows;
      let columns = matrices[matrix].columns;
      let matrixID = matrix.split('_')[1];

      let key = i + '-';

      outputTmp = (
        <Matrix key={key + 1} id={matrixID} rows={rows} cols={columns} />
      )

      output.push(outputTmp);

      if (i != matrixCount) {
        outputTmp = (
          <p key={key + 2} className="operator">+</p>
        )
        output.push(outputTmp);
      }

      i++;
    }

    return output;
  }

  render() {
    const classes = 'operationInput';

    return (
      <div className={classes}>
        {this.renderMatrices()}
      </div>
    )
  }
}
