import React, { Component } from 'react';

import { ifDecimalC2Fraction } from './utils';
import Entry from './Entry';

export default class DisplayArray extends Component {

  displayArray() {
    const { rows, columns, matrix } = this.props;
    let displayArray = [];
    let displayTmp;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        let key = `${r}-${c}`;
        displayTmp = (
          <Entry key={key}>{matrix[r][c]}</Entry>
        );
        displayArray.push(displayTmp);

        if ( c == columns - 1) {
          displayTmp = (
            <Entry key={key + 1}>\\</Entry>
          );
          displayArray.push(displayTmp);
        }
        else {
          displayTmp = (
            <Entry key={key + 5}>&</Entry>
          );
          displayArray.push(displayTmp);
        }
      }
    }

    return displayArray;
  }

  render() {
    let { splitPoint, separator } = this.props;

    for (let i = 0; i < splitPoint * 2; i++) {
      arrayType += 'r';
      if (i == splitPoint - 1) {
        arrayType += separator;
      }
    }

    return (
      <>\left[\begin{`{array}{${arrayType}}`}{this.displayArray()}\end{`{array}`}\right]</>
    )
  }
}
