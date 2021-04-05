import React, { Component } from 'react';
import JXGBoard from 'jsxgraph-react-js';

import { OperationContext } from '@OperationContext';
import {
  getMatrices,
  newExecuteMatrix,
  ifDecimalC2Fraction,
  ordinal_suffix_of,
  copy,
  getDeterminant
} from '@utilities/utils';

export default class PlotVectorRotation extends Component {
  static contextType = OperationContext;

  identityMatrix(dimensions) {
    let I = [];

    for (let r = 0; r < dimensions; r++) {
      I.push([]);
      for (let c = 0; c < dimensions; c++) {
        if (r == c) {
          I[r].push(1);
        }
        else {
          I[r].push(0);
        }
      }
    }

    return I;
  }

  multiplyMatrices(A, B) {
    let newMatrix = [];
    let tmpValue;

    let rows = A.length;
    let columns = B[0].length;

    if (typeof B !== 'object') {
      for (let r = 0; r < rows; r++) {
        newMatrix.push([]);
        for (let col = 0; col < columns; col++) {
          tmpValue = 0;
          for (let c = 0; c < columns; c++) {
            tmpValue += A[r][c] * B;
          }
          newMatrix[r].push(tmpValue);
        }
      }
    }
    else {
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
    }

    return newMatrix;
  }

  invertMatrix(A) {
    let newMatrix = [];

    let rows = A.length;
    let cols = A[0].length;
    let newCols = cols * 2;

    for(let r = 0; r < rows; r++) {
      newMatrix.push([]);
      for (let col = 0; col < cols; col++) {
        newMatrix[r].push(A[r][col])
      }
      for (let column = cols; column < newCols; column++) {
        if (r == column) {
          newMatrix[r].push(1);
        }
        else {
          newMatrix[r].push(0);
        }
      }
    }

    return newMatrix;
  }

  divideMatrices(A, B) {
    let determinant = getDeterminant(B);

    if (determinant == 0) {
      return;
    }

    let newMatrix = [];
    let tmpValue;

    let rows = A.length;
    let columns = B[0].length;

    let C;

    if (typeof B !== 'object') {
      C = 1 / B;
      for (let r = 0; r < rows; r++) {
        newMatrix.push([]);
        for (let col = 0; col < columns; col++) {
          tmpValue = 0;
          for (let c = 0; c < columns; c++) {
            tmpValue += A[r][c] * C;
          }
          newMatrix[r].push(tmpValue);
        }
      }
    }
    else {
      C = this.invertMatrix(B);
      for (let r = 0; r < rows; r++) {
        newMatrix.push([]);
        for (let col = 0; col < columns; col++) {
          tmpValue = 0;
          for (let c = 0; c < columns; c++) {
            tmpValue += A[r][c] * C[c][col];
          }
          newMatrix[r].push(tmpValue);
        }
      }
    }

    return newMatrix;
  }

  calcRotationMatrix(vector, theta) {
    // Implementation of the Aguilera-Perez Algorithm
    // Thanks to jodag on stackoverflow.com for (gender ? his : her) matlab implementation

    const { atan2, cos, sin } = Math;

    let n = vector.length;
    let M = this.identityMatrix(n);

    for (let c = 0; c < (n - 2); c ++) {
      for (let r = n; r >= (c + 1); r--) {
        let t = atan2(vector[r][c], vector[r-1][c]);
        let R = this.identityMatrix(n);
        R[r][r] = cos(t);
        R[r][r-1] = -sin(t);
        R[r-1][r] = sin(t);
        R[r-1][r-1] = cos(t);
        vector = this.multiplyMatrices(R, vector);
        M = this.multiplyMatrices(R, M);
        console.log(copy(t), copy(R), copy(vector), copy(M), copy(r), copy(c))
      }
    }

    let R = this.identityMatrix(n);
    R[n-2][n-2] = cos(-theta);
    R[n-2][n-1] = -sin(-theta);
    R[n-1][n-2] = sin(-theta);
    R[n-1][n-1] = cos(-theta);

    M = this.divideMatrices(M, this.multiplyMatrices(R, M));

    return M;
  }

  plotVectorRotation() {
    const { showSteps, dimensions: {count: dimensions}, setContext } = this.context;
    let vector = getMatrices()[0];
    let angle = document.querySelector('.theta').innerText;
    let rows = vector.length;
    let columns = vector[0].length;
    let newMatrix = newExecuteMatrix(rows, columns);

    let rotationMatrix = this.calcRotationMatrix(vector, angle);

    let transformedVector = this.multiplyMatrices(rotationMatrix, vector);

    let boundsX = [
      vector[0],
      transformedVector[0],

    ];

    let boundsY = [
      vector[1],
      transformedVector[1]
    ]

    let logicJS = (board) => {
      board.suspendUpdate();
      let p = board.create('point', [Number(vector[0]), Number(vector[1])], {size:3, name: 'p'});
      let pA = board.create('line', [[0,0], p], {straightFirst:false, straightLast:false, lastArrow:true});
      let transformedP = board.create('point', [Number(transformedVector[0]), Number(transformedVector[1])], {size:3, name: 'p\''});
      let transformedPA = board.create('line', [[0,0], transformedP], {straightFirst:false, straightLast:false, lastArrow:true});
      board.unsuspendUpdate();
    }

    let nX = Math.min(...boundsX) - 5;
    let x = Math.max(...boundsX) + 5;
    let nY = Math.min(...boundsY) - 5;
    let y = Math.max(...boundsY) + 5;

    return (
      <JXGBoard logic={logicJS} boardAttributes={{
        axis: true,
        boundingbox: [nX, y, x, nY],
        drag: {
          enabled: true
        },
      }} />
    )
  }

  render() {
    const {dimensions: {count: dimensions}} = this.context;

    if (dimensions != 2) {
      return (
        <div className="defaultAlert alert alert-danger">
          Cannot plot vector transformation as dimensions are greater than 2.
        </div>
      )
    }
    else {
      return (
        <div className='operationOutput'>
          {this.plotVectorRotation()}
        </div>
      )
    }
  }
}
