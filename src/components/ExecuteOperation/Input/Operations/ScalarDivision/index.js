import React, { Component, Fragment } from 'react';
import { MathJax } from 'better-react-mathjax';

import { OperationContext } from '@OperationContext';
import Matrix from '@utilities/Matrix';
import ScalarInput from '@utilities/ScalarInput';

export default class ScalarDivision extends Component {
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

      let key = `${i}-`;

      outputTmp = (
        <Matrix key={key + 1} id={matrixID} rows={rows} cols={columns} />
      );

      output.push(outputTmp);

      outputTmp = (
        <Fragment key={key + 2}>
          <p key={key + 3} className="specialOperator">$$\div$$</p>
          <ScalarInput />
        </Fragment>
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
