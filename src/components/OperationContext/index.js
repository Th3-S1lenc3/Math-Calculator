import React from 'react';

export const OperationContext = React.createContext();

const rules = {
  addMatrices: 'square',
  subtractMatrices: 'square',
  multiplyMatrices: 'rectangle',
  scalarMultiplication: 'one',
  divideMatrices: 'square',
  scalarDivision: 'one',
  invertMatrix: 'one',
  transposeMatrix: 'one',
}

export default class OperationContextProvider extends React.Component {
  state = {
    type: 'default',
    execute: false,
    showSteps: false,
    showMatrixOperations: false,
    outputDetail: 'decimal',
    showListInfo: false,
    matrices: {
      matrix_1: {rows: 2, columns: 2},
      matrix_2: {rows: 2, columns: 2},
    },
    equations: {
      count: 2
    },
    dimensions: {
      count: 2
    },
    nodes: {
      node_1: {
        id: '1',
        type: 'default', // input node
        data: { label: 'Node 1' },
        position: { x: 250, y: 25 },
      },
      node_2: {
        id: '2',
        type: 'default', // input node
        data: { label: 'Node 2' },
        position: { x: 100, y: 125 },
      },
      edge_1_2: {
        id: 'e1-2',
        source: "1",
        target: "2",
      },
    },
    setContext: (target) => {
      const update = (target) => {
        const { name, value } = target;

        if ( name == 'type' ) {
          this.setState(() => ({
            execute: false
          }));

          if ( value == 'vectorRotation' && this.state.dimensions.count > 3) {
            this.setState(() => ({
              dimensions: { count: 3}
            }));
          }

          if (rules[value] == 'one') {
            this.setState(() => ({
              matrices: {
                matrix_1: {rows: 2, columns: 2}
              }
            }));
          }
          else if (rules[value] != 'one'){
            this.setState(() => ({
              matrices: {
                matrix_1: {rows: 2, columns: 2},
                matrix_2: {rows: 2, columns: 2},
              }
            }));
          }
        }

        if ( name == 'outputDetail' || name == 'showSteps' ) {
          let executePrev = this.state.execute;
          let execute;

          if (executePrev) {
            execute = false;
          }
          else {
            execute = executePrev;
          }


          this.setState(() => ({
            execute: execute,
            [name]: value
          }));

          setTimeout(() => {
            this.setState(() => ({
              execute: executePrev,
            }));
          }, 0);
        }

        this.setState(() => ({
          [name]: value
        }));
      }

      if (Array.isArray(target)) {
        for (let t in target) {
          update(target[t])
        }
      }
      else {
        update(target);
      }

      setTimeout(() => {console.log(this.state)}, 1);
      setTimeout(() => {MathJax.typeset()}, 1);
    },
    updateMatrix: (target) => {
      const { matrix, value } = target;

      this.setState((prevState) => ({
        matrices: {
          ...prevState.matrices,
          [matrix]: value,
        }
      }));

      setTimeout(() => {console.log(this.state)}, 1);
      setTimeout(() => {MathJax.typeset()}, 1);
    },
    deleteMatrix: (target) => {
      const { matrix } = target;

      let matrices = JSON.parse(JSON.stringify(this.state.matrices));

      let delCheck = delete matrices[matrix];

      if (delCheck) {
        this.setState(() => ({
          matrices: matrices
        }));
      }

      setTimeout(() => {console.log(this.state)}, 1);
      setTimeout(() => {MathJax.typeset()}, 1);
    },
    updateEquations: (target) => {
      const { count } = target;

      this.setState(() => ({
        equations: {
          count: count
        }
      }));

      setTimeout(() => {console.log(this.state)}, 1);
    },
    updateDimensions: (target) => {
      const { count } = target;
      let executePrev = this.state.execute;
      let execute;

      if (executePrev) {
        execute = false;
      }
      else {
        execute = executePrev;
      }


      this.setState(() => ({
        execute: execute,
        dimensions: {
          count: count
        }
      }));

      setTimeout(() => {
        this.setState(() => ({
          execute: executePrev,
        }));
      }, 1);
      setTimeout(() => {console.log(this.state)}, 1);
    },
    updateNode: (target) => {
      const update = (target) => {
        const { node, value } = target;

        this.setState((prevState) => ({
          nodes: {
            ...prevState.nodes,
            [node]: value,
          }
        }));
      }

      if (Array.isArray(target)) {
        for (let t in target) {
          update(target[t]);
        }
      }
      else {
        update(target);
      }


      setTimeout(() => {console.log(this.state)}, 1);
    },
    deleteNode: (target) => {
      const update = (target) => {
        const { node } = target;

        let nodes = JSON.parse(JSON.stringify(this.state.nodes));

        let delCheck = delete nodes[node];

        console.log(node, delCheck);

        if (delCheck) {
          this.setState(() => ({
            nodes: nodes
          }));
        }
      }

      if (Array.isArray(target)) {
        for (let t in target) {
          update(target[t]);
        }
      }
      else {
        update(target);
      }

      setTimeout(() => {console.log(this.state)}, 1);
    },
  };

  render() {
    const { children } = this.props;

    return (
      <OperationContext.Provider value={this.state}>
        {children}
      </OperationContext.Provider>
    )
  }
}
