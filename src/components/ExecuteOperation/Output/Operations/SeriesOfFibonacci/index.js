import React, { Component } from 'react';
import { MathJax } from 'better-react-mathjax';

import { OperationContext } from '@OperationContext';
import {
  getFibonacciBounds,
  fibonacci,
  ifDecimalC2Fraction,
  copy
} from '@utilities/utils';

export default class SeriesOfFibonacci extends Component {
  static contextType = OperationContext;

  seriesOfFibonacci() {
    console.log('Calculating Fibonacci Numbers');
    const { showSteps } = this.context;
    let bounds = getFibonacciBounds();
    const x = bounds[0];
    const y = bounds[1];
    let fibonacciNumbers = [];
    let key = '0-';

    let output = [];
    let outputTmp;

    for (let i = x; i <= y; i++) {
      fibonacciNumbers.push(fibonacci(i))
    }

    let summation = copy(fibonacciNumbers);

    let sumOfFibonacciNumbers = summation.reduce((sum, nextNumber) => {
      return sum += nextNumber;
    });

    outputTmp = (
      <p key={key + -1}>$$
        Establish\ Bounds:
      $$</p>
    );
    output.push(outputTmp);


    outputTmp = (
      <p key={key + 0}>$$
        x = {x}\ \&\ y = {y}
      $$</p>
    );
    output.push(outputTmp);

    outputTmp = (
      <p key={key + 2}>$$
        Calculate\ the\ set\ of\ Fibonacci\ numbers\ between\ x\ \&\ y:
      $$</p>
    );
    output.push(outputTmp);

    if (showSteps) {
      outputTmp = (
        <p key={key + 3}>$$
          F_{`{n}`} = \frac{`{\\phi^{n}-(-\\phi)^{-n}}{\\sqrt{5}}`} = \frac{`{(1+\\sqrt{5})^{n}-(1-\\sqrt{5})^{-n}}{2^{n} \\cdot \\sqrt{5}}`}
        $$</p>
      );
      output.push(outputTmp);
    }

    outputTmp = (
      <p key={key + 4}>$$
        F_{`{n}`} \to {`\\{ n | n \\in \\Bbb{R}, x \\le n \\le y\\}`} = {`\\{${fibonacciNumbers}\\}`}
      $$</p>
    );
    output.push(outputTmp);

    outputTmp = (
      <p key={key + 5}>$$
        Calculate\ the\ series\ of\ Fibonacci\ numbers\ between\ x\ \&\ y:
      $$</p>
    )
    output.push(outputTmp);

    if ((y - x) > 1 && showSteps) {
      outputTmp = (
        <p key={key+7}>$$
          \sum_{`{n=x}`}^{`{y}`} F_{`{n}`} = F_{`{n}`} + F_{`{n+1}`} + \cdots + F_{`{n+y}`}
        $$</p>
      );
      output.push(outputTmp);
    }
    else if (showSteps) {
      outputTmp = (
        <p key={key+8}>$$
          \sum_{`{n=x}`}^{`{y}`} F_{`{n}`} = F_{`{n}`} + F_{`{n+1}`}
        $$</p>
      );
      output.push(outputTmp);
    }

    if (showSteps) {
      let outputHold = [];
      for (let i = x; i <= y; i++) {
        if (i != y) {
          outputHold.push(fibonacci(i) + '+');
        }
        else {
          outputHold.push(fibonacci(i));
        }
      }

      outputTmp = (
        <p key={key + 9}>$$
          \sum_{`{n=x}`}^{`{y}`} F_{`{n}`} = {outputHold}
        $$</p>
      );
      output.push(outputTmp);
    }

    outputTmp = (
      <p key={key + 10}>$$
        \sum_{`{n=x}`}^{`{y}`} F_{`{n}`} = {sumOfFibonacciNumbers}
      $$</p>
    );
    output.push(outputTmp);

    return output;
  }

  render() {
    const classes = 'operationOutput';

    return (
      <MathJax className={classes}>
        {this.seriesOfFibonacci()}
      </MathJax>
    )
  }
}
