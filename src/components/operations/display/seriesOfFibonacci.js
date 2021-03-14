import React, { Component } from 'react';
import { MathJax } from 'better-react-mathjax';

import ScalarInput from '../utilities/ScalarInput';

export default class SeriesOfFibonacci extends Component {
  render() {
    const classes = 'operationInput';

    return (
      <div className={classes}>
        Calculate the Fibonacci numbers between
        <ScalarInput />
        and
        <ScalarInput />
      </div>
    )
  }
}
