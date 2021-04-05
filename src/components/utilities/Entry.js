import React, { Component } from 'react';

import { OperationContext } from '@OperationContext';

export default class Entry extends Component {
  static contextType = OperationContext;

  render() {
    const { outputDetail } = this.context;
    let { children } = this.props;

    children = children.toString().detail(outputDetail);

    return (
      <>
        {children}
      </>
    )
  }
}
