import React, { Component } from 'react';

import { OperationContext } from '@OperationContext';
import { ifDecimalC2Fraction } from './utils';
import Entry from './Entry';

export default class DisplayMatrix extends Component {
  static contextType = OperationContext

  displayMultiply() {
    const { rows, columns, matrix, separator, matrix2 } = this.props;
    let displayArray = [];
    let displayTmp;

    for (let r = 0; r < rows; r++) {
      for (let col = 0; col < columns; col++) {
        let key = r + '-' + col;
        for (let c = 0; c < columns; c++) {
          let key = r + '~' + col + '~' + c;
          displayTmp = (
            <Entry key={key + 1}>{matrix[r][c]}</Entry>
          )
          displayArray.push(displayTmp);

          displayTmp = (
            <Entry key={key + 2}>{separator}</Entry>
          )
          displayArray.push(displayTmp);

          displayTmp = (
            <Entry key={key + 3}>{matrix2[c][col]}</Entry>
          );
          displayArray.push(displayTmp);

          if (c != columns - 1) {
            displayTmp = (
              <Entry key={key + 4}>+</Entry>
            );
            displayArray.push(displayTmp);
          }
          else if (columns == 1) {
            displayTmp = (
              <Entry key={key + 5}>+</Entry>
            );
            displayArray.push(displayTmp);

            displayTmp = (
              <Entry key={key + 6}>{matrix[r][c + 1]}</Entry>
            )
            displayArray.push(displayTmp);

            displayTmp = (
              <Entry key={key + 7}>{separator}</Entry>
            )
            displayArray.push(displayTmp);

            displayTmp = (
              <Entry key={key + 8}>{matrix2[c + 1][col]}</Entry>
            );
            displayArray.push(displayTmp);
          }
        }
        if (col != columns - 1) {
          displayTmp = (
            <Entry key={key + 9}>&</Entry>
          )
          displayArray.push(displayTmp);
        }
      }
      displayTmp = (
        <Entry key={r + '_0'}>\\</Entry>
      )
      displayArray.push(displayTmp);
    }

    return displayArray;
  }

  displayLinearEquations() {
    const { rows, columns, matrix, separator, matrix2 } = this.props;
    let displayArray = [];
    let displayTmp;

    for (let r = 0; r < rows; r++) {
      for (let col = 0; col < columns - 1; col++) {
        let key = r + '-' + col;
        for (let c = 0; c < columns; c++) {
          let key = r + '~' + col + '~' + c;
          if (c != 0 && Math.sign(matrix[r][c]) == -1) {
            displayArray.pop();
          }
          displayTmp = (
            <Entry key={key + 1}>{matrix[r][c]}</Entry>
          )
          displayArray.push(displayTmp);

          displayTmp = (
            <Entry key={key + 2}>{separator}</Entry>
          )
          displayArray.push(displayTmp);

          displayTmp = (
            <Entry key={key + 3}>{matrix2[c][col]}</Entry>
          );
          displayArray.push(displayTmp);

          if (c == 0) {
            displayTmp = (
              <Entry key={key + 4}>+</Entry>
            );
            displayArray.push(displayTmp);
          }
        }
      }
      displayTmp = (
        <Entry key={r + '_0'}>\\</Entry>
      )
      displayArray.push(displayTmp);
    }

    return displayArray;
  }

  displayGeneral() {
    const { rows, columns, matrix, separator, matrix2 } = this.props;
    let displayArray = [];
    let displayTmp;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        let key = r + '-' + c;
        displayTmp = (
          <Entry key={key}>{matrix[r][c]}</Entry>
        )
        displayArray.push(displayTmp);
        if (typeof this.props.separator !== 'undefined') {
          let { separator } = this.props;
          if (typeof this.props.matrix2 !== 'undefined') {
            let { matrix2 } = this.props;
            displayTmp = (
              <Entry key={key + 2}>{separator}</Entry>
            )
            displayArray.push(displayTmp);
            displayTmp = (
              <Entry key={key + 3}>{matrix2[r][c]}</Entry>
            );
            displayArray.push(displayTmp);
          }
          else if (typeof this.props.scalar !== 'undefined') {
            let { scalar } = this.props;
            displayTmp = (
              <Entry key={key + 2}>{separator}</Entry>
            )
            displayArray.push(displayTmp);
            displayTmp = (
              <Entry key={key + 3}>{scalar}</Entry>
            );
            displayArray.push(displayTmp);
          }
        }

        if ( c == columns - 1) {
          displayTmp = (
            <Entry key={key + 1}>\\</Entry>
          )
          displayArray.push(displayTmp);
        }
        else {
          displayTmp = (
            <Entry key={key + 5}>&</Entry>
          )
          displayArray.push(displayTmp);
        }
      }
    }
    return displayArray;
  }

  displayMatrix() {
    const { type } = this.props;

    if (type == 'multiply') {
      return this.displayMultiply();
    }
    else if (type == 'linearEquations') {
      return this.displayLinearEquations();
    }
    else {
      return this.displayGeneral();
    }
  }

  render() {
    let matrixType;
    let specialTypes = ['multiply', 'linearEquations'];

    if (typeof this.props.type !== 'undefined' && !specialTypes.includes(this.props.type)) {
      let { type } = this.props;
      matrixType = `{${type}}`;
    }
    else {
      matrixType = '{bmatrix}';
    }

    return (
      <>\begin{matrixType}{this.displayMatrix()}\end{matrixType} </>
    )
  }
}
