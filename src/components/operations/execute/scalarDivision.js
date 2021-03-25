import React, { Component } from 'react';
import { MathJax } from 'better-react-mathjax';

import { OperationContext } from '../../OperationContext';
import { getMatrices, getScalar, newExecuteMatrix, ifDecimalC2Fraction, ordinal_suffix_of, copy } from '../utilities/utils';
import DisplayMatrix from '../utilities/DisplayMatrix';

export default class ScalarDivision extends Component {
  static contextType = OperationContext;

  scalarDivision() {
    console.log('Dividing Matrix by scalar');
    const { showSteps } = this.context;
    let matrices = getMatrices();
    let matricesOrignal = copy(matrices);
    let scalar = getScalar();
    let matrix = copy(matrices[0]);;
    const rows = matrix.length;
    const columns = matrix[0].length;
    let newMatrix = newExecuteMatrix(rows, columns);
    let key = 0 + '-';

    let output = [];
    let outputTmp;

    let scalarOriginal = copy(scalar);

    scalar = 1 / scalar;

    if (showSteps) {
      outputTmp = (
        <p key={key + 1}>$$Convert\ to\ multiplication:$$</p>
      )
      output.push(outputTmp);

      outputTmp = (
        <p key={key + 2}>$$
          <DisplayMatrix rows={rows} columns={columns} matrix={matrix} /> \div
          {ifDecimalC2Fraction(scalarOriginal)} =
          {ifDecimalC2Fraction(scalar)} \cdot
          <DisplayMatrix rows={rows} columns={columns} matrix={matrix} />
        $$</p>
      )
      output.push(outputTmp);
    }


    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        newMatrix[r][c] = matrix[r][c] * scalar
      }
    }

    if (showSteps) {
      outputTmp = (
        <p key={key + 3}>$$Multiply\ each\ element\ of\ the\ matrix\ by\ the\ scalar: $$</p>
      )
      output.push(outputTmp);
      outputTmp = (
        <p key={key + 4}>$$
          <DisplayMatrix rows={rows} columns={columns} matrix={matrix} /> \div
          {ifDecimalC2Fraction(scalar)} =
          <DisplayMatrix rows={rows} columns={columns} matrix={matrix} separator={'\\cdot'} scalar={scalar} /> =
          <DisplayMatrix rows={rows} columns={columns} matrix={newMatrix} />
        $$</p>
      )
      output.push(outputTmp);
    }

    outputTmp = (
      <p key={key + 5}>$$Result: $$</p>
    )
    output.push(outputTmp);

    let outputHold = [];

    outputTmp = (
      <p key={key + 6}>$$
        <DisplayMatrix rows={rows} columns={columns} matrix={matrix} /> \div
        {ifDecimalC2Fraction(scalarOriginal)} =
        <DisplayMatrix rows={rows} columns={columns} matrix={newMatrix} />
      $$</p>
    )

    outputHold.push(outputTmp);

    outputTmp = (
      <div key={key + 7} style={{display: 'flex'}}>
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
        {this.scalarDivision()}
      </MathJax>
    )
  }
}
