import React, { Component } from 'react';
import { MathJax } from 'better-react-mathjax';

import { OperationContext } from '@OperationContext';
import Matrix from '@utilities/Matrix';

class F extends Component {
  render() {
    return (
      <>{this.props.children}</>
    )
  }
}
const Space = () => <>&nbsp;</>;

export default class VectorTransformation extends Component {
  static contextType = OperationContext;

  state = {
    transformType: 'default'
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
      <F key={0}>
        <div className="vectorInput">
          $$
            \vec{`{p}`} =
          $$ <Space />
          <Matrix id={1} rows={count} cols={1} />
        </div>
        <div className="transformInput pl-4">
          $$
            T =
          $$ <Space />
          <Matrix id={2} rows={count} cols={count}/>
        </div>
      </F>
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
      <F key={7}>
        <div className='vector-btnContainer ml-auto'>
          <button className='btn btn-danger btn-md' style={displayBtnBack} onClick={() => {
            let target = [
              { name: 'type', value: 'vectorTransformation' },
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
        {this.renderVectorTransformation()}
      </MathJax>
    )
  }
}
