import React, { Component } from 'react';

import { OperationContext } from '../OperationContext';

export default class ListEquations extends Component {
  static contextType = OperationContext;

  handleDecrement(event) {
    const { equations, updateEquations, deleteEquation } = this.context;

    let equationCount = equations['count'];
    if (equationCount > 2) {
      let target = { count: equationCount - 1};
      updateEquations(target);
    }
    return;
  }

  handleIncrement(event) {
    const { equations, updateEquations, deleteEquation } = this.context;

    let equationCount = equations['count'];
    let target = { count: equationCount + 1};
    updateEquations(target);
    return;
  }

  listEquations() {
    const { equations } = this.context;
    let equationCount = equations['count'];
    let key = 0 + '-';

    let output = [];
    let outputTmp;

    outputTmp = (
      <a key={key + 1} className="navbar-brand">Equations</a>
    );
    output.push(outputTmp);

    let classes = 'btn btn-secondary';

    outputTmp = (
      <div key={key + 2} className="btn-group centre">
        <button type="button" className={classes} onClick={(event) => {this.handleDecrement(event)}}>-</button>
        <button type="button" className={classes}>Equations: {equationCount}</button>
        <button type="button" className={classes} onClick={(event) => {this.handleIncrement(event)}}>+</button>
      </div>
    );
    output.push(outputTmp);

    return (output);
  }

  render() {
    const { type } = this.context;

    if (type == 'default') {
      return (
        <></>
      )
    }
    else {
      return (
        <>
          {this.listEquations()}
        </>
      )
    }
  }
}
