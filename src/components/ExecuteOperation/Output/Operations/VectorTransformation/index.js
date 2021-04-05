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

export default class VectorTransformation extends Component {
  static contextType = OperationContext;

  transformVector() {
    console.log('Transforming vector');
    const { showSteps, dimensions: {count: dimensions}, setContext } = this.context;
    let matrices = getMatrices();
    let matricesOrignal = copy(matrices);
    let m1 = copy(matrices[1]);
    let m2 = copy(matrices[0]);
    let rows = m1.length;
    let columns = m2[0].length;
    let newMatrix = newExecuteMatrix(rows, columns);

    let output = [];
    let outputTmp;

    if (m1[0].length != m2.length) {
      return (
        <p key={0}>$$
          Invalid\ Operation.\ To\ multiply\ 2\ matrices\ there\ must\ be\ the\ same\ numbers\ columns\ in\ the\ {ordinal_suffix_of(1)}\ matrix
          \ as\ rows\ in\ the\ {ordinal_suffix_of(2)}\ matrix.
        $$</p>
      );
    }

    newMatrix = matrices.reduce((resultantMatrix, matrix1, i) => {
      let key = i + '-';
      let numberedMatrix = ordinal_suffix_of(i+1);
      let matrix = copy(resultantMatrix);

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
            tmpValue += matrix1[r][c] * matrix[c][col];
            if (columns == 1) {
              tmpValue += matrix1[r][c + 1] * matrix[c + 1][col];
            }
          }
          resultantMatrix[r].push(tmpValue);
        }
      }

      if (showSteps) {
        outputTmp = (
          <p key={key + 1}>$$
            Transform\ \vec{`{p}`}\ by\ T:
          $$</p>
        )
        output.push(outputTmp);

        let m1_rows = matrix1.length;
        let m1_columns = matrix1[0].length;

        let m_rows = matrix.length;
        let m_columns = matrix[0].length;

        outputTmp = (
          <p key={key + 2}>$$
          T\ \cdot \vec{`{p}`} =
          <DisplayMatrix rows={m1_rows} columns={m1_columns} matrix={matrix1} /> \cdot
          <DisplayMatrix rows={m_rows} columns={m_columns} matrix={matrix} /> =
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

    outputTmp = (
      <p key={2}>$$
        \vec{`{p'}`} =
        <DisplayMatrix rows={rows} columns={columns} matrix={newMatrix} />
      $$</p>
    );
    output.push(outputTmp);

    if (dimensions == 2) {
      outputTmp = (
        <div key={3} className='centre'>
          <button key={4} className='btn btn-success btn-md' onClick={() => {
            let target = [
              { name: 'type', value: 'plotVectorTransformation' },
              { name: 'execute', value: true }
            ];
            {setContext(target)};
          }}>Plot</button>
        </div>
      );
      output.push(outputTmp);
    }

    return output;
  }

  render() {
    const classes = 'operationOutput';

    return (
      <MathJax className={classes}>
        {this.transformVector()}
      </MathJax>
    )
  }
}
