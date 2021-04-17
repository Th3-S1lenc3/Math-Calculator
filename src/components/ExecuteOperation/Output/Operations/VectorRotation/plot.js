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
      transformedVector[1],
    ];

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
    );
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
