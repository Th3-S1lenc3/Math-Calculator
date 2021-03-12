import React, { Component } from 'react';
import { MathJax } from 'better-react-mathjax';

import { OperationContext } from '../../OperationContext';
import { getMatrices, newExecuteMatrix, ifDecimalC2Fraction, flipSign, ordinal_suffix_of, copy, getDeterminant } from '../utilities/utils';
import DisplayMatrix from '../utilities/DisplayMatrix';

export default class InvertMatrix extends Component {
  static contextType = OperationContext;

  invertMatrix() {
    console.log('Inverting Matrices');
    const { showSteps } = this.context;
    let matrices = copy(getMatrices());
    let matricesOrignal = copy(getMatrices());
    let matrix = copy(matrices[0]);;
    let matrixOriginal = copy(matrix);
    let rows = matrix.length;
    let columns = matrix[0].length;
    let newMatrix = newExecuteMatrix(rows, columns);
    let key = 0 + '-'

    let output = [];
    let outputTmp;

    if (rows != columns) {
      outputTmp = (
        <p key={key + 1}>$$Invalid\ Operation.\ To\ invert\ a\ matrix\ it\ must\ be\ square.$$</p>
      )
      output.push(outputTmp);
      return output;
    }

    if (showSteps == 'true') {
      outputTmp = (
        <p key={key + 2}>$$Check\ if\ the\ determinant\ of\ the\ matrix\ is\ not\ 0:$$</p>
      )
      output.push(outputTmp);
    }

    let determinant = getDeterminant(matrix);

    outputTmp = (
      <p key={key + 0}>$$
        A = <DisplayMatrix rows={rows} columns={columns} matrix={matrix}/>
      $$</p>
    )
    output.push(outputTmp);

    outputTmp = (
      <p key={key + 1}>$$
        det(A) =
        <DisplayMatrix rows={rows} columns={columns} matrix={matrix} type={'vmatrix'}/> =
        {ifDecimalC2Fraction(determinant)}
      $$</p>
    )

    output.push(outputTmp);

    if (determinant == 0) {
      outputTmp = (
        <p key={key + 3}>$$The\ determinant\ of\ the\ matrix\ is\ 0\ therefore\ the\ inverse\ cannot\ be\ determined.$$</p>
      )
      output.push(outputTmp);
      return output;
    }
    else if (showSteps == 'true') {
      outputTmp = (
        <p key={key + 3}>$$The\ determinant\ of\ the\ matrix\ is\ not\ 0\ therefore\ an\ inverse\ exists.$$</p>
      )
      output.push(outputTmp);
    }


    let augmentedMatrix = [];
    let newColumns = columns * 2;

    for (let i = 0; i < rows; i++) {
      augmentedMatrix.push([]);
      augmentedMatrix[i].push(new Array(newColumns));

      for (let j = 0; j < columns; j++) {
        augmentedMatrix[i][j] = matrix[i][j];
      }

      for (let k = columns; k < newColumns; k++) {
        let idenCols = k - columns;
        if (idenCols == i) {
          augmentedMatrix[i][k] = 1
        }
        else {
          augmentedMatrix[i][k] = 0
        }
      }
    }

    let augmentedMatrixOriginal = copy(augmentedMatrix)

    for (let column = 0; column < columns; column++){
      let entry = 1 / augmentedMatrix[column][column];
      for (let col = column; col < newColumns; col++ ) {
        augmentedMatrix[column][col] = entry * augmentedMatrix[column][col];
      }

      for (let row = 0; row < rows; row++) {
        if (row != column) {
          let entry = flipSign(augmentedMatrix[row][column]);
          for (let col = column; col < newColumns; col++ ) {
            augmentedMatrix[row][col] = (entry * augmentedMatrix[column][col]) + augmentedMatrix[row][col];
          }
        }
      }
    }

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        matrix[r][c] = augmentedMatrix[r][c+2];
      }
    }

    if (showSteps == 'true') {
      outputTmp = (
        <p key={key + 4}>$$Invert\ the\ matrix:$$</p>
      )
      output.push(outputTmp);

      outputTmp = (
        <p key={key + 5}>$$
          <DisplayMatrix rows={rows} columns={columns} matrix={matrixOriginal} />
          \xrightarrow{`{\\text{Augment}}`}
          <DisplayArray rows={rows} columns={newColumns} matrix={augmentedMatrixOriginal} splitPoint={columns} separator={'|'} />
          \xrightarrow{`{\\text{Gaussian Elimination}}`}
          <DisplayMatrix rows={rows} columns={columns} matrix={matrix} />
        $$</p>
      )
      output.push(outputTmp);
    }


    outputTmp = (
      <p key={key + 6}>$$Result: $$</p>
    )
    output.push(outputTmp);

    outputTmp = (
      <p key={key + 7}>$$
        <DisplayMatrix rows={rows} columns={columns} matrix={matrixOriginal} />
        \xrightarrow{`{\\text{Invert}}`}
        <DisplayMatrix rows={rows} columns={columns} matrix={matrix} />
      $$</p>
    );
    output.push(outputTmp);

    return output;
  }

  render() {
    const classes = 'operationOutput';

    return (
      <MathJax className={classes}>
        {this.invertMatrix()}
      </MathJax>
    )
  }
}
