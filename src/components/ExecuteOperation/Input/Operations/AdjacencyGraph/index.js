import React, { Component } from 'react';

import { OperationContext } from '@OperationContext';
import Span from '@utilities/Span';

const Space = () => <>&nbsp;</>;

export default class AdjacencyGraph extends Component {
  static contextType = OperationContext;

  render() {
    const { nodes: nodesRaw } = this.context;

    let nodes = {}

    for (let node in nodesRaw) {
      if (node.includes('node')) {
        nodes[node] = nodesRaw[node];
      }
    }

    let [A, B] = Object.keys(nodes)

    let placeholder_A = nodes[A].data.label;
    let placeholder_B = nodes[B].data.label;

    const classes = 'operationInput';

    return (
        <div className={classes}>
          Calculate the shortest path between Node:<Space />
          <Span type='alphanumeric' placeholder={placeholder_A} /><Space />
          and Node:<Space />
          <Span type='alphanumeric' placeholder={placeholder_B} />
        </div>
    )
  }
}
