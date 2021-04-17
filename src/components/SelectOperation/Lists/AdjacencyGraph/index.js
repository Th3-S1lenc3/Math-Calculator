import React, { Component, Fragment, useState, useEffect, useContext } from 'react';

import { OperationContext } from '@OperationContext';
import DropdownBtn from '@utilities/DropdownBtn';

export default class AdjacencyGraph extends Component {
  static contextType = OperationContext;

  componentDidMount() {
    const { type, setContext } = this.context;
    if (type != 'default') {
      const { setContext } = this.context;

      let target = { name: 'showListInfo', value: true };

      setContext(target);
    }
  }

  componentWillUnmount() {
    const { type, setContext } = this.context;
    if (type != 'default') {
      const { setContext } = this.context;

      let target = { name: 'showListInfo', value: false };

      setContext(target);
    }
  }

  handleDecrement(event) {
    const { nodes: nodesRaw, deleteNode } = this.context;

    let nodes = {};

    for (let node in nodesRaw) {
      if (node.includes('node')) {
        nodes[node] = nodesRaw[node];
      }
    }

    let nodeCount = Object.keys(nodes).length

    if (nodeCount > 2) {
      let lastNode = Object.keys(nodes).pop();
      let target = { node: lastNode };
      console.log(nodes, lastNode, target);
      deleteNode(target);
    }
  }

  handleIncrement(event) {
    const { nodes: nodesRaw, updateNode } = this.context;

    let nodes = {};

    for (let node in nodesRaw) {
      if (node.includes('node')) {
        nodes[node] = nodesRaw[node];
      }
    }

    let lastNode = Object.keys(nodes).pop(1);
    let lastNodeID = Number(lastNode.split('_')[1]);
    let { position } = nodes[lastNode];

    let newNodeID = `node_${(lastNodeID + 1)}`;
    let newNodeValue = {
      id: `${(lastNodeID + 1)}`,
      type: 'default',
      data: { label: `Node ${(lastNodeID + 1)}` },
      position: { x: (position.x + 10), y: (position.y + 10) },
    };

    let target = { node: newNodeID, value: newNodeValue };
    updateNode(target);
  }

  updateNodeName = (evt) => {
    const { nodes, updateNode } = this.context;
    let nodeID = evt.target.id;
    let nodeName = `node_${nodeID}`;
    let newNodeLabel = evt.target.value;

    let node = nodes[nodeName];

    node.data = {
      ...node.data,
      label: newNodeLabel,
    };

    let target = { node: nodeName, value: node };

    updateNode(target);
  }

  listAdjacencyGraph() {
    const { nodes: nodesRaw } = this.context;

    let nodes = {}

    for (let node in nodesRaw) {
      if (node.includes('node')) {
        nodes[node] = nodesRaw[node];
      }
    }

    let nodeCount = Object.keys(nodes).length;
    let key = '0-';

    let output = [];
    let outputHold = [];
    let outputTmp;

    let classes = 'btn btn-secondary';

    outputTmp = (
      <div key={key + 2} className="btn-group centre">
        <button type="button" className={classes} onClick={(event) => {this.handleDecrement(event)}}>-</button>
        <button type="button" className={classes}>Nodes: {nodeCount}</button>
        <button type="button" className={classes} onClick={(event) => {this.handleIncrement(event)}}>+</button>
      </div>
    );
    output.push(outputTmp);

    let i = 0;
    for (let node in nodes) {
      let key = `${i}_`;
      let nodeID = JSON.stringify(node).split('_')[1];
      nodeID = nodeID.substr(0, nodeID.length -1);

      let { data: { label }, style } = nodes[node];

      let classes = `${nodeID} btn btn-secondary`;
      outputTmp = (
        <Fragment key={key + i}>
          <DropdownBtn id={nodeID} label='node' />
          <div className='dropdown-container'>
            <div className='nodeControl-Label'>
              <input
                type="text"
                className="form-control"
                id={nodeID}
                value={label}
                onChange={(evt) => (this.updateNodeName(evt))}
              />
            </div>
          </div>
        </Fragment>
      );
      outputHold.push(outputTmp);
      i++;
    }

    outputTmp = (
      <div key={key +  3} className='list-inner'>
        {outputHold}
      </div>
    )
    output.push(outputTmp);

    return output;
  }

  render() {
    return (
      <Fragment>
        {this.listAdjacencyGraph()}
      </Fragment>
    )
  }
}
