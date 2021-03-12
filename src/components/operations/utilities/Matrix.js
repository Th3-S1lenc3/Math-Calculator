import React, { Component } from 'react';

export default class Matrix extends Component {

  createMatrix() {
    const { rows, cols } = this.props
    const rowsArr = [];
    const colsArr = [];
    const bracketStyle = {
      transform: "scale(1.2, "+ rows * 2 +") translateY(-1px)"
    }
    const bracketType = '()'.split('');

    for (var i = 1; i <= cols; i++) {
      var col_id = 'column-' + i;
      var col = (
        <td key={i} id={col_id} className="matrix-column">
          <input type="number" className="matrixInput"></input>
        </td>
      );
      colsArr.push(col);
    }

    for (var j = 1; j <= rows; j++) {
      var row_id = 'row-' + j;
      var row;

      if (j == 1) {
        row = (
          <tr key={j} id={row_id} className="matrix-row">
            <td rowSpan={rows} style={bracketStyle}>{bracketType[0]}</td>
            {colsArr}
            <td rowSpan={rows} style={bracketStyle}>{bracketType[1]}</td>
          </tr>
        );
      }
      else {
        row = (
          <tr key={j} id={row_id} className="matrix-row">
            {colsArr}
          </tr>
        );
      }

      rowsArr.push(row)
  }


    return rowsArr;
  }

  render() {
    const { id } = this.props
    const prefixed_id = 'matrix-' + id;

    return (
      <table className="matrix">
        <tbody id={prefixed_id}>
          {this.createMatrix()}
        </tbody>
      </table>
    )
  }
}
