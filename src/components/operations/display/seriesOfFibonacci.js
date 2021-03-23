import React, { Component } from 'react';
import { MathJax } from 'better-react-mathjax';

import ScalarInput from '../utilities/ScalarInput';
import Span from '../utilities/Span';

const Space = () => <>&nbsp;</>;

export default class SeriesOfFibonacci extends Component {
  render() {
    const classes = 'operationInput';

    return (
      <div className={classes}>
        Calculate the Fibonacci numbers between<Space />
        <Span type='number' className="fibonacciInput" placeholder='0' /><Space />
        and<Space />
        <Span type='number' className="fibonacciInput" placeholder='0' />
      </div>
    )
  }
}
