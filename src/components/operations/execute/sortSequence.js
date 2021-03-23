import React, { Component } from 'react';
import { MathJax } from 'better-react-mathjax';

import { OperationContext } from '../../OperationContext';
import { getSequence, copy, ordinal_suffix_of } from '../utilities/utils';

export default class SortSequence extends Component {
  static contextType = OperationContext;

  sortSequence() {
    console.log('Sorting Sequence');
    const { showSteps } = this.context;
    let output = [];
    let outputTmp;
    let key = '0-';
    let key2 = '1-';
    let sequence = getSequence().split(',').map(Number);

    let sequenceLength = sequence.length;

    let sort = (array, arrayLength, key) => {
      if (arrayLength <= 1) {
        return;
      }

      sort(array, arrayLength - 1, key + 1);

      let prevArray = copy(array);

      let last = array[arrayLength-1];
      let j = arrayLength - 2;

      while (j >= 0 && array[j] > last) {
        array[j+1] = array[j];
        j = j-1;
      }

      array[j+1] = last;

      if (showSteps) {
        outputTmp = (
          <p key={key}>$$
            Sort\ {ordinal_suffix_of(copy(arrayLength))}\ position:
          $$</p>
        )
        output.push(outputTmp);

        outputTmp = (
          <p key={key + '-1'}>$$
            {`\\{${copy(prevArray)}\\}`}
            \to
            {`\\{${copy(array)}\\}`}
          $$</p>
        )
        output.push(outputTmp);
      }

      return array;
    }

    if (showSteps) {
      outputTmp = (
        <p key={key + 0}>$$
          Unordered\ Sequence:
        $$</p>
      )
      output.push(outputTmp);

      outputTmp = (
        <p key={key + 1}>$$
          {`\\{${copy(sequence)}\\}`}
        $$</p>
      )
      output.push(outputTmp);
    }

    let unorderedSequence = copy(sequence);

    sort(sequence, sequenceLength, key2);

    outputTmp = (
      <p key={key + 2}>$$
        Result:
      $$</p>
    )
    output.push(outputTmp);

    outputTmp = (
      <p key={key + 3}>$$
        {`\\{${unorderedSequence}\\}`}
        \to
        {`\\{${sequence}\\}`}
      $$</p>
    )
    output.push(outputTmp);

    return output;
  }

  render() {
    const classes = 'operationOutput';

    return (
      <MathJax className={classes}>
        {this.sortSequence()}
      </MathJax>
    )
  }
}
