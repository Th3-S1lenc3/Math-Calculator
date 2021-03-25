import React, { Component } from 'react';

import { OperationContext } from '../../OperationContext';

export default class DisplayDefault extends Component {
  static contextType = OperationContext;

  render() {
    const classes = 'defaultAlert alert alert-info'

    return (
      <div key={0} className={classes}>
        Please choose an operation from the select field on the left. To see matrix operations toggle the matrix operations switch above the select operation field.
      </div>
    )
  }
}
