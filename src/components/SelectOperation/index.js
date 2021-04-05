import React, { Component } from 'react';
import './index.css';
import './navbar-fixed-left.css';

import { OperationContext } from '@OperationContext';

import SelectOperation from './SelectOperation';
import ShowMatrixOperations from './ShowMatrixOperations';
import OperationDetail from './OperationDetail';
import OutputDetail from './OutputDetail';
import BtnCalculate from './BtnCalculate';
import Matrices from './Lists/Matrices';
import Equations from './Lists/Equations';
import Vectors from './Lists/Vectors';
import AdjacencyGraph from './Lists/AdjacencyGraph';
import ListDefault from './Lists';

const lists = {
  listMatrices: Matrices,
  listEquations: Equations,
  listVectors: Vectors,
  listAdjacencyGraph: AdjacencyGraph,
  default: ListDefault,
}

export default class SelectOperationContainer extends Component {
  static contextType = OperationContext;

  render() {
    const classes = 'select-operation-container navbar navbar-expand-md navbar-dark bg-dark fixed-left';
    const { setContext, showMatrixOperations, type, showListInfo } = this.context;
    let showAttributes;

    if (showListInfo) {
      showAttributes = {display: 'block'}
    }
    else {
      showAttributes = {display: 'none'}
    }

    let List = lists['default'];

    if (showMatrixOperations && type != 'default') {
      List = lists['listMatrices'];
    }
    else {
      switch (type) {
        case 'linearEquations':
          List = lists['listEquations'];
          break;
        case 'vectorTransformation':
          List = lists['listVectors'];
          break;
        case 'vectorRotation':
          List = lists['listVectors'];
          break;
        case 'adjacencyGraph':
          List = lists['listAdjacencyGraph'];
          break;
        default:
          List = lists['default'];
          break;
      }
    }

    return (
      <nav className={classes}>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav sidebar">
            <div className="configure-operation">
              <a className="navbar-brand">Configure Operation</a>
              <li className="nav-item"><SelectOperation /></li>
              <li className="nav-link"><ShowMatrixOperations /></li>
              <li className="nav-link"><OperationDetail /></li>
              <li className="nav-link"><OutputDetail /></li>
              <li className="nav-item"><BtnCalculate /></li>
            </div>
            <div className="list">
              <a className="navbar-brand" style={showAttributes}>Attributes</a>
              <List />
            </div>
          </ul>
        </div>
      </nav>
    )
  }
}
