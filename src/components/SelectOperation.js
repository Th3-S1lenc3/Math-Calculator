import React, { Component } from 'react';
import './css/SelectOperation.css';

import { OperationContext } from './OperationContext';

export default class SelectOperation extends Component {
  static contextType = OperationContext;

  render() {
    const classes = 'select-operation centre';
    const { setContext, showMatrixOperations } = this.context;

    if (showMatrixOperations) {
      return (
        <div className={classes}>
          <select onChange={() => {
            const target = { name: 'type', value: event.target.value };
            {setContext(target)}
          }} className="custom-select custom-select-sm">
            <option defaultValue hidden>Select an operation</option>
            <optgroup label="General">
              <option value="addMatrices">Add Matrices</option>
              <option value="subtractMatrices">Subtract Matrices</option>
            </optgroup>
            <optgroup label="Multiply">
              <option value="multiplyMatrices">Multiply Matrices</option>
              <option value="scalarMultiplication">Multiply matrix by scalar</option>
            </optgroup>
            <optgroup label="Divide">
              <option value="divideMatrices">Divide Matrices</option>
              <option value="scalarDivision">Divide matrix by scalar</option>
            </optgroup>
            <optgroup label="Other">
              <option value="invertMatrix">Invert Matrix</option>
              <option value="transposeMatrix">Transpose Matrix</option>
            </optgroup>
          </select>
        </div>
      )
    }
    else {
      return (
        <div className={classes}>
          <select onChange={() => {
            const target = { name: 'type', value: event.target.value };
            {setContext(target)}
          }} className="custom-select custom-select-sm">
            <option defaultValue hidden>Select an operation</option>
            <option value="linearEquations">Solve Systems of Linear Equations</option>
            <option disabled value="seriesOfFibbonaci">Calculate series of digit in Fibbonaci Sequence</option>
            <option disabled value="diceProbability">Dice Probability</option>
            <option disabled value="sortSequence">Sort Sequence of Numbers</option>
          </select>
        </div>
      )
    }
  }
}
<select>
  <optgroup label="Level One"></optgroup>
  <option style="padding-left:15px"> A.1 </option>
  <optgroup label="Level Two" style="padding-left:15px"></optgroup>
  <option style="padding-left:30px"> A.B.1 </option>
  <option style="padding-left:15px"> A.2 </option>
  <option> A </option>
</select>
