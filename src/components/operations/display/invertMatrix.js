import React, { Component } from 'react';

import Matrix from '../utilities/Matrix';

export default class InvertMatrix extends Component {
  render() {
    const classes = 'operationInput';

    return (
      <div className={classes}>
        <Matrix id="1" rows="2" cols="2" />
      </div>
    )
  }
}
