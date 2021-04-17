import React, { Component, Fragment } from 'react';
import { MathJax } from 'better-react-mathjax';

import { OperationContext } from '@OperationContext';
import Matrix from '@utilities/Matrix';

export default class VectorTransformation extends Component {
  static contextType = OperationContext;

  state = {
    transformType: 'default',
  }

  renderVectorTransformation() {
    const { dimensions: { count }, type, setContext } = this.context;
    let { transformType } = this.state;

    if (transformType) {
      transformType = 'Rotate';
    }
    else {
      transformType = 'Default'
    }

    let output = [];
    let outputTmp;

    outputTmp = (
      <Fragment key={0}>
        <div className="vectorInput">
          $$
            \vec{`{p}`} =
          $${' '}
          <Matrix id={1} rows={count} cols={1} />
        </div>
        <div className="transformInput pl-4">
          $$
            T =
          $${' '}
          <Matrix id={2} rows={count} cols={count}/>
        </div>
      </Fragment>
    );
    output.push(outputTmp);

    let displayBtnBack;

    if (type == 'plotVectorTransformation') {
      displayBtnBack = {display: 'block'};
    }
    else {
      displayBtnBack = {display: 'none'};
    }

    outputTmp = (
      <Fragment key={7}>
        <div className='vector-btnContainer ml-auto'>
          <button className='btn btn-danger btn-md' style={displayBtnBack} onClick={() => {
            let target = [
              { name: 'type', value: 'vectorTransformation' },
              { name: 'execute', value: true }
            ];
            {setContext(target)};
          }}>Back</button>
        </div>
      </Fragment>
    );
    output.push(outputTmp);

    return output;
  }

  render() {
    const classes = 'operationInput-vectorTransforms';

    return (
      <MathJax className={classes}>
        {this.renderVectorTransformation()}
      </MathJax>
    )
  }
}
