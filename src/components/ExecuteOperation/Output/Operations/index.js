import React, { Component } from 'react';

import { OperationContext } from '@OperationContext';

export default class ExecuteDefault extends Component {
  static contextType = OperationContext;

  render() {
    const { type, showMatrixOperations, showListInfo } = this.context;
    const classes = 'defaultAlert alert alert-info';

    let information = [];
    let info;

    info = (
      <div key={0} className={classes}>
        When you have filled out the input click the calculate button. You can see the steps of any calculation by toggling the show steps switch below the select operation field.
      </div>
    );
    information.push(info);

    if (showListInfo) {
      info = (
        <div key={1} className={classes}>
          You can alter attributes of the input with the list below configure operation.
        </div>
      );
      information.push(info);
    }

    return (
      <>{information}</>
    )
  }
}
