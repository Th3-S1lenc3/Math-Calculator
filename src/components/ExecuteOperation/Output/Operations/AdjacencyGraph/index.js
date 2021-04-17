import React, { Component, useState, useContext, useEffect } from 'react';
import ReactFlow, {
  removeElements,
  addEdge,
  Background,
  useStoreState,
} from 'react-flow-renderer';
import { MathJax } from 'better-react-mathjax';

import { OperationContext } from '@OperationContext';

import CalculateShortestPath from './CalculateShortestPath';

import './index.css';

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
          <Background variant="lines" color="#888" />
        </ReactFlow>
      );
    }

    let output = [];
    let outputTmp;

    if (execute) {
      outputTmp = (
        <CalculateShortestPath key={-1} />
      );
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
