import React, { Component } from 'react';
import { MathJax } from 'better-react-mathjax';

import { OperationContext } from '@OperationContext';
import {
  getMatrices,
  getScalar,
  newExecuteMatrix,
  ifDecimalC2Fraction,
  ordinal_suffix_of,
  copy
} from '@utilities/utils';
import DisplayMatrix from '@utilities/DisplayMatrix';

export default class ScalarMultiplication extends Component {
  static contextType = OperationContext;

  scalarMultiplication() {
    console.log('Multiplying Matrix by scalar');
    const { showSteps } = this.context;
    let matrices = getMatrices();
    let matricesOrignal = copy(matrices);
    let scalar = getScalar();
    let matrix = copy(matrices[0]);
    const rows = matrix.length;
    const columns = matrix[0].length;
    let newMatrix = newExecuteMatrix(rows, columns);
    let key = '0-';

    let output = [];
    let outputTmp;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        newMatrix[r][c] = matrix[r][c] * scalar;
      }
    }

    if (showSteps) {
      outputTmp = (
        <p key={key + 1}>$$Multiply\ each\ element\ of\ the\ matrix\ by\ the\ scalar: $$</p>
      );
      output.push(outputTmp);

      outputTmp = (
        <p key={key + 2}>$$
          {ifDecimalC2Fraction(scalar)} \cdot
          <DisplayMatrix rows={rows} columns={columns} matrix={matrix} /> =
          <DisplayMatrix rows={rows} columns={columns} matrix={matrix} separator={'\\cdot'} scalar={scalar} /> =
          <DisplayMatrix rows={rows} columns={columns} matrix={newMatrix} />
        $$</p>
      );
      output.push(outputTmp);
    }

    outputTmp = (
      <p key={1}>$$Result: $$</p>
    );
    output.push(outputTmp);

    let outputHold = [];

    outputTmp = (
      <p key={key + 3}>$$
        {ifDecimalC2Fraction(scalar)} \cdot
        <DisplayMatrix rows={rows} columns={columns} matrix={matrix} /> =
        <DisplayMatrix rows={rows} columns={columns} matrix={newMatrix} />
      $$</p>
    );
    outputHold.push(outputTmp);

    outputTmp = (
      <div key={2} style={{display: 'flex'}}>
        {outputHold}
      </div>
    );
    output.push(outputTmp);

    return output;
  }

  render() {
    const classes = 'operationOutput';

    return (
      <MathJax className={classes}>
        {this.scalarMultiplication()}
      </MathJax>
    )
  }
}
