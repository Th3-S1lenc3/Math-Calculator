import React, { Component } from 'react';
import './css/SelectOperationContainer.css';
import './css/navbar-fixed-left.css';

import { OperationContext } from './OperationContext';

import SelectOperation from './SelectOperation';
import SelectOperationDetail from './SelectOperationDetail';
import BtnExecute from './BtnExecute';
import ListMatrices from './ListMatrices';

export default class SelectOperationContainer extends Component {
  static contextType = OperationContext;

  render() {
    const classes = 'select-operation-container navbar navbar-expand-md navbar-dark bg-dark fixed-left';
    const { setContext, showMatrixOperations } = this.context;

    return (
      <nav className={classes}>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <div className="configure-operation">
              <a className="navbar-brand">Configure Operation</a>
              <li className="nav-link">
                <div className="custom-control custom-switch">
                  <input type="checkbox" className="custom-control-input toggleMatrixOperations" id="toggleMatrixOperations" onChange={() => {
                    const target = { name: 'showMatrixOperations', value: !showMatrixOperations };
                    {setContext(target)}
                  }}/>
                  <label className="toggleMatrixOperations-label custom-control-label" htmlFor="toggleMatrixOperations">Toggle Matrix Operations</label>
                </div>
              </li>
              <li className="nav-item"><SelectOperation /></li>
              <li className="nav-item"><SelectOperationDetail /></li>
              <li className="nav-item"><BtnExecute /></li>
            </div>
            <div className="matrices">
              <a className="navbar-brand">Matrices</a>
              <ListMatrices />
            </div>
          </ul>
        </div>
      </nav>
    )
  }
}
