import React, { Component } from 'react';

import { OperationContext } from '@OperationContext';

export default class Equations extends Component {
  static contextType = OperationContext;

  componentDidMount() {
    const { type } = this.context;
    if (type != 'default') {
      const { setContext } = this.context;

      let target = { name: 'showListInfo', value: true };

      {setContext(target)};
    }
  }

  componentWillUnmount() {
    const { type } = this.context;
    if (type != 'default') {
      const { setContext } = this.context;

      let target = { name: 'showListInfo', value: false };

      {setContext(target)};
    }
  }

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
    return (
      <>
        {this.listEquations()}
      </>
    )
  }
}
