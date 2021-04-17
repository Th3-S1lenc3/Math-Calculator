import React, { Component, Fragment } from 'react';
import { MathJax } from 'better-react-mathjax';

import { OperationContext } from '@OperationContext';
import Matrix from '@utilities/Matrix';
import ScalarInput from '@utilities/ScalarInput';

export default class ScalarMultiplication extends Component {
  static contextType = OperationContext

  renderMatrices() {
    const { matrices } = this.context;
    let matrixCount = Object.keys(matrices).length;
    let i = 1;
    let key = `${i}-`;

    let output = [];
    let outputTmp;

    outputTmp = (
      <Fragment key={key + 0}>
        <ScalarInput />
        <p key={key + 1} className="specialOperator">$$\cdot$$</p>
      </Fragment>
    );
    output.push(outputTmp);

    for (let matrix in matrices) {
      let rows = matrices[matrix].rows;
      let columns = matrices[matrix].columns;
      let matrixID = matrix.split('_')[1];

      outputTmp = (
        <Matrix key={key + 2} id={matrixID} rows={rows} cols={columns} />
      );
      output.push(outputTmp);

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
