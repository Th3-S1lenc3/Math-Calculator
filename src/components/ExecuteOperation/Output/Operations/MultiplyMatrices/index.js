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

export default class MultiplyMatrices extends Component {
  static contextType = OperationContext;

  multiplyMatrices() {
    console.log('Multiplying Matrices');
    const { showSteps } = this.context;
    let matrices = getMatrices();
    let matricesOrignal = copy(matrices);
    const allEqual = arr => arr.every((value, i) => (value.length === arr[i].length));
    let m1 = copy(matrices[0]);;
    let m2 = copy(matrices[1]);;
    let rows = m1.length;
    let columns = m2[0].length;
    let newMatrix = newExecuteMatrix(rows, columns);

    let output = [];
    let outputTmp;

    if (matrices.length > 2 && !allEqual(matrices)) {
      return (
        <p key={0}>$$
          Invalid Operation. To multiply more than 2 matrices they must be the same dimension.
        $$</p>
      );
    }
    else if (m1[0].length != m2.length) {
      return (
        <p key={0}>$$
          Invalid\ Operation.\ To\ multiply\ 2\ matrices\ there\ must\ be\ the\ same\ numbers\ columns\ in\ the\ {ordinal_suffix_of(1)}\ matrix
          \ as\ rows\ in\ the\ {ordinal_suffix_of(2)}\ matrix.
        $$</p>
      );
    }

    newMatrix = matrices.reduce((resultantMatrix, matrix, i) => {
      let key = `${i}-`;
      let numberedMatrix = ordinal_suffix_of(i+1);
      let matrix1 = copy(resultantMatrix);

      resultantMatrix = [];
      for (let i = 0; i < rows; i++) {
        resultantMatrix.push([]);
      }

      let tmpValue;

      for (let r = 0; r < rows; r++) {
        tmpValue = 0;
        for (let col = 0; col < columns; col++) {
          tmpValue = 0;
          for (let c = 0; c < columns; c++) {
            console.log(matrix1, matrix);
            tmpValue += matrix1[r][c] * matrix[c][col];
          }
          resultantMatrix[r].push(tmpValue);
        }
      }

      if (showSteps) {
        if (i == 1) {
          outputTmp = (
            <p key={key + 1}>$$Multiply\ the\ rows\ of\ the\ {ordinal_suffix_of(1)}\ matrix\ by\ the\ columns\ of\ the\ {ordinal_suffix_of(2)}\ matrix: $$</p>
          );
          output.push(outputTmp);
        }
        else {
          outputTmp = (
            <p key={key + 1}>$$Multiply\ the\ rows\ of\ the\ resultant\ matrix by\ the\ columns\ of\ the\ {numberedMatrix}\ matrix: $$</p>
          );
          output.push(outputTmp);
        }

        outputTmp = (
          <p key={key + 2}>$$
          <DisplayMatrix rows={rows} columns={columns} matrix={matrix1} /> \cdot
          <DisplayMatrix rows={rows} columns={columns} matrix={matrix} /> =
          <DisplayMatrix rows={rows} columns={columns} matrix={matrix1} separator={'\\cdot'} matrix2={matrix} type={'multiply'}/> =
          <DisplayMatrix rows={rows} columns={columns} matrix={resultantMatrix} />
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
      var key = `${j}_`;
      let matrix = matricesOrignal[j-1];

      if (j != matricesOrignal.length) {
        outputTmp = (
          <p key={key + 1}>\(
            <DisplayMatrix rows={rows} columns={columns} matrix={matrix} /> \cdot
          \)</p>
        );
        outputHold.push(outputTmp);
      }
      else {
        outputTmp = (
          <p key={key + 2}>\(
            <DisplayMatrix rows={rows} columns={columns} matrix={matrix} /> =
            <DisplayMatrix rows={rows} columns={columns} matrix={newMatrix} />
          \)</p>
        );
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
        {this.multiplyMatrices()}
      </MathJax>
    )
  }
}
