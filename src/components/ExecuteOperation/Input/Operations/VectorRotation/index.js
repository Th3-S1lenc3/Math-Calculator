import React, { Component } from 'react';
import { MathJax } from 'better-react-mathjax';

import { OperationContext } from '@OperationContext';
import Matrix from '@utilities/Matrix';
import Span from '@utilities/Span';

class F extends Component {
  render() {
    return (
      <>{this.props.children}</>
    )
  }
}
const Space = () => <>&nbsp;</>;

export default class VectorRotation extends Component {
  static contextType = OperationContext;

  state = {
    transformType: 'default'
  }

  renderVectorRotation() {
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
      <F key={0}>
        <div className="vectorInput">
          $$
            \vec{`{p}`} =
          $$ <Space />
          <Matrix id={1} rows={count} cols={1} />
        </div>
        <div className="thetaInput pl-4">
          $$
            \theta =
          $$ <Space />
          <Span type='number' className="theta" placeholder='0'/>
        </div>
      </F>
    );
    output.push(outputTmp);

    let displayBtnBack;

    if (type == 'plotVectorRotation') {
      displayBtnBack = {display: 'block'};
    }
    else {
      displayBtnBack = {display: 'none'};
    }

    outputTmp = (
      <F key={7}>
        <div className='vector-btnContainer ml-auto'>
          <button className='btn btn-danger btn-md' style={displayBtnBack} onClick={() => {
            let target = [
              { name: 'type', value: 'vectorRotation' },
              { name: 'execute', value: true }
            ];
            {setContext(target)};
          }}>Back</button>
        </div>
      </F>
    );
    output.push(outputTmp);

    return output;
  }

  render() {
    const classes = 'operationInput-vectorTransforms';

    return (
      <MathJax className={classes}>
        {this.renderVectorRotation()}
      </MathJax>
    )
  }
}
