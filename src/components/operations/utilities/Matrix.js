import React, { Component } from 'react';

import Span from './Span';

export default class Matrix extends Component {

  createMatrix() {
    const { rows, cols } = this.props
    const rowsArr = [];
    const colsArr = [];

    for (let i = 1; i <= cols; i++) {
      let col_id = 'column-' + i;
      let col = (
        <td key={i} id={col_id} className="matrix-column">
          <Span type="number" className="matrixInput p-1" placeholder='0' />
        </td>
      );
      colsArr.push(col);
    }

    for (let j = 1; j <= rows; j++) {
      let row_id = 'row-' + j;
      let row;

      row = (
        <tr key={j} id={row_id} className="matrix-row">
          {colsArr}
        </tr>
      );

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
