import React from 'react';

export const OperationContext = React.createContext();

export default class OperationContextProvider extends React.Component {
  state = {
    type: 'default',
    execute: false,
    showSteps: false,
    showMatrixOperations: false,
  };

  setContext = (target) => {
    const { name, value } = target;

    if ( name == 'type' ) {
      this.setState(() => ({
        execute: false
      }));
    }

    this.setState(() => ({
      [name]: value
    }));

    setTimeout(() => {console.log(this.state)}, 1);
    setTimeout(() => {MathJax.typeset()}, 1);
  }

  render() {
    const { children } = this.props;
    const { type, execute, showSteps, showMatrixOperations } = this.state;
    const { setContext } = this;

    return (
      <OperationContext.Provider value={
        {
          type,
          execute,
          showSteps,
          showMatrixOperations,
          setContext,
        }
      }>

      {children}

      </OperationContext.Provider>
    )
  }
}
