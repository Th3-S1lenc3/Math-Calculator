import React, { Component } from 'react';
import { MathJax } from 'better-react-mathjax';

import { OperationContext } from '@OperationContext';
import {
  getMatrices,
  newExecuteMatrix,
  ifDecimalC2Fraction,
  flipSign,
  ordinal_suffix_of,
  copy,
  getLinearEquationsAsAugmentedMatrix,
  parseLinearEquationToDisplayString
} from '@utilities/utils';
import DisplayMatrix from '@utilities/DisplayMatrix';
import DisplayArray from '@utilities/DisplayArray';

export default class LinearEquations extends Component {
  static contextType = OperationContext;

  linearEquations() {
    console.log('Solving Linear Equations');
    const { showSteps } = this.context;
    let augmentedMatrix = getLinearEquationsAsAugmentedMatrix();
    const rows = augmentedMatrix.length
    const actualColumns = augmentedMatrix[0].length;
    const columns = actualColumns - 1;
    let equationRow = document.querySelector('.equation-row');
    let charCount = equationRow.querySelectorAll('.equation-char');
    let operatorCount = equationRow.querySelectorAll('.equation-operator');
    let newMatrix = newExecuteMatrix(rows, actualColumns - columns);
    let key = 0 + '-'

    let output = [];
    let outputTmp;

    if (rows != columns) {
      outputTmp = (
        <p key={key + 1}>$$Invalid\ Operation.\ The\ number\ of\ equations\ must\ be\ equal\ to\ the\ number\ of\ unknowns.$$</p>
      );
      output.push(outputTmp);
      return output;
    }

    let augmentedMatrixOriginal = copy(augmentedMatrix);

    for (let column = 0; column < columns; column++){
      let entry = 1 / augmentedMatrix[column][column];
      for (let col = column; col < actualColumns; col++ ) {
        augmentedMatrix[column][col] = entry * augmentedMatrix[column][col];
      }

      for (let row = 0; row < rows; row++) {
        if (row != column) {
          let entry = flipSign(augmentedMatrix[row][column]);
          for (let col = column; col < actualColumns; col++ ) {
            augmentedMatrix[row][col] = (entry * augmentedMatrix[column][col]) + augmentedMatrix[row][col];
          }

          let checkRow = [];
          let checkValue;
          let tmpValue = 0;
          for (let c = 0; c < columns; c++) {
            tmpValue += augmentedMatrix[row][c];
          }
          if (tmpValue == 0) {
            checkValue = 0;
            for (let c = columns; c < actualColumns; c++) {
              checkValue += augmentedMatrix[row][c];
            }
            if (checkValue == 0) {
              outputTmp = (
                <p key={key + 4}>\(Given\ that\ all\ unknowns\ equal\ 0,\ with\ all\ constants\ equaling\ 0, \)</p>
              );
              output.push(outputTmp);
              outputTmp = (
                <p key={key + 5}>\(it\ can\ be\ concluded\ that\ there\ are\ an\ infinite\ number\ of\ solutions\ to\ this\ system\ of\ linear\ equations.\)</p>
              )
              output.push(outputTmp);
              return output;
            }
            else if (showSteps){
              outputTmp = (
                <p key={key + 4}>\(Given\ that\ all\ unknowns\ equal\ 0,\ with\ a\ non-zero\ constant,\)</p>
              );
              output.push(outputTmp);
              outputTmp = (
                <p key={key + 5}>\(it\ can\ be\ concluded\ that\ there\ are\ an\ no\ solutions\ to\ this\ system\ of\ linear\ equations.\)</p>
              )
              output.push(outputTmp);
              return output;
            }
          }
        }
      }
    }
    let colDiff = 1;
    let matrix = newExecuteMatrix(rows, colDiff);
    for (let r = 0; r < rows; r++) {
      for (let c = columns; c < actualColumns; c++) {
        matrix[r][0] = augmentedMatrix[r][c];
      }
    }

    if (showSteps) {
      outputTmp = (
        <p key={key + 2}>\(Put\ equations\ into\ augmented\ matrix\ then\ perform\ gaussian\ elimination:\)</p>
      );
      output.push(outputTmp);

      outputTmp = (
        <p key={key + 3}>$$
          {parseLinearEquationToDisplayString()} \xrightarrow{`{\\text{Augment}}`}
          <DisplayArray rows={rows} columns={actualColumns} matrix={augmentedMatrixOriginal} splitPoint={columns} separator={'|'} />
          \xrightarrow{`{\\text{Gaussian Elimination}}`}
          <DisplayArray rows={rows} columns={actualColumns} matrix={augmentedMatrix} splitPoint={columns} separator={'|'} />
          \xrightarrow{`{\\text{Extract X and Y}}`}
          <DisplayMatrix rows={rows} columns={1} matrix={matrix} />
        $$</p>
      );
      output.push(outputTmp);
    }

    let constantMatrix = newExecuteMatrix(rows, colDiff);
    for (let r = 0; r < rows; r++) {
      for (let c = columns; c < actualColumns; c++) {
        constantMatrix[r][c - columns] = augmentedMatrixOriginal[r][c];
      }
    }

    let coefficientMatrix = newExecuteMatrix(rows, columns);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++ ) {
        coefficientMatrix[r][c] = augmentedMatrixOriginal[r][c];
      }
    }

    let verifyMatrix = [];
    for (let i = 0; i < rows; i++) {
      verifyMatrix.push([]);
    }

    let tmpValue;

    let m1_rows = coefficientMatrix.length
    let m2_cols = matrix.length

    for (let r = 0; r < m1_rows; r++) {
      tmpValue = 0;
      for (let col = 0; col < m2_cols; col++) {
        tmpValue = 0
        for (let c = 0; c < m2_cols; c++) {
          tmpValue += coefficientMatrix[r][c] * matrix[c][col];
        }
        verifyMatrix[r].push(tmpValue);
      }
    }

    if (verifyMatrix[0][0] != constantMatrix[0][0] && verifyMatrix[1][0] != constantMatrix[1][0]) {
      outputTmp = (
        <p key={key + 6}>\(Math\ Error.\ The\ coefficients \cdot x\ and\ y\ did\ not\ equal\ the\ constants.\)</p>
      )
      output.push(outputTmp);
      return output;
    }
    else if (showSteps) {
      outputTmp = (
        <p key={key + 7}>\(Verify\ x\ and\ y\ are\ correct:\)</p>
      );
      output.push(outputTmp);
      outputTmp = (
        <p key={key + 8}>$$
        <DisplayMatrix rows={rows} columns={columns} matrix={coefficientMatrix} /> \cdot
        <DisplayMatrix rows={rows} columns={1} matrix={matrix} /> =
        <DisplayMatrix rows={rows} columns={2} matrix={coefficientMatrix} separator={'\\cdot'} matrix2={matrix} type={'linearEquations'} /> =
        <DisplayMatrix rows={rows} columns={1} matrix={verifyMatrix} />
        $$</p>
      );
      output.push(outputTmp);
    }

    outputTmp = (
      <p key={key + 9}>\(Result: \)</p>
    );
    output.push(outputTmp);

    let resultArray = [];
    let resultTmp;

    for (let i = 0; i < charCount.length; i++) {
      resultTmp = (
        <>
        {charCount[i].innerText} & = & {ifDecimalC2Fraction(matrix[i][0])} \\
        </>
      )
      resultArray.push(resultTmp);
    }

    outputTmp = (
      <p key={key + 10}>$$
        \begin{`{array}{rrr}`}
        {resultArray}
        \end{`{array}`}
      $$</p>
    );
    output.push(outputTmp);

    return output;
  }

  render() {
    const classes = 'operationOutput';

    return (
      <MathJax className={classes}>
        {this.linearEquations()}
      </MathJax>
    )
  }
}
