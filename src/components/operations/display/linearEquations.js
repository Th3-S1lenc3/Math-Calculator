import React, { Component } from 'react';

import SystemOfLinearEquations from '../utilities/SystemOfLinearEquations';

export default class LinearEquations extends Component {
  render() {
    const classes = 'operationInput';

    return (
      <div className={classes}>
        <SystemOfLinearEquations id="1" variables="2" equations="2" />
      </div>
    )
  }
}
