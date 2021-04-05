import React, { Component } from 'react';
import { MathJax } from 'better-react-mathjax';

import { OperationContext } from '@OperationContext';
import {
  getMatrices,
  newExecuteMatrix,
  ifDecimalC2Fraction,
  ordinal_suffix_of,
  copy
} from '@utilities/utils';
import DisplayMatrix from '@utilities/DisplayMatrix';

export default class AddMatrices extends Component {
  static contextType = OperationContext;

  addMatrices() {
    console.log('Adding Matrices');
    const { showSteps } = this.context;
    let matrices = getMatrices();
    let matricesOrignal = copy(matrices);
    const allEqual = arr => arr.every(v => v.length === arr[0].length);
    let matrix = copy(matrices[0]);
    const rows = matrix.length;
    const columns = matrix[0].length;
    let newMatrix = newExecuteMatrix(rows, columns);

    let output = [];
    let outputTmp;

    if (!allEqual(matrices)) {
      return (
        <p key={0}>Invalid Operation. To add matrices they must be the same dimension.</p>
      );
    }

    newMatrix = matrices.reduce((resultantMatrix, matrix, i) => {
      let key = i + '-';
      let numberedMatrix = ordinal_suffix_of(i+1);
      let matrix1 = copy(resultantMatrix);

      for (let j = 0; j < rows; j++) {
        for (let k = 0; k < columns; k++) {
          resultantMatrix[j][k] += matrix[j][k];
        }
      }

      if (showSteps) {
        if (i == 1) {
          outputTmp = (
            <p key={key + 1}>$$Add\ the\ elements\ in\ the\ matching\ positions\ on\ the\ {ordinal_suffix_of(1)}\ and\ {ordinal_suffix_of(2)}\ matrix: $$</p>
          )
          output.push(outputTmp);
        }
        else {
          outputTmp = (
            <p key={key + 1}>$$Add\ the\ elements\ in\ the\ matching\ positions\ on\ the\ resultant\ matrix\ and\ the\ {numberedMatrix}\ matrix: $$</p>
          )
          output.push(outputTmp);
        }

        outputTmp = (
          <p key={key + 2}>$$
            <DisplayMatrix rows={rows} columns={columns} matrix={matrix1} /> +
            <DisplayMatrix rows={rows} columns={columns} matrix={matrix} /> =
            <DisplayMatrix rows={rows} columns={columns} matrix={matrix1} separator={'+'} matrix2={matrix} /> =
            <DisplayMatrix rows={rows} columns={columns} matrix={copy(resultantMatrix)} />
          $$</p>
        );
        output.push(outputTmp);
      }

      return resultantMatrix;
    });

    outputTmp = (
      <p key={1}>$$Result: $$</p>
    )
    output.push(outputTmp);

    let outputHold = [];

    for (let j = 1; j <= matricesOrignal.length; j++) {
      var key = j + '_';
      let matrix = matricesOrignal[j-1];

      if (j != matricesOrignal.length) {
        outputTmp = (
          <p key={key + 1}>\(
            <DisplayMatrix rows={rows} columns={columns} matrix={matrix} /> +
          \)</p>
        )
        outputHold.push(outputTmp);
      }
      else {
        outputTmp = (
          <p key={key + 2}>\(
            <DisplayMatrix rows={rows} columns={columns} matrix={matrix} />  =
            <DisplayMatrix rows={rows} columns={columns} matrix={newMatrix} />
          \)</p>
        )
        outputHold.push(outputTmp);
      }
    }

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
        {this.addMatrices()}
      </MathJax>
    )
  }
}
