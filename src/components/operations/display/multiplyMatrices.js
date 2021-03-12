import React, { Component } from 'react';
import { MathJax } from 'better-react-mathjax';

import Matrix from '../utilities/Matrix';

export default class MultiplyMatrices extends Component {
  render() {
    const classes = 'operationInput';

    return (
      <MathJax className={classes}>
        <Matrix id="1" rows="2" cols="2" />
        <p className="specialOperator">$$\cdot$$</p>
        <Matrix id="2" rows="2" cols="2" />
      </MathJax>
    )
  }
}
