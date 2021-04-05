import React, { Component } from 'react';
import './index.css';

import { OperationContext } from '@OperationContext';

export default class BtnCalculate extends Component {
  static contextType = OperationContext

  render() {
    const classesInner = 'btnCalculate btn btn-success btn-md';
    const classesOuter = 'btnCalculate-container centre';
    const { setContext, execute } = this.context

    return (
      <div className={classesOuter}>
        <button className={classesInner} onClick={() => {
          if (execute == true) {
            let target = { name: 'execute', value: false };
            {setContext(target)};
            setTimeout(() => {
              target = {name: 'execute', value: true};
              {setContext(target)};
            }, 1);
          }
          else {
            let target = { name: 'execute', value: true };
            {setContext(target)};
          }
        }}>Calculate</button>
      </div>
    )
  }
}
