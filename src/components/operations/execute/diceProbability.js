import React, { Component } from 'react';
import { MathJax } from 'better-react-mathjax';

import { OperationContext } from '../../OperationContext';

import { newExecuteMatrix, ifDecimalC2Fraction, getDiceInputs, copy, factorial } from '../utilities/utils';

export default class DiceProbability extends Component {
  static contextType = OperationContext

  binomial(n, k) {
    let result = (factorial(n) / (factorial(k) * factorial(n-k)));
    return result;
  }

  diceProbability() {
    const { showSteps } = this.context
    let inputs = copy(getDiceInputs());
    let key = 0 + '-'

    let targetSum = inputs[0];
    let dice = inputs[1];
    let sides = inputs[2];

    let output = [];
    let outputTmp;

    if (targetSum > (dice * sides)) {
      let probability = 0;

      outputTmp = (
        <p key={key + 1}>$$
          Given\ the\ target\ sum\ is\ greater\ than\ the\ largest\ possible\ sum\ ({dice * sides})\ the\ probability\ is\ 0.
        $$</p>
      )

      output.push(outputTmp);

      return output;
    }

    if (showSteps) {
      outputTmp = (
        <p key={key + 2}>$$
          Calculate\ probability:
        $$</p>
      )

      output.push(outputTmp);

      outputTmp = (
        <p key={key + 3}>$$
          Let\ j = \left\lfloor \frac{`{r-n}{s}`} \right\rfloor
        $$</p>
      )

      output.push(outputTmp);

      outputTmp = (
        <p key={key + 4}>$$
          P(r, n, s) = \frac{`{1}{s^n}`} \sum_{`{k=0}^{j}`}(-1)^k \binom{`{n}{k}`} \binom{`{r-s \\cdot k-1}{n-1}`}
        $$</p>
      )

      output.push(outputTmp);
    }

    let r = targetSum;
    let n = dice;
    let s = sides;
    let j = Math.floor(((r - n) / s));

    if (showSteps) {
      outputTmp = (
        <p key={key + 6}>$$
          P({r}, {n}, {s}) = \frac{`{1}{${Math.pow(s,n)}}`} \sum_{`{k=0}^{${j}}`}(-1)^k \binom{`{${n}}{k}`} \binom{`{${r} + ${s} \\cdot k-1}{${n} - 1}`}
        $$</p>
      )

      output.push(outputTmp);
    }

    let p = 0;

    for (let k = 0; k <= j; k++) {
      let x = Math.pow(-1, k);
      let y = this.binomial(n, k);
      let z = this.binomial((r - s * k - 1), (n - 1))

      p += x * y * z
    }

    let probability = (1 / Math.pow(s, n)) * p;

    if (!isFinite(probability)) {
      probability = 0;
    }

    probability = probability.toPrecision(4);
    let probabilityAsPercentage = probability * 100
    probabilityAsPercentage = probabilityAsPercentage.toPrecision(4) + '\\%';

    if (showSteps) {
      outputTmp = (
        <p key={key + 7}>$$
          P({r}, {n}, {s}) = {probability}
        $$</p>
      )

      output.push(outputTmp);
    }

    outputTmp = (
      <p key={key + 8}>$$
        Result:
      $$</p>
    )

    output.push(outputTmp);

    outputTmp = (
      <p key={key + 9}>$$
        Probability\ of\ rolling\ exactly\ {r}\ on\ {n},\ {s}-sided\ die\ is\ {probability}\ or\ {probabilityAsPercentage}
      $$</p>
    )

    output.push(outputTmp);

    return output;
  }

  render() {
    const classes = 'operationOutput';

    return (
      <MathJax className={classes}>
        {this.diceProbability()}
      </MathJax>
    )
  }
}
