import React, { Component } from 'react';
import { MathJax } from 'better-react-mathjax';

import Span from '@utilities/Span';

export default class SeriesOfFibonacci extends Component {
  render() {
    const classes = 'operationInput';

    return (
      <div className={classes}>
        Calculate the Fibonacci numbers between{' '}
        <Span type='number' className="fibonacciInput" placeholder='0' />{' '}
        and{' '}
        <Span type='number' className="fibonacciInput" placeholder='0' />
      </div>
    )
  }
}
