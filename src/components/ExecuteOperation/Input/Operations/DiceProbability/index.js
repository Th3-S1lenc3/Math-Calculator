import React, { Component } from 'react';
import { MathJax } from 'better-react-mathjax';

import ScalarInput from '@utilities/ScalarInput';
import Span from '@utilities/Span';

const Space = () => <>&nbsp;</>;

export default class DiceProbability extends Component {

  render() {
    const classes = 'operationInput';

    return(
      <div className={classes}><p>
        Probability of rolling exactly<Space />
        <Span className="diceInput" type="number" placeholder="Target Sum" /><Space />
        using<Space />
        <Span className="diceInput" type="number" placeholder="Number of Dice" /><Space />
        fair<Space />
        <Span className="diceInput" type="number" placeholder="Number of Sides" /><Space />
        sided die.
      </p></div>
    )
  }
}
