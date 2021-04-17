import React, { Component } from 'react';
import { MathJax } from 'better-react-mathjax';

import ScalarInput from '@utilities/ScalarInput';
import Span from '@utilities/Span';

export default class DiceProbability extends Component {

  render() {
    const classes = 'operationInput';

    return(
      <div className={classes}><p>
        Probability of rolling exactly{' '}
        <Span className="diceInput" type="number" placeholder="Target Sum" />{' '}
        using{' '}
        <Span className="diceInput" type="number" placeholder="Number of Dice" />{' '}
        fair{' '}
        <Span className="diceInput" type="number" placeholder="Number of Sides" />{' '}
        sided die.
      </p></div>
    )
  }
}
