import React, { Component } from 'react';
import { MathJax } from 'better-react-mathjax';

import Matrix from '../utilities/Matrix';
import ScalarInput from '../utilities/ScalarInput';

export default class ScalarDivision extends Component {
  render() {
    const classes = 'operationInput';

    return (
      <MathJax className={classes}>
        <Matrix id="1" rows="2" cols="2" />
        <p className="specialOperator">$$\div$$</p>
        <ScalarInput />
      </MathJax>
    )
  }
}
