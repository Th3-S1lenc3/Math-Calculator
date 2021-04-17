import React, { Component } from 'react';
import { OperationContext } from '@OperationContext';
import './index.css';

import AddMatrices from './Operations/AddMatrices';
import SubtractMatrices from './Operations/SubtractMatrices';
import MultiplyMatrices from './Operations/MultiplyMatrices';
import ScalarMultiplication from './Operations/ScalarMultiplication';
import DivideMatrices from './Operations/DivideMatrices';
import ScalarDivision from './Operations/ScalarDivision';
import InvertMatrix from './Operations/InvertMatrix';
import TransposeMatrix from './Operations/TransposeMatrix';
import LinearEquations from './Operations/LinearEquations';
import SeriesOfFibonacci from './Operations/SeriesOfFibonacci';
import DiceProbability from './Operations/DiceProbability';
import SortSequence from './Operations/SortSequence';
import VectorTransformation from './Operations/VectorTransformation';
import VectorRotation from './Operations/VectorRotation';
import AdjacencyGraph from './Operations/AdjacencyGraph';
import DisplayDefault from './Operations';

export default class ExecuteOperationInput extends Component {
  static contextType = OperationContext;

  operations = {
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
    vectorTransformation: VectorTransformation,
    plotVectorTransformation: VectorTransformation,
    vectorRotation: VectorRotation,
    plotVectorRotation: VectorRotation,
    adjacencyGraph: AdjacencyGraph,
    default: DisplayDefault,
  }

  render() {
    const operations = this.operations;
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
