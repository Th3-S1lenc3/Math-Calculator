import React, { Component } from 'react';

export default class ScalarInput extends Component {
  render() {
    const classes = 'scalarInput ml-1';

    return (
      <input type='number' className={classes} />
    )
  }
}
