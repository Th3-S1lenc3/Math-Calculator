import React, { Component } from 'react';
import { MathJax } from 'better-react-mathjax';

import Matrix from '../utilities/Matrix';
import ScalarInput from '../utilities/ScalarInput';

export default class ScalarMultiplication extends Component {
  render() {
    const classes = 'operationInput';

    return (
      <MathJax className={classes}>
        <ScalarInput />
        <p className="specialOperator">$$\cdot$$</p>
        <Matrix id="1" rows="2" cols="2" />
      </MathJax>
    )
  }
}
