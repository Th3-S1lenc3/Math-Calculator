import React, { Component } from 'react';

import Matrix from '../utilities/Matrix';

export default class AddMatrices extends Component {
  render() {
    const classes = 'operationInput';

    return (
      <div className={classes}>
        <Matrix id="1" rows="2" cols="2" />
        <p className="operator">+</p>
        <Matrix id="2" rows="2" cols="2" />
      </div>
    )
  }
}
