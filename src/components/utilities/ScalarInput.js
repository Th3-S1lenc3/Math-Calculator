import React, { Component } from 'react';

import Span from './Span';

export default class ScalarInput extends Component {
  render() {
    const classes = 'scalarInput p-1';

    let placeholder = this.props.placeholder || '0';
    return (
      <Span type='number' className={classes} placeholder={placeholder}/>
    )
  }
}
