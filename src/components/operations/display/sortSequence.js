import React, { Component } from 'react';

import { OperationContext } from '../../OperationContext';
import Span from '../utilities/Span';

export default class SortSequence extends Component {
  render() {
    const classes = 'operationInput';

    return (
      <div className={classes}>
        Please enter a comma separated list of digits:
        <p className='sequenceInput-container ml-1'>{`{`}<Span className='sequenceInput' type='sequence' placeholder='Enter Sequence' />{`}`}</p>
      </div>
    )
  }
}
