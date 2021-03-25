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
    matrices: {
      matrix_1: {rows: 2, columns: 2},
      matrix_2: {rows: 2, columns: 2},
    },
    equations: {
      count: 2
    }
  };

  setContext = (target) => {
    const { name, value } = target;

    if ( name == 'type' ) {
      this.setState(() => ({
        execute: false
      }));

      if (rules[value] == "one") {
        this.setState(() => ({
          matrices: {
            matrix_1: {rows: 2, columns: 2}
          }
        }));
      }
      else {
        this.setState(() => ({
          matrices: {
            matrix_1: {rows: 2, columns: 2},
            matrix_2: {rows: 2, columns: 2},
          }
        }));
      }
    }

    this.setState(() => ({
      [name]: value
    }));

    setTimeout(() => {console.log(this.state)}, 1);
    setTimeout(() => {MathJax.typeset()}, 1);
  }

  updateMatrix = (target) => {
    const { matrix, value } = target;

    this.setState((prevState) => ({
      matrices: {
        ...prevState.matrices,
        [matrix]: value,
      }
    }));

    setTimeout(() => {console.log(this.state)}, 1);
    setTimeout(() => {MathJax.typeset()}, 1);
  }

  deleteMatrix = (target) => {
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
  }

  updateEquations = (target) => {
    const { count } = target;

    this.setState(() => ({
      equations: {
        count: count
      }
    }));

    setTimeout(() => {console.log(this.state)}, 1);
  }

  render() {
    const { children } = this.props;
    const { type, execute, showSteps, showMatrixOperations, matrices, equations } = this.state;
    const { setContext, updateMatrix, deleteMatrix, updateEquations } = this;

    return (
      <OperationContext.Provider value={
        {
          type,
          execute,
          showSteps,
          showMatrixOperations,
          matrices,
          equations,
          setContext,
          updateMatrix,
          deleteMatrix,
          updateEquations,
        }
      }>

      {children}

      </OperationContext.Provider>
    )
  }
}
