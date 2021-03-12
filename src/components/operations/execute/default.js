import React, { Component } from 'react';

export default class DisplayDefault extends Component {
  render() {
    const classes = 'operationOutput';

    return (
      <div className={classes}>
        Hello from ExecuteDefault
      </div>
    )
  }
}
