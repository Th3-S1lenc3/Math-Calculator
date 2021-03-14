import React, { Component } from 'react';
import { MathJax } from 'better-react-mathjax';

import { OperationContext } from '../../OperationContext';
import { getMatrices, newExecuteMatrix, ifDecimalC2Fraction, ordinal_suffix_of, copy } from '../utilities/utils';
import DisplayMatrix from '../utilities/DisplayMatrix';

export default class TransposeMatrix extends Component {
  static contextType = OperationContext;

  transposeMatrix() {
    console.log('Transposing Matrix');
    const { showSteps } = this.context
    let matrices = copy(getMatrices());
    let matrix = matrices[0];
    let matrixOriginal = copy(matrix);
    let rows = matrix.length;
    let columns = matrix[0].length;
    let transposedMatrix = newExecuteMatrix(columns, rows);
    let key = 0 + '-';

    let output = [];
    let outputTmp;

    if (showSteps) {
      outputTmp = (
        <p key={key +1}>\(Transpose\ Matrix:\)</p>
      )
      output.push(outputTmp);

      outputTmp = (
        <p key={key + 2}>$$
          A =
          <DisplayMatrix rows={rows} columns={columns} matrix={matrix} />
        $$</p>
      )
      output.push(outputTmp);
    }

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        let key = r + '_' + c;
        transposedMatrix[c][r] = matrix[r][c];
        if (showSteps) {
          outputTmp = (
            <p key={key + 1}>$$
              A_{`{` + (r + 1) + (c + 1) + `}`} \to A^{`{T}`}_{`{` + (c + 1) + (r + 1) + `}`}
            $$</p>
          )
          output.push(outputTmp);
        }
      }
    }

    outputTmp = (
      <p key={key + 3}>$$Result: $$</p>
    )
    output.push(outputTmp);

    outputTmp = (
      <p key={key + 4}>$$
        <DisplayMatrix rows={rows} columns={columns} matrix={matrix} /> \xrightarrow{`{\\text{Transpose}}`}
        <DisplayMatrix rows={rows} columns={columns} matrix={transposedMatrix} />
      $$</p>
    );
    output.push(outputTmp);

    return output;
  }

  render() {
    const classes = 'operationOutput';

    return (
      <MathJax className={classes}>
        {this.transposeMatrix()}
      </MathJax>
    )
  }
}
