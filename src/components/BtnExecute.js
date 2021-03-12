import React, { Component } from 'react';
import './css/BtnExecute.css';

import { OperationContext } from './OperationContext';

export default class BtnExecute extends Component {
  static contextType = OperationContext

  render() {
    const classesInner = 'btnExecute btn btn-success btn-md';
    const classesOuter = 'btnExecute-container centre';
    const { setContext, execute } = this.context

    return (
      <div className={classesOuter}>
        <button className={classesInner} onClick={() => {
          if (execute == 'true') {
            let target = { name: 'execute', value: 'false' };
            {setContext(target)};
            setTimeout(() => {
              target = {name: 'execute', value: 'true'};
              {setContext(target)};
            }, 1);
          }
          else {
            let target = { name: 'execute', value: 'true' };
            {setContext(target)};
          }
        }}>Execute</button>
      </div>
    )
  }
}
