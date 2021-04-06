import React, { Component, useState, useContext, useEffect } from 'react';
import ReactFlow, {
  removeElements,
  addEdge,
  Background,
  useStoreState,
} from 'react-flow-renderer';
import { MathJax } from 'better-react-mathjax';

import { OperationContext } from '@OperationContext';
import { getNodes } from '@utilities/utils';
import DropdownBtn from '@utilities/DropdownBtn';

import './index.css';

class CalculateShortestPath extends Component {
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
        <DropdownBtn id={1} label={'result'} showID={false} open={true}/>
        <div className="dropdown-container-open" style={{display: 'block'}}>
          {this.renderShortestPath()}
        </div>
      </div>
    )
  }
}

export default class AdjacencyGraph extends Component {
  static contextType = OperationContext;

  renderAdjacencyGraph() {
    const { execute, nodes, deleteNode, updateNode } = this.context;

    const Graph = () => {
      let nodeArr = [];

      for (let node in nodes) {
        nodeArr.push(nodes[node]);
      }

      let [elements, setElements] = useState(nodeArr);
      const onEdgeUpdate = (oldEdge, newConnection) =>
        setElements((els) => updateEdge(oldEdge, newConnection, els));
      const onConnect = (params) => {
        setElements((els) => addEdge(params, els));
        let { source, target: dest } = params;
        let edgeName = `edge_${source}_${dest}`;
        let edgeID = `e${source}-${dest}`;

        let target = { node: edgeName, value: {
          id: edgeID,
          source: source,
          target: dest,
        }};

        updateNode(target);
      }
      const onElementsRemove = (elementsToRemove) => {
        let nodeCount = Object.keys(nodes).length;

        if (nodeCount > 2) {
          setElements((els) => removeElements(elementsToRemove, els));

          let toDelete = [];
          for (let element in elementsToRemove) {
            let id = elementsToRemove[element].id
            if (Number.isInteger(Number(id))) {
              let nodeID = `node_${id}`;
              toDelete.push({ node: nodeID });
            }
            else {
              let [ src, dest ] = id.split('-');
              src = src.substring(1);
              let edgeID = `edge_${src}_${dest}`;
              toDelete.push({ node: edgeID });
            }
          }
          deleteNode(toDelete);
        }
      }

      let graphStyles = { width: "100%", height: "100%" };

      return (
        <ReactFlow
          elements={elements}
          style={graphStyles}
          nodesConnectable={true}
          nodesDraggable={true}
          zoomOnScroll={true}
          paneMoveable={true}
          onConnect={onConnect}
          onElementsRemove={onElementsRemove}
          deleteKeyCode={46}
        >
          <Background variant="lines" />
        </ReactFlow>
      )
    }

    let output = [];
    let outputTmp;

    if (execute) {
      outputTmp = (
        <CalculateShortestPath key={-1} />
      )
      output.push(outputTmp);
    }

    outputTmp = (
      <Graph key={0}/>
    );
    output.push(outputTmp);

    return output;
  }

  render() {
    const classes = 'operationOutput';

    return (
      <MathJax className={classes} style={{ width: "100%", height: "100%" }}>
        {this.renderAdjacencyGraph()}
      </MathJax>
    )
  }
}
