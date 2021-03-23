import React, { Component } from 'react';

import { OperationContext } from '../../OperationContext';

export default class SortSequence extends Component {
  render() {
    const classes = 'operationInput';

    return (
      <div className={classes}>
        <span className='sequenceInput ml-1 border border-secondary rounded' contentEditable='true' placeholder='Enter Sequence' />
      </div>
    )
  }
}
