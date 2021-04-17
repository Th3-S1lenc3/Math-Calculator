import React, { Component } from 'react';

import { OperationContext } from '@OperationContext';
import { getNodes } from '@utilities/utils';
import DropdownBtn from '@utilities/DropdownBtn';

export default class CalculateShortestPath extends Component {
  static contextType = OperationContext;

  renderShortestPath() {
    const { nodes: data } = this.context;
    const nodeLabels = getNodes();
    const output = [];
    let outputTmp;

    const adjacencyList = new Map();
    let hops = [];
    let route = new Set();

    const addNode = (node) => {
      adjacencyList.set(node, []);
    };

    const addEdge = (srcNode, destNode) => {
      adjacencyList.get(srcNode).push(destNode);
      adjacencyList.get(destNode).push(srcNode);
    };

    const findRoutes = (startNode, endNode) => {
      const visited = new Set();
      const queue = [startNode];
      route.add(startNode);

      while (queue.length > 0) {
        const node = queue.shift();
        const destinations = adjacencyList.get(node);
        for (const destination of destinations) {
          if (destination == endNode) {
            route.add(node);
            route.add(endNode);
            const steps = visited.size || 1;
            hops.push(steps);
            return;
          }

          if (!visited.has(destination)) {
            visited.add(destination);
            queue.push(destination);
            route.add(node);
          }
        }
      }
    }

    let nodes = [];
    let edges = [];

    for (let node in data) {
      let nodeType = node.split('_')[0];
      if (nodeType == 'node') {
        let { id } = data[node];
        nodes.push(id);
      }
      else {
        let { source, target } = data[node];
        edges.push([source, target]);
      }
    }

    nodes.forEach(addNode);
    edges.forEach(edge => addEdge(...edge));

    const nodeIdentifiers = [];

    for (let node in data) {
      let nodeType = node.split('_')[0];
      if (nodeType == 'node') {
        const { data: { label } } = data[node];
        if (nodeLabels.includes(label)) {
          nodeIdentifiers.push(node)
        }
      }
    }

    let startNode = data[nodeIdentifiers[0]]?.id;
    let endNode = data[nodeIdentifiers[1]]?.id;

    if (!startNode || !endNode) {
      let badNode;

      if (!startNode) {
        badNode = nodeLabels[0];
      }
      else {
        badNode = nodeLabels[1];
      }

      outputTmp = (
        <p key={-1}>Cannot use node that does not exist. Offending Node: {badNode}</p>
      );
      output.push(outputTmp);
      return output;
    }

    findRoutes(startNode, endNode);

    let minHops = Math.min(...hops);

    if (!isFinite(minHops)) {
      outputTmp = (
        <p key={-2}>
          Cannot find route to {nodeLabels[1]}
        </p>
      );
      output.push(outputTmp);
      return output;
    }

    let dataIDs = new Map();

    Object.keys(data).forEach((value) => {
      if (value.includes('node')) {
        dataIDs.set(data[value].id, data[value].data.label);
      }
    })

    let routeArr = Array.from(route);

    let routeFormatted = routeArr.map((value) => {
      return dataIDs.get(value);
    });

    routeFormatted = routeFormatted.join('\\(\\to\\)');

    outputTmp = (
      <p key={0}>Shortest path is {minHops} hops</p>
    );
    output.push(outputTmp);

    outputTmp = (
      <p key={1}>Route: {routeFormatted}</p>
    );
    output.push(outputTmp);

    return output;
  }

  render() {
    return (
      <div className="full-width border border-secondary rounded">
        <DropdownBtn id={1} label={'result'} showID={false} state={true}/>
        <div className="dropdown-container-open" style={{display: 'block'}}>
          {this.renderShortestPath()}
        </div>
      </div>
    )
  }
}
