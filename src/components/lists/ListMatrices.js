import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretLeft } from '@fortawesome/free-solid-svg-icons';

import { OperationContext } from '../OperationContext';

import './css/ListMatrices.css';

class DropdownBtn extends Component {
  state = { clicked: false };

  toggleDropdown(event) {
    let target = event.target;
    let dropdownContent = target.nextElementSibling;
    if (dropdownContent.style.display === "block") {
     dropdownContent.style.display = "none";
    }
    else {
     dropdownContent.style.display = "block";
    }

    this.setState(() => ({
      clicked: !this.state.clicked
    }));
  }

  render() {
    let { matrixID } = this.props;

    return (
      <button key={matrixID} className='dropdown-btn' onClick={(event) => {this.toggleDropdown(event)}}>
        Matrix {matrixID}
        <FontAwesomeIcon icon={this.state.clicked ? faCaretDown : faCaretLeft} className='float-right'/>
      </button>
    )
  }
}

class F extends Component {
  render() {
    return (
      <>{this.props.children}</>
    )
  }
}

const rules = {
  addMatrices: 'square',
  subtractMatrices: 'square',
  multiplyMatrices: 'rectangle',
  scalarMultiplication: 'one',
  divideMatrices: 'square',
  scalarDivision: 'one',
  invertMatrix: 'one',
  transposeMatrix: 'one',
}

export default class ListMatrices extends Component {
  static contextType = OperationContext;

  handleDecrement(event, identifier) {
    const { type, matrices, updateMatrix, deleteMatrix } = this.context;

    let rule = rules[type];

    if (rule == 'rectangle' && Object.keys(matrices).length > 2 ) {
      rule = 'square'
    }

    if (identifier == "matrix") {
      if (Object.keys(matrices).length > 2 && rule != "one") {
        let lastMatrix = Object.keys(matrices).pop();
        let target = { matrix: lastMatrix};
        deleteMatrix(target);
      }
      else if (rule == 'one' && Object.keys(matrices).length >= 2) {
        let lastMatrix = Object.keys(matrices).pop();
        let target = { matrix: lastMatrix};
        deleteMatrix(target);
      }
      return;
    }

    if (rule == 'square') {
      for (let matrix in matrices) {
        let rows = matrices[matrix].rows - 1;
        let columns = matrices[matrix].columns - 1;

        if (rows < 2) {
          rows = 2;
        }

        if (columns < 2) {
          columns = 2;
        }

        let target = { matrix: matrix, value: {rows: rows, columns: columns}};
        updateMatrix(target);
      }
    }
    else {
      let eTarget = event.target;
      let targetMatrixID = eTarget.classList[0];
      let targetMatrix = 'matrix_' + targetMatrixID;

      if (identifier == "row") {
        let rows = matrices[targetMatrix].rows - 1;
        let columns = matrices[targetMatrix].columns;

        if (rows < 2) {
          rows = 2;
        }

        if (columns < 2) {
          columns = 2;
        }

        let target = { matrix: targetMatrix, value: {rows: rows, columns: columns}};
        updateMatrix(target);
      }
      else if (identifier == "column") {
        let rows = matrices[targetMatrix].rows;
        let columns = matrices[targetMatrix].columns - 1;

        if (rows < 2) {
          rows = 2;
        }

        if (columns < 2) {
          columns = 2;
        }

        let target = { matrix: targetMatrix, value: {rows: rows, columns: columns}};
        updateMatrix(target);
      }
    }
  }

  handleIncrement(event, identifier) {
    const { type, matrices, updateMatrix } = this.context;

    let rule = rules[type];

    if (rule == 'rectangle' && Object.keys(matrices).length > 2 ) {
      rule = 'square'
    }

    if (identifier == "matrix") {
      if (rule != "one") {
        let lastMatrix = Object.keys(matrices).pop();
        let lastMatrixID = Number(lastMatrix.split('_')[1]);
        let newMatrix = 'matrix_' + (lastMatrixID + 1);
        let target = { matrix: newMatrix, value: {rows: 2, columns: 2}};
        updateMatrix(target);
      }
      return;
    }

    if (rule == 'square') {
      for (let matrix in matrices) {
        let rows = matrices[matrix].rows + 1;
        let columns = matrices[matrix].columns + 1;

        let target = { matrix: matrix, value: {rows: rows, columns: columns}};
        updateMatrix(target);
      }
    }
    else {
      let eTarget = event.target;
      let targetMatrixID = eTarget.classList[0];
      let targetMatrix = 'matrix_' + targetMatrixID;

      if (identifier == "row") {
        let rows = matrices[targetMatrix].rows + 1;
        let columns = matrices[targetMatrix].columns;

        let target = { matrix: targetMatrix, value: {rows: rows, columns: columns}};
        updateMatrix(target);
      }
      else if (identifier == "column") {
        let rows = matrices[targetMatrix].rows;
        let columns = matrices[targetMatrix].columns + 1;

        let target = { matrix: targetMatrix, value: {rows: rows, columns: columns}};
        updateMatrix(target);
      }
    }
  }

  listMatrices() {
    const { matrices } = this.context;
    let matrixCount = Object.keys(matrices).length;
    let key = 0 + '-';

    let output = [];
    let outputTmp;

    outputTmp = (
      <a key={key + 1} className="navbar-brand">Matrices</a>
    );
    output.push(outputTmp);

    let classes = 'btn btn-secondary';

    outputTmp = (
      <div key={key + 2} className="btn-group centre">
        <button type="button" className={classes} onClick={(event) => {this.handleDecrement(event, 'matrix')}}>-</button>
        <button type="button" className={classes}>Matrices: {matrixCount}</button>
        <button type="button" className={classes} onClick={(event) => {this.handleIncrement(event, 'matrix')}}>+</button>
      </div>
    );
    output.push(outputTmp);

    let outputHold = [];
    let i = 0;
    for (let matrix in matrices) {
      let key = i + '_';
      let matrixRawName = JSON.stringify(matrix);
      let matrixID = matrixRawName.split('_')[1];
      matrixID = matrixID.substr(0, matrixID.length -1);
      let rows = matrices[matrix].rows;
      let columns = matrices[matrix].columns;
      let classes = matrixID + ' btn btn-secondary'
      outputTmp = (
        <F key={key + i}>
          <DropdownBtn matrixID={matrixID}/>
          <div key={key + i + i} className='dropdown-container'>
            <div key={key + i + i + i} className='btn-group centre'>
              <button type="button" className={classes} onClick={(event) => {this.handleDecrement(event, 'row')}}>-</button>
              <button type="button" className={classes}>Rows: {rows}</button>
              <button type="button" className={classes} onClick={(event) => {this.handleIncrement(event, 'row')}}>+</button>
            </div>
            <div key={key + i + i + i + i} className='btn-group centre pt-1'>
              <button type="button" className={classes} onClick={(event) => {this.handleDecrement(event, 'column')}}>-</button>
              <button type="button" className={classes}>Columns: {columns}</button>
              <button type="button" className={classes} onClick={(event) => {this.handleIncrement(event, 'column')}}>+</button>
            </div>
          </div>
        </F>
      )
      outputHold.push(outputTmp);
      i++;
    }

    outputTmp = (
      <div key={key +  3} className='list-inner'>
        {outputHold}
      </div>
    )
    output.push(outputTmp);

    return (output);
  }

  render() {
    const { type } = this.context;

    if (type == 'default' || !rules.hasOwnProperty(type)) {
      return (
        <></>
      )
    }
    else {
      return (
        <F key={0}>
          {this.listMatrices()}
        </F>
      )
    }
  }
}
