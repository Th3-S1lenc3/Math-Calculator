import React, { Component } from 'react';
import { MathJax } from 'better-react-mathjax';

import ScalarInput from '@utilities/ScalarInput';

const Space = () => <>&nbsp;</>;

export default class DiceProbability extends Component {

  render() {
    const classes = 'operationInput';

    return(
      <div className={classes}><p>
        Probability of rolling exactly<Space />
        <span className="diceInput" contentEditable='true' placeholder="Target Sum"/><Space />
        using<Space />
        <span className="diceInput" contentEditable='true' placeholder="Number of Dice"/><Space />
        fair<Space />
        <span className="diceInput" contentEditable='true' placeholder="Number of Sides"/><Space />
        sided die.
      </p></div>
    )
  }
}
