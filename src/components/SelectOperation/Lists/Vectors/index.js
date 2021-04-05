import React, { Component } from 'react';

import { OperationContext } from '@OperationContext';

export default class Vectors extends Component {
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
    const { dimensions: { count }, updateDimensions } = this.context;

    if (count > 2) {
      let target = { count: count - 1};
      updateDimensions(target);
    }
    return;
  }

  handleIncrement(event) {
    const { type, dimensions: { count }, updateDimensions } = this.context;

    if (type == 'vectorRotation') {
      if ( count < 3 ) {
        let target = { count: count + 1};
        updateDimensions(target);
      }
    }
    else {
      let target = { count: count + 1};
      updateDimensions(target);
    }

    return;
  }

  listDimensions() {
    const { type, dimensions, setContext } = this.context;
    let dimensionCount = dimensions['count'];
    let key = 0 + '-';
    let state;

    let output = [];
    let outputTmp;

    if (type == 'vectorTransformation') {
      state = 'Rotation';
    }
    else if (type == 'vectorRotation') {
      state = 'Transformation';
    }

    let classes = 'btn btn-secondary';

    outputTmp = (
      <li key={key + 0} className="nav-link">
        <div className="custom-control custom-switch">
          <input type="checkbox" className="custom-control-input toggleVectorRotation" id="toggleVectorRotation" onChange={(e) => {
            if (e.target.checked) {
              const target = { name: 'type', value: 'vectorRotation' };
              {setContext(target)}
            }
            else {
              const target = { name: 'type', value: 'vectorTransformation' };
              {setContext(target)}
            }
          }}/>
          <label className="toggleVectorRotation-label custom-control-label" htmlFor="toggleVectorRotation">Vector {state}</label>
        </div>
      </li>
    );
    output.push(outputTmp);

    outputTmp = (
      <div key={key + 2} className="btn-group centre">
        <button type="button" className={classes} onClick={(event) => {this.handleDecrement(event)}}>-</button>
        <button type="button" className={classes}>Dimensions: {dimensionCount}</button>
        <button type="button" className={classes} onClick={(event) => {this.handleIncrement(event)}}>+</button>
      </div>
    );
    output.push(outputTmp);

    return (output);
  }

  render() {
    return (
      <>
        {this.listDimensions()}
      </>
    )
  }
}
