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
import PlotVectorTransformation from './Operations/VectorTransformation/plot';
import VectorRotation from './Operations/VectorRotation';
import PlotVectorRotation from './Operations/VectorRotation/plot';
import AdjacencyGraph from './Operations/AdjacencyGraph';
import ExecuteDefault from './Operations';

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
  vectorTransformation: VectorTransformation,
  plotVectorTransformation: PlotVectorTransformation,
  vectorRotation: VectorRotation,
  plotVectorRotation: PlotVectorRotation,
  adjacencyGraph: AdjacencyGraph,
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
    if (type == 'adjacencyGraph') {
      ChosenOperation = operations[type];
    }
    else if ( type == '' || type == 'default' || execute != true) {
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
