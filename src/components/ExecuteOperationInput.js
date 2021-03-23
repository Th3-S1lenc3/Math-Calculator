import React, { Component } from 'react';
import { OperationContext } from './OperationContext';
import './css/ExecuteOperationInput.css';

import AddMatrices from './operations/display/addMatrices';
import SubtractMatrices from './operations/display/subtractMatrices';
import MultiplyMatrices from './operations/display/multiplyMatrices';
import ScalarMultiplication from './operations/display/scalarMultiplication';
import DivideMatrices from './operations/display/divideMatrices';
import ScalarDivision from './operations/display/scalarDivision';
import InvertMatrix from './operations/display/invertMatrix';
import TransposeMatrix from './operations/display/transposeMatrix';
import LinearEquations from './operations/display/linearEquations';
import SeriesOfFibonacci from './operations/display/seriesOfFibonacci';
import DiceProbability from './operations/display/diceProbability';
import SortSequence from './operations/display/sortSequence';
import DisplayDefault from './operations/display/default';

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
  default: DisplayDefault,
}

export default class ExecuteOperationInput extends Component {
  static contextType = OperationContext;

  constructor(props) {
    super(props);
  }

  render() {
    const classes = 'operationInput-Container border border-secondary rounded p-1';
    const { type } = this.context;
    let ChosenOperation;
    if ( type == '' || type == 'default') {
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
