import React, { Component } from 'react';
import { MathJax } from 'better-react-mathjax';

import { OperationContext } from '../../OperationContext';
import Matrix from '../utilities/Matrix';

export default class DivideMatrices extends Component {
  static contextType = OperationContext

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
          <p key={key + 2} className="specialOperator">$$\div$$</p>
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
      <MathJax className={classes}>
        {this.renderMatrices()}
      </MathJax>
    )
  }
}
