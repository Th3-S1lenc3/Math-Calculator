import React, { Component } from 'react';
import JXGBoard from 'jsxgraph-react-js';

import { OperationContext } from '@OperationContext';
import {
  getMatrices,
  newExecuteMatrix,
  ifDecimalC2Fraction,
  ordinal_suffix_of,
  copy
} from '@utilities/utils';

export default class PlotVectorTransformation extends Component {
  static contextType = OperationContext;

  plotVectorTransformation() {
    let matrices = getMatrices();
    let matricesOrignal = copy(matrices);
    let m1 = copy(matrices[1]);
    let m2 = copy(matrices[0]);
    let rows = m1.length;
    let columns = m2[0].length;
    let newMatrix = newExecuteMatrix(rows, columns);

    newMatrix = matrices.reduce((resultantMatrix, matrix1, i) => {
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

      return resultantMatrix;
    });

    let vector = matricesOrignal[0];
    let transformedVector = newMatrix;

    let boundsX = [
      vector[0],
      transformedVector[0],
    ];

    let boundsY = [
      vector[1],
      transformedVector[1],
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
          {this.plotVectorTransformation()}
        </div>
      )
    }
  }
}
