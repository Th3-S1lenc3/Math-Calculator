import React, { Component } from 'react';
import { OperationContext } from './OperationContext';
import './css/ExecuteOperationOutput.css';

import AddMatrices from './operations/execute/addMatrices';
import SubtractMatrices from './operations/execute/subtractMatrices';
import MultiplyMatrices from './operations/execute/multiplyMatrices';
import ScalarMultiplication from './operations/execute/scalarMultiplication';
import DivideMatrices from './operations/execute/divideMatrices';
import ScalarDivision from './operations/execute/scalarDivision';
import InvertMatrix from './operations/execute/invertMatrix';
import TransposeMatrix from './operations/execute/transposeMatrix';
import LinearEquations from './operations/execute/linearEquations';
import SeriesOfFibonacci from './operations/execute/seriesOfFibonacci';
import DiceProbability from './operations/execute/diceProbability';
import SortSequence from './operations/execute/sortSequence';
import ExecuteDefault from './operations/execute/default';

const operations = {
  addMatrices: AddMatrices,
  subtractMatrices: SubtractMatrices,
  multiplyMatrices: MultiplyMatrices,
  scalarMultiplication: ScalarMultiplication,
  divideMatrices: DivideMatrices,
  scalarDivision: ScalarDivision,
  invertMatrix: InvertMatrix,
  transposeMatrix: TransposeMatrix,
  linearEquations: LinearEquations,
  seriesOfFibonacci: SeriesOfFibonacci,
  diceProbability: DiceProbability,
  sortSequence: SortSequence,
  default: ExecuteDefault,
}

export default class ExecuteOperationOutput extends Component {
  static contextType = OperationContext;

  constructor(props) {
    super(props);
  }

  render() {
    const { type, execute } = this.context;
    const classes = 'operationOutput-Container border border-secondary rounded p-1';
    var ChosenOperation;
    if ( type == '' || type == 'default' || execute != true) {
      ChosenOperation = operations['default'];
    }
    else{
      ChosenOperation = operations[type];
    }

    return (
      <div className={classes}>
        <ChosenOperation />
      </div>
    )
  }
}
