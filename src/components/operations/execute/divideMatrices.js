import React, { Component } from 'react';
import { MathJax } from 'better-react-mathjax';

import { OperationContext } from '../../OperationContext';
import { getMatrices, newExecuteMatrix, ifDecimalC2Fraction, flipSign, ordinal_suffix_of, copy, getDeterminant } from '../utilities/utils';
import DisplayMatrix from '../utilities/DisplayMatrix';
import DisplayArray from '../utilities/DisplayArray';

export default class DivideMatrices extends Component {
  static contextType = OperationContext;

  divideMatrices() {
    console.log('Divide Matrices');
    const { showSteps } = this.context;
    let matrices = copy(getMatrices());
    let matricesOrignal = copy(getMatrices());
    const allEqual = arr => arr.every((value, i) => (value.length === arr[i].length));
    let m1 = copy(matrices[0]);
    let m2 = copy(matrices[1]);
    let rows = m1.length;
    let columns = m2[0].length;
    let newMatrix = newExecuteMatrix(rows, columns);
    let outputHold = [];

    let output = [];
    let outputTmp;

    if (!allEqual(matrices)) {
      return (
        <p key={0}>Invalid Operation. To divide matrices they must be the same dimension.</p>
      );
    }

    if (showSteps == 'true') {
      outputHold = [];

      outputTmp = (
        <p key={1}>$$Convert\ to\ multiplication: $$</p>
      )
      output.push(outputTmp);

      for (let j = 1; j <= matrices.length; j++) {
        var key = j + '=';
        let matrix = matricesOrignal[j-1];

        if (j != matricesOrignal.length) {
          outputTmp = (
            <p key={key + 1}>\(
              <DisplayMatrix rows={rows} columns={columns} matrix={matrix} /> \div
            \)</p>
          )
          outputHold.push(outputTmp);
        }
        else {
          outputTmp = (
            <p key={key + 2}>\(
              <DisplayMatrix rows={rows} columns={columns} matrix={matrix} /> =
            \)</p>
          )
          outputHold.push(outputTmp);
        }
      }

      for (let k = 1; k <= matrices.length; k++) {
        var key = k + '+';
        let matrix = matricesOrignal[k-1];

        if (k == 1) {
          outputTmp = (
            <p key={key + 1}>\(
              <DisplayMatrix rows={rows} columns={columns} matrix={matrix} /> \cdot
            \)</p>
          )
          outputHold.push(outputTmp);
        }
        else if (k != matricesOrignal.length) {
          outputTmp = (
            <p key={key + 1}>\(
              <DisplayMatrix rows={rows} columns={columns} matrix={matrix} />^{`{-1}`} \cdot
            \)</p>
          )
          outputHold.push(outputTmp);
        }
        else {
          outputTmp = (
            <p key={key + 2}>\(
              <DisplayMatrix rows={rows} columns={columns} matrix={matrix} />^{`{-1}`}
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

      outputTmp = (
        <p key={3}>$$Check\ every\ matrix\ after\ the\ {ordinal_suffix_of(1)}\ can\ be\ inverted:$$</p>
      );
      output.push(outputTmp);

      let detCheck = matricesOrignal.every((matrix, i) => {
        let determinant = 1;
        if (i != 0) {
          let key = i + '~'

          determinant = getDeterminant(matrix);

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
        }

        if (determinant == 0) {
          outputTmp = (
            <p key={key + 2}>$$The\ determinant\ of\ matrix\ {i + 1}\ is\ 0\ therefore\ the\ inverse\ cannot\ be\ determined.$$</p>
          )
          output.push(outputTmp);
        }

        return determinant != 0;
      });

      if (!detCheck) {
        return output;
      }
      else {
        outputTmp = (
          <p key={4}>$$Determinants\ exist\ for\ all\ matrices.$$</p>
        )
        output.push(outputTmp);
      }
    }

    newMatrix = matrices.reduce((resultantMatrix, matrix, i) => {
      let key = i + '-';
      let numberedMatrix = ordinal_suffix_of(i+1);
      let matrix1 = copy(resultantMatrix);
      let rows = matrix.length;
      let columns = matrix[0].length;

      resultantMatrix = [];
      for (let i = 0; i < rows; i++) {
        resultantMatrix.push([]);
      }

      let matrixOriginal = copy(matrix);

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

      let augmentedMatrixOriginal = copy(augmentedMatrix);

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
          matrix[r][c] = augmentedMatrix[r][c+columns];
        }
      }

      if (showSteps == 'true') {
        outputTmp = (
          <p key={key + 1}>$$Invert\ the\ {numberedMatrix}\ matrix:$$</p>
        )
        output.push(outputTmp);

        outputTmp = (
          <p key={key + 2}>$$
            <DisplayMatrix rows={rows} columns={columns} matrix={matrixOriginal} />
            \xrightarrow{`{\\text{Augment}}`}
            <DisplayArray rows={rows} columns={newColumns} matrix={augmentedMatrixOriginal} splitPoint={columns} separator={'|'} />
            \xrightarrow{`{\\text{Gaussian Elimination}}`}
            <DisplayArray rows={rows} columns={newColumns} matrix={augmentedMatrix} splitPoint={columns} separator={'|'} />
            \to
            <DisplayMatrix rows={rows} columns={columns} matrix={matrix} />
          $$</p>
        )
        output.push(outputTmp);
      }

      var tmpValue;
      for (let r = 0; r < rows; r++) {
        tmpValue = 0;
        for (let col = 0; col < columns; col++) {
          tmpValue = 0;
          for (let c = 0; c < columns; c++) {
            tmpValue += matrix1[r][c] * matrix[c][col];
          }
          resultantMatrix[r].push(tmpValue);
        }
      }

      if (showSteps == 'true') {
        if (i == 1) {
          outputTmp = (
            <p key={key + 3}>$$Multiply\ the\ rows\ of\ the\ {ordinal_suffix_of(1)}\ matrix\ by\ the\ columns\ of\ the\ {ordinal_suffix_of(2)}\ matrix: $$</p>
          )
          output.push(outputTmp);
        }
        else {
          outputTmp = (
            <p key={key + 3}>$$Multiply\ the\ rows\ of\ the\ resultant\ matrix\ by\ the\ columns\ of\ the\ {numberedMatrix}\ matrix: $$</p>
          )
          output.push(outputTmp);
        }

        outputTmp = (
          <p key={key + 4}>$$
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
      <p key={5}>$$Result: $$</p>
    )
    output.push(outputTmp);

    outputHold = [];

    for (let l = 1; l <= matricesOrignal.length; l++) {
      var key = l + '_';
      let matrix = matricesOrignal[l-1];

      if (l != matricesOrignal.length) {
        outputTmp = (
          <p key={key + 1}>\(
            <DisplayMatrix rows={rows} columns={columns} matrix={matrix} /> \div
          \)</p>
        )
        outputHold.push(outputTmp);
      }
      else {
        outputTmp = (
          <p key={key + 2}>\(
            <DisplayMatrix rows={rows} columns={columns} matrix={matrix} /> =
            <DisplayMatrix rows={rows} columns={columns} matrix={newMatrix} />
          \)</p>
        )
        outputHold.push(outputTmp);
      }
    }

    outputTmp = (
      <div key={6} style={{display: 'flex'}}>
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
        {this.divideMatrices()}
      </MathJax>
    )
  }
}
