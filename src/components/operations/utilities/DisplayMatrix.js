import React, { Component } from 'react';

import { ifDecimalC2Fraction } from './utils';

const Entry = ({ entry }) => <>{entry}</>;

export default class DisplayMatrix extends Component {

  displayMatrix() {
    const { rows, columns, matrix } = this.props;
    let displayArray = [];
    let displayTmp;

    if (typeof this.props.type !== 'undefined' && this.props.type == 'multiply') {
      let { separator, matrix2 } = this.props;
      for (let r = 0; r < rows; r++) {
        for (let col = 0; col < columns; col++) {
          let key = r + '-' + col;
          for (let c = 0; c < columns; c++) {
            let key = r + '~' + col + '~' + c;
            displayTmp = (
              <Entry key={key + 1} entry={ifDecimalC2Fraction(matrix[r][c])} />
            )
            displayArray.push(displayTmp);

            displayTmp = (
              <Entry key={key + 2} entry={separator} />
            )
            displayArray.push(displayTmp);

            displayTmp = (
              <Entry key={key + 3} entry={ifDecimalC2Fraction(matrix2[c][col])} />
            );
            displayArray.push(displayTmp);

            if (c != columns - 1) {
              displayTmp = (
                <Entry key={key + 4} entry={'+'} />
              );
              displayArray.push(displayTmp);
            }
          }
          if (col != columns - 1) {
            displayTmp = (
              <Entry key={key + 5} entry={'&'} />
            )
            displayArray.push(displayTmp);
          }
        }
        displayTmp = (
          <Entry key={r + '_0'} entry={'\\\\'} />
        )
        displayArray.push(displayTmp);
      }
    }
    else if (typeof this.props.type !== 'undefined' && this.props.type == 'linearEquations') {
      let { separator, matrix2 } = this.props;
      for (let r = 0; r < rows; r++) {
        for (let col = 0; col < columns - 1; col++) {
          let key = r + '-' + col;
          for (let c = 0; c < columns; c++) {
            let key = r + '~' + col + '~' + c;
            if (c != 0 && Math.sign(matrix[r][c]) == -1) {
              displayArray.pop();
            }
            displayTmp = (
              <Entry key={key + 1} entry={ifDecimalC2Fraction(matrix[r][c])} />
            )
            displayArray.push(displayTmp);

            displayTmp = (
              <Entry key={key + 2} entry={separator} />
            )
            displayArray.push(displayTmp);

            displayTmp = (
              <Entry key={key + 3} entry={ifDecimalC2Fraction(matrix2[c][col])} />
            );
            displayArray.push(displayTmp);

            if (c == 0) {
              displayTmp = (
                <Entry key={key + 4} entry={'+'} />
              );
              displayArray.push(displayTmp);
            }
          }
        }
        displayTmp = (
          <Entry key={r + '_0'} entry={'\\\\'} />
        )
        displayArray.push(displayTmp);
      }
    }
    else {
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          let key = r + '-' + c;
          displayTmp = (
            <Entry key={key} entry={ifDecimalC2Fraction(matrix[r][c])} />
          )
          displayArray.push(displayTmp);
          if (typeof this.props.separator !== 'undefined') {
            let { separator } = this.props;
            if (typeof this.props.matrix2 !== 'undefined') {
              let { matrix2 } = this.props;
              displayTmp = (
                <Entry key={key + 2} entry={separator} />
              )
              displayArray.push(displayTmp);
              displayTmp = (
                <Entry key={key + 3} entry={ifDecimalC2Fraction(matrix2[r][c])} />
              );
              displayArray.push(displayTmp);
            }
            else if (typeof this.props.scalar !== 'undefined') {
              let { scalar } = this.props;
              displayTmp = (
                <Entry key={key + 2} entry={separator} />
              )
              displayArray.push(displayTmp);
              displayTmp = (
                <Entry key={key + 3} entry={ifDecimalC2Fraction(scalar)} />
              );
              displayArray.push(displayTmp);
            }
          }

          if ( c == columns - 1) {
            displayTmp = (
              <Entry key={key + 1} entry={'\\\\'} />
            )
            displayArray.push(displayTmp);
          }
          else {
            displayTmp = (
              <Entry key={key + 5} entry={'&'} />
            )
            displayArray.push(displayTmp);
          }
        }
      }
    }

    return displayArray;
  }

  render() {
    let matrixType;
    let specialTypes = ['multiply', 'linearEquations'];

    if (typeof this.props.type !== 'undefined' && !specialTypes.includes(this.props.type)) {
      let { type } = this.props;
      matrixType = '{' + type + '}';
    }
    else {
      matrixType = '{bmatrix}';
    }

    return (
      <>\begin{matrixType}{this.displayMatrix()}\end{matrixType} </>
    )
  }
}
