import React, { Component } from 'react';
import { MathJax } from 'better-react-mathjax';

import { OperationContext } from '@OperationContext';
import {
  getMatrices,
  newExecuteMatrix,
  ifDecimalC2Fraction,
  ordinal_suffix_of,
  copy,
  getDeterminant
} from '@utilities/utils';
import DisplayMatrix from '@utilities/DisplayMatrix';

export default class VectorRotation extends Component {
  static contextType = OperationContext;

  multiplyMatrices(A, B) {
    let newMatrix = [];
    let tmpValue;
    let rows = A.length;
    let columns = B[0].length;

    for (let r = 0; r < rows; r++) {
      newMatrix.push([]);
      for (let col = 0; col < columns; col++) {
        tmpValue = 0;
        for (let c = 0; c < columns; c++) {
          tmpValue += A[r][c] * B[c][col];
        }
        newMatrix[r].push(tmpValue);
      }
    }

    return newMatrix;
  }

  rotationMatrix_2D(theta) {
    const { cos, sin } = Math;
    let rotationMatrix = newExecuteMatrix(2,2);

    rotationMatrix[0][0] = cos(theta);
    rotationMatrix[0][1] = -sin(theta);
    rotationMatrix[1][0] = sin(theta);
    rotationMatrix[1][1] = cos(theta);

    return rotationMatrix;
  }

  rotationMatrix_3D(theta) {
    const { cos, sin } = Math;
    let rotationMatrix_X = newExecuteMatrix(3,3);
    let rotationMatrix_Y = newExecuteMatrix(3,3);
    let rotationMatrix_Z = newExecuteMatrix(3,3);

    rotationMatrix_X[0][0] = 1;
    rotationMatrix_X[1][1] = cos(theta);
    rotationMatrix_X[1][2] = -sin(theta);
    rotationMatrix_X[2][1] = sin(theta);
    rotationMatrix_X[2][2] = cos(theta);

    rotationMatrix_Y[0][0] = cos(theta);
    rotationMatrix_Y[0][2] = sin(theta);
    rotationMatrix_Y[1][1] = 1;
    rotationMatrix_Y[2][0] = -sin(theta);
    rotationMatrix_Y[2][3] = cos(theta);

    rotationMatrix_Z[0][0] = cos(theta);
    rotationMatrix_Z[0][1] = -sin(theta);
    rotationMatrix_Z[1][0] = sin(theta);
    rotationMatrix_Z[1][1] = cos(theta);
    rotationMatrix_Z[2][2] = 1;

    let rotationMatrix = this.multiplyMatrices(
      this.multiplyMatrices(rotationMatrix_X, rotationMatrix_Y),
      rotationMatrix_Z
    );

    return rotationMatrix;
  }

  calcRotationMatrix(dimensions, theta) {
    switch (dimensions) {
      case 2:
        return this.rotationMatrix_2D(theta);
        break;
      case 3:
        return this.rotationMatrix_3D(theta);
        break;
    }
  }

  rotateVector() {
    console.log('Rotating vector');
    const { showSteps, dimensions: {count: dimensions}, setContext } = this.context;
    let vector = getMatrices()[0];
    let angle = document.querySelector('.theta').innerText;
    let rows = vector.length;
    let columns = vector[0].length;
    let newMatrix = newExecuteMatrix(rows, columns);

    let key = '0-';
    let output = [];
    let outputTmp;

    let rotationMatrix = this.calcRotationMatrix(dimensions, angle);
    let rM_rows = rotationMatrix.length;
    let rM_columns = rotationMatrix[0].length;

    let newVector = this.multiplyMatrices(rotationMatrix, vector);
    let nV_rows = newVector.length;
    let nV_columns = newVector[0].length;

    if (showSteps) {
      outputTmp = (
        <p key={key + 1}>$$
          Rotate\ \vec{`{p}`}\ by\ \theta:
        $$</p>
      );
      output.push(outputTmp);

      outputTmp = (
        <p key={key + 2}>$$
          R(\theta) =
          <DisplayMatrix rows={rM_rows} columns={rM_columns} matrix={rotationMatrix} />
        $$</p>
      );
      output.push(outputTmp);

      outputTmp = (
        <p key={key + 3}>$$
          R(\theta) \cdot \vec{`{p}`} =
          <DisplayMatrix rows={rM_rows} columns={rM_columns} matrix={rotationMatrix} /> \cdot
          <DisplayMatrix rows={rows} columns={columns} matrix={vector} /> =
           <DisplayMatrix
            rows={rows}
            columns={columns}
            matrix={rotationMatrix}
            separator={'\\cdot'}
            matrix2={vector}
            type={'multiply'}
          /> =
          <DisplayMatrix rows={nV_rows} columns={nV_columns} matrix={newVector} />
        $$</p>
      );
      output.push(outputTmp);
    }

    outputTmp = (
      <p key={1}>$$Result: $$</p>
    );
    output.push(outputTmp);

    outputTmp = (
      <p key={2}>$$
        \vec{`{p'}`} =
        <DisplayMatrix rows={nV_rows} columns={nV_columns} matrix={newVector} />
      $$</p>
    );
    output.push(outputTmp);

    if (dimensions == 2) {
      outputTmp = (
        <div key={3} className='centre'>
          <button key={4} className='btn btn-success btn-md' onClick={() => {
            let target = [
              { name: 'type', value: 'plotVectorRotation' },
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
        {this.rotateVector()}
      </MathJax>
    )
  }
}
